// dotenv/config makes entries in the .env file available as environment variables
import 'dotenv/config'

import express, { Application } from 'express'
import bodyParser from 'body-parser'
import history from 'connect-history-api-fallback'

// the next 3 lines are needed to get the current directory name, since we are marked as module in package.json
import path from 'path'
import { fileURLToPath } from 'url'
import { ApiRouter } from './routes/api.js'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// initialise express webserver
const app: Application = express()
// get the port from the environment variables, or use 3001 as default, the hosting environment (like RENDER) can set the PORT variable
const port = process.env['PORT'] || 3001
const hostname = process.env['HOST'] || `http://0.0.0.0:${port}`

if (app.get('env') === 'production') {
   // For IP detection & proxies: https://www.npmjs.com/package/express-rate-limit#:~:text=Troubleshooting%20Proxy%20Issues
   // not used in this demo, but good to know
   app.set('trust proxy', 1) // trust first proxy
}

// set up middleware for parsing incoming request bodies as json and urlencoded data
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', ApiRouter)


// test endpoint
app.get('/ping', (req: any, res: any, _next: any) => {
   console.log
   res.json({ pong: true, ip: req.ip, date: (new Date()).toISOString() })
})

// generic error handling
app.use((err: Error, _req: any, res: any, _next: any) => {
   console.error(err.stack)
   res.status(500).json({ error: err.message })
})

// This redirects requests that are 'GET' or 'HEAD', accept 'text/html' and are not file requests to /index.html, to make it compatible with angular routing
app.use(history())

// host the angular application in root, make sure to point the the full path
app.use('/', express.static(path.join(__dirname, 'jurassic.ai')))

app.listen(port, () => {
   console.log(`Server is listening on port ${port}, hostname is ${hostname}, env is ${app.get('env')} dir is ${__dirname}`)
})
