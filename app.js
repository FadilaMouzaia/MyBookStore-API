const express = require('express')
const {notFound,errorHandler}=require("./middlewares/errors")
require("dotenv").config()
const connectToDB = require('./config/db')
const path = require("path");
const helmet = require("helmet")
const cors = require("cors")


//Connection to database
connectToDB()


// Init App
const app = express()

// Static Folder
app.use(express.static(path.join(__dirname,"images")));

//Apply Middlewars
app.use(express.json())
app.use(express.urlencoded({extended: false}));

// Helmet
app.use(helmet());

// Cors Policy
app.use(cors())

// Set View Engine
app.set('view engine', 'ejs');
app.set('view engine', 'ejs')

//Routes
app.use("/api/books", require("./routes/books"))
app.use("/api/authors",require("./routes/authors"))
app.use("/api/auth/",require("./routes/auth"))
app.use("/api/users/",require("./routes/users"))
app.use("/api/upload/",require("./routes/upload"))
app.use("/password",require("./routes/password"))


//Error Hanlder Middleware
app.use(notFound)
app.use(errorHandler)

// Running the server
const PORT = process.env.PORT || 8008
app.listen(PORT,()=>console.log(`server is running in ${process.env.NODE_ENV}on port ${PORT}`))