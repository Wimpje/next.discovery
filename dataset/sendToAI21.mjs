import 'dotenv/config'
import fs from 'fs/promises'
import { createReadStream } from 'fs'
import path  from 'path'

import fetch from 'node-fetch'
import FormData from 'form-data'
import { setTimeout } from 'timers/promises'

// snippet to get __dirname from within module
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const url = 'https://api.ai21.com/studio/v1/library/files'
const API_KEY = process.env['AI21_API_KEY'] // replaced by your API key from .env file

// https://docs.ai21.com/reference/manage-library-ref
const sendToAi21 = async (file, path, labels, publicUrl) => {
   const formData = new FormData()
   formData.append('file', file)
   formData.append('path', path)
   formData.append('public_url', publicUrl)
   if (labels && labels.length > 0) {
      formData.append('labels', JSON.stringify(labels))
   }

   const result = await fetch(url, {
      method: 'POST',
      headers: {
         'Authorization': `Bearer ${API_KEY}`,
      },
      body: formData
   })
   const json = await result.json()
   console.log('Upload done', JSON.stringify(json))
   return json
}

// iterate folder and send all files to AI21
const folder = path.join(__dirname, 'files')
const items = await fs.readdir(folder, {withFileTypes: true})

for (const item of items) {
   if (item.isDirectory()) {
      const files = await fs.readdir(folder + '/' + item.name, { withFileTypes: true })
         
      for (const file of files) {
         if (file.isDirectory()) {
            console.log('we dont expect a folder here, but ignoring it', file)
            continue
         }
         
         if (path.extname(file.name) === '.txt') {
            const filePath = path.join(folder, item.name, file.name)
            console.log('sending file', filePath)

            try {
               // adding the category as label, so we can filter on time period later, also splitting it up in separate labels that are more specific with a regex
               const labels = [item.name]
               // get the time period an location from the category with a regex
               const timePeriodRegex = /([A-Za-z ]+) dinosaurs of ([A-Za-z ]+)/
               const matches = timePeriodRegex.exec(item.name)
               if (matches.length == 3) {
                  labels.push(matches[1]) // Late Triassic
                  labels.push(matches[2]) // South America
               }

               const publicUrl = `https://en.wikipedia.org/wiki/${file.name.replace('.txt', '')}`
               const filename = await sendToAi21(createReadStream(filePath), `${item.name}/${file.name.replace('.txt', '')}`, labels, publicUrl)
               console.log('Uploaded to AI21', filename)
            } catch (err) {
               console.error('Error sending file:', err)
            }
         }
         console.log('Waiting for some time to avoid upload limiter errors')
         await setTimeout(5000)
      }
   }
}


/* Example code to retrieve all files from AI21
const resp = await fetch('https://api.ai21.com/studio/v1/library/files', {
   headers: {
      'Authorization': `Bearer ${API_KEY}`,
   }
})
const json = await resp.json()
console.log(json)
*/