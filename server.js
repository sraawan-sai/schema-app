const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./controllers/users')
const signinRouter = require('./controllers/signin')
const signupRouter = require('./controllers/signup')
const otpRouter = require('./controllers/otp')

//middelware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//connect to mongodb
connectDB();

//calling api version 
const api = process.env.API_URl;

//routers
app.use(`${api}/signin`,signinRouter)
app.use(`${api}/signup`,signupRouter)
app.use(`${api}/otp`,otpRouter)
app.use(`${api}/users`,userRouter)



app.listen(5000,()=>{
    console.log('server connected')
})