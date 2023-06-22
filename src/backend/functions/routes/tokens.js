import express from 'express'

// eslint-disable-next-line new-cap
const router = express.Router()

let access_token
let refresh_token
router.get("/", (req, res) => {
  try {
    res.status(200).json({access_token, refresh_token})
  } catch (err) {
    res.status(500).json({error: "issue while getting and sending back tokens from server"})
  }
})

router.post('/', (req, res) => {
  ({access_token, refresh_token} = req.body)
  res.cookie('access_token', access_token)
  res.cookie('refresh_token', refresh_token)
  res.sendStatus(200)
})

export default router
