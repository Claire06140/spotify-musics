import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import callbackRouter from './routes/callback.js'
import mongodbRouter from './routes/mongodb.js'
import testRouter from './routes/test.js'
import tokensRouter from './routes/tokens.js'

import {baseUrl, PORT} from './config.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

const spotifyUrlPattern = /^https:\/\/(api|accounts)\.spotify\.com\//
const whitelist = [baseUrl, baseUrl + '/', spotifyUrlPattern]
const corsOptions = {
  origin: whitelist,
  credentials: true,
  allowHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
}
const fullCors = {
  allowHeaders: "*",
  allowMethods: "*",
  origin: whitelist,
  credentials: "true",
}


app.use('/callback', cors(fullCors), callbackRouter)
app.use('/mongodb', mongodbRouter)
app.use('/tokens', cors(fullCors), tokensRouter)
app.use('/test', cors(corsOptions), testRouter)

if (process.env.NODE_ENV === 'development') {
  app.listen(PORT, () => console.log("on écoute sur 3000 en local!"))
}

export default app
