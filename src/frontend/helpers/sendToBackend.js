import querystring from 'querystring'
import Cookies from 'js-cookie'

import { backEndUrl, baseUrl, spotifyClientId } from '../config.js'
import { generateRandomString } from './generateRandomString.js'


export function sendToBackend() {
    const redirectUri = backEndUrl + '/callback'
  
    const scope = "user-read-private user-read-email user-library-read"
    console.log("about to redirect to spotify and then get code and finish in callback")
    const state = generateRandomString(16);
    Cookies.set("state", state)

    const authorizationUrl = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
        response_type: 'code',
        client_id: spotifyClientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
    }) 
    console.log("authorizationUrl: ", authorizationUrl)
    
    window.location.href = authorizationUrl
  }