const asyncHandler = require("express-async-handler")
const {validatecreatebook, validateupdatebook, Book} = require("../models/Book.js")



//Http Methods / Verbs
// app.get('/',(req,res)=>{
// res.send('hello to express')
// })

/**
 * @desc  Get all books
 * @routes /api/books
 * @method GET
 * @access public
 */

const getAllBooks = asyncHandler(async(req,res)=>{
    //Comparaison Query Operators
    //$eq(equal)
    //$ne (not equal)
    //$lt (less than)
    //$lte (less than and eqaul)
    //$gt (greater than) $in $nin
    const {minPrice, maxPrice}= req.query
    let books
    if(minPrice && maxPrice){
       books = await Book.find({price: {$lte:minPrice, $gte:maxPrice}})
      .populate("author", [
        "_id",
        "firstName",
        "lastName",
      ]);
    }else{
      books = await Book.find()
      .populate("author", [
        "_id",
        "firstName",
        "lastName",
      ])
    }
    res.status(200).json(books)
  
  })



/**
 * @desc  Get book by id
 * @routes /api/books/:id
 * @method GET 
 * @access public
 */
  const getBookBiId =asyncHandler(async(req,res)=>{
    const book =await Book.findById(req.params.id)
    if(book){
        res.status(200).json(book)

    }else{
        res.status(400).json({message:"book not found"})

    }
})


/**
 * @desc  Create new book
 * @routes /api/books
 * @method POST
 * @access private(only admin)
 */

const createBook =
  asyncHandler (async(req,res)=>{
    const {error}=validatecreatebook(req.body)
    if(error){
      return res.status(400).json({message : error.details[0].message})
    }
      console.log(req.body)
      const book = new Book( {
      
          title:req.body.title,
          author:req.body.author,
          description:req.body.description,
          price:req.body.price,
          cover:req.body.cover
      })
      const result = await book.save()
      res.status(201).json(result)//201 created successfully
  })


    
/**
 * @desc  Update a book
 * @routes /api/books/:id
 * @method PUT
 * @access private(onlyy admin)
 */

  const updateBook= asyncHandler(async(req,res)=>{
    const {error}=validateupdatebook(req.body)
    if(error){
      return res.status(400).json({message : error.details[0].message})}

     const updatedbook = await Book.findByIdAndUpdate(req.params.id, {
       $set:{ 
        title:req.body.title,
        author:req.body.author,
        description:req.body.description,
        price:req.body.price,
        cover:req.body.cover
       }})
        res.status(200).json(updatedbook)
       })

  /**
 * @desc  Delete a book
 * @routes /api/books/:id
 * @method DELETE
 * @access private(only admin)
 */
    const deleteBook=asyncHandler(async(req,res)=>{

        const book =await Book.findById(req.params.id)
    
          if(book){
            await Book.findByIdAndDelete(req.params.id)
              res.status(200).json({message:"book has been deleted"})
          }else{
              res.status(404).json({message:"book not found"})
      
          }
        })
module.exports={
    getAllBooks,
    getBookBiId,
    createBook,
    updateBook,
    deleteBook
  }