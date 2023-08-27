const express = require('express')
const app = express()
require('dotenv').config()
const colours = require('colours')
const { connectDB } = require('./config/db')
const { errorHandler } = require('./Middleware/errorMiddleware')

PORT = process.env.PORT || 5000

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('welcome to my app')
})

app.use('/api/student', require('./routes/studentsRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`your server runnuing at ${PORT}`);
})