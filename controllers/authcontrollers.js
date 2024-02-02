const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {User,ValidateRegisterUser, ValidateLoginUser }=require("../models/User")


/**
 * @desc  Register New User
 * @routes /api/auth/register
 * @method POST
 * @access public
 */
module.exports.register =asyncHandler(async(req,res) => {
    const {error}= ValidateRegisterUser(req.body)
    if(error){
        return res.status(400).json({message : error.details[0].message})
      }
      let user = await User.findOne({email:req.body.email})
      if(user){
        return res.status(400).json({message : "this user already registered"})
      }

      const salt = await bcrypt.genSalt(10)//1111 => erfghuik
      req.body.password = await bcrypt.hash(req.body.password, salt)
      user = new User({
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
      })
      const result = await user.save()
      const token = jwt.sign(
        {id :user._id,
         isAdmin:user.isAdmin},process.env.JWT_SECRET_KEY)

      const {password, ...other} = result._doc
      res.status(201).json({...other, token})

})
/**
 * @desc  Login User
 * @routes /api/auth/Login
 * @method POST
 * @access public
 */


module.exports.login = asyncHandler(async(req,res) => {
    const {error}= ValidateLoginUser(req.body)
    if(error){
        return res.status(400).json({message : error.details[0].message})
      }
      let user = await User.findOne({email:req.body.email})
      if(!user){
        return res.status(400).json({message : "invalid email or password"})
      }

      const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
      if(!isPasswordMatch ){
        return res.status(400).json({message : "invalid email or password"})
      }
      const token = jwt.sign({id :user._id, isAdmin:user.isAdmin},process.env.JWT_SECRET_KEY)
      const {password, ...other} = user._doc
      res.status(200).json({...other, token})

})