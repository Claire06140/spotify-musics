import express from "express"
import axios from "axios"
import querystring from "querystring"

import {spotifyClientId, spotifyClientSecret, serverUrl, baseUrl} from "../config.js"

// eslint-disable-next-line new-cap
const router = express.Router()

router.get("/", async (req, res) => {
  const code = req.query.code || null
  try {
    console.log("sending code to backend")
    await axios.post(`${serverUrl}/callback`, {code})
    res.redirect(baseUrl)
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "Internal Server Error in sending code to backend"})
  }
})

router.post("/", async (req, res) => {
  try {
    const {code} = req.body || null
    const authString = `${spotifyClientId}:${spotifyClientSecret}`
    const encodedAuthString = Buffer.from(authString).toString('base64')
    const response = await axios.post("https://accounts.spotify.com/api/token",
        querystring.stringify({
          redirect_uri: `${serverUrl}/callback`,
          code: code,
          grant_type: 'authorization_code',
        }), {
          headers: {
            'Authorization': `Basic ${encodedAuthString}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
    const {access_token, refresh_token} = response.data
    try {
      await axios.post(`${serverUrl}/tokens`, {access_token, refresh_token})
    } catch (err) {
      console.log("did not manage to use post tokens route")
    }

    res.status(200).json({message: "Successfully received and sent tokens"})
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "problème pour retrieve access and refresh token et send to getmucics"})
  }
});

export default router;
