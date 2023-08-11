import 'dotenv/config'
import { setTimeout } from 'timers/promises'
import fetch from 'node-fetch'
const API_KEY = process.env['AI21_API_KEY'] // replaced by your API key from .env file


// there seems to be a bug in the AI21 API where labels are indexed as one string, this function fixes that
const updateMetadata = async (documentId, labels, url) => {
   const fileUpdateurl = `https://api.ai21.com/studio/v1/library/files/${documentId}`
   
   let data = {
      'labels': labels,
      'publicUrl': url
   }
   console.log('Updating metadata', data, documentId)

   const response = await fetch(fileUpdateurl, {
      method: 'PUT',
      headers: {
         'Authorization': `Bearer ${API_KEY}`,
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
   })

   console.log('Updated labels', response)
}


const resp = await fetch('https://api.ai21.com/studio/v1/library/files', {
   headers: {
      'Authorization': `Bearer ${API_KEY}`,
   }
})
const json = await resp.json()
console.log(`Updating ${json.length} files`)

for (const file of json) {
   // this is only needed due to a bug in the API upload where labels are indexed as one string - when fixed this code can be removed
   // get path and split it into array
   const metadata = file.path.split('/')
   const category = metadata[0] 
   const name = metadata[1]

   const labels = [category]
   // get the time period an location from the category with a regex
   const timePeriodRegex = /([A-Za-z ]+) dinosaurs of ([A-Za-z ]+)/
   const matches = timePeriodRegex.exec(category)
   if (matches.length == 3) {
      labels.push(matches[1]) // Late Triassic
      labels.push(matches[2]) // South America
   } 

   const publicUrl = `https://en.wikipedia.org/wiki/${name}`
   await updateMetadata(file.fileId, labels, publicUrl)
   await setTimeout(1000)
}

