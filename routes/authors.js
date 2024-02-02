const express = require('express')
const router  = express.Router()
const asyncHandler = require("express-async-handler")
const{VerifyTokenAndAdmin}=require("../middlewares/verifyToken.js")
const{Author, validatecreateauthor, validateupdateauthor}=require("../models/Authors.js")




/**
 * @desc  Get all authors
 * @routes /api/authors
 * @method GET
 * @access public
 */
router.get("/",async(req,res)=>{
    const {pageNumber} = req.query
    const authorsperpage =2                  
    try{                                   //skip(0).limit(2)firstpage//2pageskip(2).limit(2)
    const authorList = await Author.find() //3pageskip(4).limit(2)
                            .skip((pageNumber-1)*authorsperpage)
                            .limit(2)
                            //.sort({firstName: 1}).select("firstName lastName -_id")
    res.status(200).json(authorList)
    }catch(error){
        console.log(error)
        res.status(500).json({message: "something went wrong"})
    }
})


/**
 * @desc  Get author by id
 * @routes /api/author/:id
 * @method GET 
 * @access public
 */
router.get("/:id",asyncHandler(async(req,res)=>{
    const author = await Author.findById(req.params.id)
    if(author){
        res.status(200).json(author)

    }else{
        res.status(400).json({message:"author not found"})

    
    }
}))


/**
 * @desc  Create new authors
 * @routes /api/authors
 * @method POST
 * @access pravite (only admin)
 */
router.post("/",VerifyTokenAndAdmin,async(req,res)=>{
  const {error}=validatecreateauthor(req.body)
  if(error){
    return res.status(400).json({message : error.details[0].message})
  }
try{
    const author = new Author({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        nationality:req.body.nationality,
        image:req.body.image,
        
    })
   const result = await author.save()
    res.status(201).json(result)//201 created successfully
}catch(error){
    console.log(error)
    res.status(500).json({message: "something went wrong"})//le prblm de serveur
}
})



/**
 * @desc  Update an author
 * @routes /api/authors/:id
 * @method PUT
 * @access private(only admin)
 */

router.put("/:id",VerifyTokenAndAdmin,async(req,res)=>{
    const {error}=validateupdateauthor(req.body)
    if(error){
      return res.status(400).json({message : error.details[0].message})}
  try{
      const author = await Author.findByIdAndUpdate(req.params.id, {
        $set: {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        nationality:req.body.nationality,
        image:req.body.image,
        
        }
      })
      
          res.status(200).json(author)
    }catch(error){
        console.log(error)
        res.status(500).json({message: "something went wrong"})//le prblm de serveur
    }
    })
    /**
 * @desc  Delete an author
 * @routes /api/books/:id
 * @method DELETE (only admin)
 * @access private
 */

router.delete("/:id",VerifyTokenAndAdmin,async(req,res)=>{
try{
      const author =await Author.findById(req.params.id)
      if(author){
        await Author.findByIdAndDelete(req.params.id)
          res.status(200).json({message:"author has been deleted"})
      }else{
          res.status(404).json({message:"author not found"})
  
      }
    }catch(error){
        console.log(error)
        res.status(500).json({message: "something went wrong"})//le prblm de serveur
    }
    })


module.exports = router