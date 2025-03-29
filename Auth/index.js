import express from 'express'
import userRoute from './routes/user.route.js'
const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/users', userRoute)
