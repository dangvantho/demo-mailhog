import express from "express"
import cors from "cors"
import sendMail from "./mailer/index.js"
const port = 8028
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.post("/mails", async (req, res) => {
  await sendMail(req.body)
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
