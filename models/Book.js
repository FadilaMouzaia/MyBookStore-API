const mongoose = require("mongoose")
const Joi = require('joi')

const Bookschema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        trim :true,
        minlength:3,
        maxlength:250
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Author",
        
    },
    description: {
        type:String,
        required:true,
        trim :true,
        minlength:5
    
    },
    price: {
        type:Number,
        required:true,
        min:0
    
    },
    cover: {
        type:String,
        required:true,
        enum:["soft cover", "hard cover"]
    
    },

},{ timestamps:true}
)
//validate create book
function validatecreatebook(obj){
    const schema = Joi.object({
        title:Joi.string().trim().min(3).max(250).required(),
        author:Joi.string().trim().required(),
        description:Joi.string().trim().min(5).required(),
        price:Joi.number().min(0).required(),
        cover:Joi.string().valid("soft cover", "hard cover").required(),
      })
    
      return schema.validate(obj)
}

//validate update book
function validateupdatebook(obj){
    const schema = Joi.object({
        title:Joi.string().trim().min(3).max(250),
        author:Joi.string(),
        description:Joi.string().trim().min(5),
        price:Joi.number().min(0),
        cover:Joi.string().valid("soft cover", "hard cover"),
      })
    
      return schema.validate(obj)}

const Book = mongoose.model("Book",Bookschema )
module.exports = {
    Book,
    validatecreatebook,
    validateupdatebook
}

