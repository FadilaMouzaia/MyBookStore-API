const express = require('express')
const router  = express.Router()
const{VerifyTokenAndAdmin}=require("../middlewares/verifyToken.js")
const{getAllBooks, getBookBiId, createBook, updateBook, deleteBook}=require("../controllers/bookControllers.js")



//api/books
router.route("/")
     .get(getAllBooks)
     .post(VerifyTokenAndAdmin,createBook)


  //api/books/:id

router.route("/:id").get(getBookBiId)
      .put(VerifyTokenAndAdmin,updateBook)
      .delete(VerifyTokenAndAdmin,deleteBook)



  


module.exports = router