const express = require('express') 
const app = express() 
const cors = require('cors') 

const connectDb = require('./config/dbConnection')
require('dotenv').config()

connectDb()

const allowedOrigins = [
    'http://[::1]:5173',
    'https://exa844-user.vercel.app'
  ];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
  }));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const userRoutes = require('./routes/userRoutes')

app.use('/users', userRoutes)

app.listen(4000)