import 'dotenv/config'
import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()
const API_URL = 'https://api.ai21.com/studio/v1'
const API_KEY = process.env['AI21_API_KEY'] // replaced by your API key from .env file


router.post('/answer', async (req: any, res: any) => {
   const question = req.body.question
   console.log(`Question: ${question}`)
   if (!question) {
      return res.status(400).json({error: 'Empty question cannot be answered.'})
   }
   if (question.indexOf('what is the meaning of life') > -1) {
      return res.json({answer: '42', answerInContext: true})
   }

   const postBody = {
     question: question
   }
   try {
      const result = await fetch(`${API_URL}/library/answer`, {
         method: 'POST',
         headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
          body: JSON.stringify(postBody)
      })
      const json = await result.json()
      res.json(json)
  } catch (err) {
     res.status(500).json({ error: err })
  }
})


export { router as ApiRouter }
