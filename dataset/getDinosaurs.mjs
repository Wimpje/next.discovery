import fetch from 'node-fetch'
import fs from 'fs'
import { setTimeout } from 'timers/promises'

// snippet to get __dirname from within module
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))


const folder = path.join(__dirname, 'files/')
const apiUrl = 'https://en.wikipedia.org/w/api.php'

async function fetchDinosaurArticles(category) {
   try {
     
      const response = await fetch(`${apiUrl}?action=query&list=categorymembers&cmtitle=Category:${category}&format=json&cmlimit=max`)
      const json = await response.json()
      const articles = json.query.categorymembers
      console.log(`Fetching ${articles.length} articles for category ${category}`)
      for (let i = 0; i < articles.length; i++) {
         const article = articles[i]
         const title = article.title

         console.log(`Fetching article: ${title}`)
         await fetchArticleText(title, category)
         // wait for a second to avoid hitting the Wikipedia API too hard
         await setTimeout(1000)
      }

      console.log('Fetching completed.')
   } catch (error) {
      console.error('An error occurred:', error)
   }
}

async function fetchArticleText(title, category) {
   try {
      const response = await fetch(`${apiUrl}?action=query&format=json&titles=${title}&prop=extracts&explaintext=true&redirects=true&exsectionformat=plain`)
      const json = await response.json()
      const articleText = extractPlainText(json)
      const fileName = title.replace(/[/\\?%*:|"<>]/g, '_') + '.txt'
      const folderName = folder + category.replace(/[/\\?%*:|"<>]/g, '_') + '/'
      if (!fs.existsSync(folderName)){
         fs.mkdirSync(folderName)
      }
      fs.writeFileSync(folderName + fileName, articleText)
      console.log(`Saved ${folderName}${fileName}`)
   } catch (error) {
      console.error(`Error fetching article ${title}:`, error)
   }
}

function extractPlainText(jsonResponse) {
   const page = Object.values(jsonResponse.query.pages)[0]
   return page.extract
}

// These categories seem to cover about 700 dinosaur articles
const categories = [
   'Prehistoric dinosaur families',
   'Early Jurassic dinosaurs of Africa', 'Early Jurassic dinosaurs of Asia',
   'Early Jurassic dinosaurs of Europe', 'Early Jurassic dinosaurs of North America',
   'Early Jurassic dinosaurs of South America', 'Early Triassic dinosaurs of Africa',
   'Middle Jurassic dinosaurs of Africa', 'Middle Jurassic dinosaurs of Asia',
   'Middle Jurassic dinosaurs of Europe', 'Middle Jurassic dinosaurs of South America',
   'Late Jurassic dinosaurs of Africa', 'Late Jurassic dinosaurs of Asia',
   'Late Jurassic dinosaurs of Europe', 'Late Jurassic dinosaurs of North America',
   'Late Jurassic dinosaurs of South America', 'Early Cretaceous dinosaurs of Africa',
   'Early Cretaceous dinosaurs of Asia', 'Early Cretaceous dinosaurs of Europe',
   'Early Cretaceous dinosaurs of North America', 'Early Cretaceous dinosaurs of South America',
   'Late Cretaceous dinosaurs of Africa', 'Late Cretaceous dinosaurs of Asia',
   'Late Cretaceous dinosaurs of Europe', 'Late Cretaceous dinosaurs of North America',
   'Late Cretaceous dinosaurs of South America', 'Late Triassic dinosaurs of Africa',
   'Late Triassic dinosaurs of Asia', 'Late Triassic dinosaurs of Europe',
   'Late Triassic dinosaurs of North America', 'Late Triassic dinosaurs of South America',
]

for (const category of categories) {
   await fetchDinosaurArticles(category)
}
