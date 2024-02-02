const express = require('express')
const { login, register } = require('../controllers/authcontrollers')
const router  = express.Router()




//api/auth/register
router.post("/register",register)   


//api/auth/login
router.post("/login",login)

module.exports=router