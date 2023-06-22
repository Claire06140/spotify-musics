import express from 'express'

// eslint-disable-next-line new-cap
const router = express.Router()

router.get("/", (req, res) => {
  const message = {message: "hello test!"}
  res.json(message)
})

export default router
