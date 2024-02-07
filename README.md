# Book Store REST API Web App 
Book store API built with Node.js, Express.js and MongoDB
## About this application
This API is a basic example of a REST API backend application.
It is built with Node.js and Express Framework with Javascript. In addition, the application's database is MongoDB with the use of ODMs such as Mongoose. The application also has basic authentication and authorisation functionalities, using JWT.
## Usage
* Install Mongo DB on your local machine or use Mongo DB Cloud
* Create images folder in your project
### Environment Variables
Create an .env file at the root of your project and add the following to it  
MONGO_URI= your mongodb uri <br/>
PORT=5005
NODE_ENV = developement
JWT_SECRET_KEY = your jwt secret key
USER_EMAIL = your email service for sending email
USER_PASS = your email service password

