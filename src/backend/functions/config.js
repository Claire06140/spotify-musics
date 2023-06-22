import * as functions from 'firebase-functions'
import dotenv from 'dotenv'

dotenv.config()

let spotifyClientId
let spotifyClientSecret
let serverUrl
let baseUrl
let PORT

if (process.env.NODE_ENV === 'development') {
  PORT = 3000
  spotifyClientId = process.env.SPOTIFY_CLIENT_ID
  spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET
  baseUrl = process.env.LOCAL_URL
  serverUrl = process.env.LOCAL_BACKEND_URL
} else {
  spotifyClientId = functions.config().spotify.client_id
  spotifyClientSecret = functions.config().spotify.client_secret
  baseUrl = process.env.PRODUCTION_URL
  serverUrl = process.env.PRODUCTION_BACKEND_URL
}

export {PORT, spotifyClientId, spotifyClientSecret, baseUrl, serverUrl}
