const express = require('express') 
const app = express() 
const cors = require('cors') 

const connectDb = require('./config/dbConnection')
require('dotenv').config()

connectDb()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const userRoutes = require('./routes/userRoutes')

app.use('/users', userRoutes)

app.listen(4000)