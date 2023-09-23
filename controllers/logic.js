const { json } = require("express")
const Users = require("../models/collection")
const jwt = require('jsonwebtoken')


//signup - account creation
register = (req, res) => {

  //acno=req.body.acno
  //const {acno}=req.body

  //psw=req.body.psw
  //const {psw}=req.body

  //uname=req.body.uname
  //const {uname}=req.body

  //destructuring
  const { acno, psw, uname } = req.body

  Users.findOne({ acno }).then(user => {
    if (user) {
      res.status(400).json({
        message: "User already exists",
        status: false,
        statusCode: 400
      })
    }
    else {
      //create object for user
      let newUser = new Users({
        acno,
        uname,
        psw,
        balance: 0,
        transactions: []
      })
      //save in database
      newUser.save()
      res.status(201).json({
        message: "Account created successfully :)",
        status: true,
        statusCode: 201
      })
    }

  })


}

login = (req, res) => {

  //access data from request body

  const { acno, psw } = req.body

  Users.findOne({ acno, psw }).then(user => {
    if (user) {

      //token generation
      const token = jwt.sign({ acno }, "secretkey123")

      res.status(200).json({
        message: "Login successful :)",
        status: true,
        statusCode: 200,
        currentUser: user.uname,
        token

      })
    }
    else {
      res.status(404).json({
        message: "Incorrect account number or password.",
        status: false,
        statusCode: 404
      })
    }

  })

}

getBalance = (req, res) => {

  //access acno from request param
  const { acno } = req.params
  Users.findOne({ acno }).then(user => {
    if (user) {
      res.status(200).json({
        message: user.balance,
        status: true,
        statusCode: 200

      })
    }
    else {
      res.status(404).json({
        message: "User doesn't exist",
        status: false,
        statusCode: 404
      })
    }
  })
}


moneyTransfer = (req, res) => {
  const { sAcno, rAcno, amount, spsw, date } = req.body

  //convert amount to number
  var amnt = parseInt(amount)

  //check sender details
  Users.findOne({ acno: sAcno, psw: spsw }).then(suser => {
    if (suser) {
      //check reciever details in db
      Users.findOne({ acno: rAcno }).then(ruser => {
        if (ruser) {
          //check amount with sender balance
          if (amnt <= suser.balance) {

            //update sender object
            suser.balance = suser.balance - amnt
            suser.transactions.push({ tacno: rAcno, amount: amnt, type: "DEBIT", date })
            suser.save()

            //update reciever object
            ruser.balance = ruser.balance + amnt
            ruser.transactions.push({ tacno: sAcno, amount: amnt, type: "CREDIT", date })
            ruser.save()

            res.status(200).json({
              message: "Money Transfered Successfully!",
              status: true,
              statusCode: 200
            })

          }
          else {
            res.status(406).json({
              message: "Insufficient balance",
              status: false,
              statusCode: 406


            })

          }
        }

        else {
          res.status(404).json({
            message: "Sender Account Doesn't Exist",
            status: false,
            statusCode: 404

          })
        }
      })
    }
    else {
      res.status(404).json({
        message: "Invalid Details ",
        status: false,
        statusCode: 404
      })
    }
  })
}


accountStatement = (req, res) => {
  const { acno } = req.params
  Users.findOne({ acno }).then(user => {
    if (user) {
      res.status(200).json({
        message: user.transactions,
        status: true,
        statusCode: 200
      })
    }
    else {
      res.status(404).json({
        message: "User doesn't exist",
        status: false,
        statusCode: 404
      })
    }
  })
}



accountDeletion = (req, res) => {
  const { acno } = req.params
  Users.deleteOne({ acno }).then(data => {
    if (data) {
      res.status(200).json({
        message: "Account Deleted Successfully",
        status: true,
        statusCode: 200

      })
    }

  })
}




module.exports = { register, login, getBalance, moneyTransfer, accountStatement, accountDeletion }