let backEndUrl, baseUrl
if (process.env.NODE_ENV === 'development') {
    backEndUrl = process.env.LOCAL_BACKEND_URL
    baseUrl = process.env.LOCAL_URL
} else {
    backEndUrl = process.env.PRODUCTION_BACKEND_URL
    baseUrl = process.env.PRODUCTION_URL
} 
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID

export {backEndUrl, baseUrl, spotifyClientId}