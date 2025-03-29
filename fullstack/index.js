import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 4000

//On request start
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/deepak', (req, res) => {
  res.send('Hello World Deepak!')
})
app.get('deepak1', (req, res) => {
  res.send('Hi Deepak')
})
//End
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
