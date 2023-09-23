//import .env file
require('dotenv').config()

//server creation

//express

//1- import express

const express = require('express')
const router = require('./routes/router')
const cors = require('cors')

//2- create server using express

const Bankserver = express()

//integrate front-end
Bankserver.use(cors())

//to convert all incoming json data to js data
Bankserver.use(express.json())

//router set
Bankserver.use(router)

//import connection.js file
require('./database/connection')


//3- run server

//port

const port = 5055 || process.env.port

Bankserver.listen(port, () => {
    console.log(`_______server started at port number ${port}_______`);
})

//api calls resolve
// Bankserver.post(`/signup`, (req,res)=>{
//     res.send("post method working...")
// })



// // Bankserver.post(`/login`)
// Bankserver.post(`/login`, (req,res)=>{
//     console.log(req.body.acno);
//     console.log(req.body.psw);
//     res.send("login worked")
// })

// //get call
// Bankserver.get('/bank', (req,res)=>{
//     res.send("bank app")
// })
