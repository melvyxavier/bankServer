const express = require('express')
const { register, login, getBalance, moneyTransfer, accountStatement, accountDeletion } = require('../controllers/logic')
const { jwtMiddleware } = require('../middleWare/jwtMiddleware')




//router object
const router = new express.Router()



//create account request

router.post('/bankuser/create_acc', register)

//log in request
router.post('/bankuser/login', login)

//balance check request
router.get('/bankuser/balance/:acno', jwtMiddleware, getBalance)

//transfer money request
router.post('/bankuser/money-transfer', jwtMiddleware, moneyTransfer)

//account statement request
router.get('/bankuser/account-statement/:acno', jwtMiddleware, accountStatement)


//account deletion request
router.delete('/bankuser/deleteAccount/:acno', jwtMiddleware, accountDeletion)

//export router
module.exports = router