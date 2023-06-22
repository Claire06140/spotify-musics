import * as functions from 'firebase-functions'
import app from './server.mjs'

let api

if (process.env.NODE_ENV !== 'development') {
  api = functions.https.onRequest(app);
}

export {api}
