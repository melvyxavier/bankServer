//create model


//import mongoose
const mongoose = require('mongoose')

//define schema
const usersSchema = new mongoose.Schema(
    {
        acno: Number,
        uname: String,
        psw: String,
        balance: Number,
        transactions: []
    }
)

//model - collectionName

const Users = new mongoose.model("Users", usersSchema)

//export model - to import in another files
module.exports = Users