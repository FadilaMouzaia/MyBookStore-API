const mongoose = require("mongoose")
const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity")
const jwt = require("jsonwebtoken");


//User schema
const Userschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim :true,
        minlength:5,
        maxlength:100,
        unique:true
    },
    username:{
        type:String,
        required:true,
        trim :true,
        minlength:2,
        maxlength:200,
       
    },
    password:{
        type:String,
        required:true,
        trim :true,
        minlength:8,
    },
    isAdmin:{
        type:Boolean,
        default : false
        
    }, 
},{timestamps: true})
 
const User = mongoose.model("User", Userschema)
//Validate Register User
function ValidateRegisterUser(obj){
    const schema = Joi.object({
    email:Joi.string().trim().min(5).max(100).required().email(),
    username:Joi.string().trim().min(2).max(200).required(),
    password:passwordComplexity().required(),

})
return schema.validate(obj)}

//Validate Login User
function ValidateLoginUser(obj){
    const schema = Joi.object({
    email:Joi.string().trim().min(5).max(100).required().email(),
    password:Joi.string().trim().min(6).required(),
    
})
return schema.validate(obj)}

//Validate Update User
function ValidateUpdateUser(obj){
    const schema = Joi.object({
    email:Joi.string().trim().min(5).max(100).required().email(),
    username:Joi.string().trim().min(2).max(200),
    password:Joi.string().trim().min(6),

})
return schema.validate(obj)}

module.exports={
    User,
    ValidateRegisterUser,
    ValidateLoginUser,
    ValidateUpdateUser
}