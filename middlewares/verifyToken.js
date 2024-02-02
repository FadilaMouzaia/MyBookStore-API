const jwt = require("jsonwebtoken")

// Verify Token
function verifyToken(req,res,next){
    const token = req.headers.token
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decoded
            next()
        }catch (error) {
            res.status(401).json({message:"invalid token"})
        }
    }else{
        res.status(401).json({message:" no token provided"})// No autorizer
    }

}


// Verify Token et Authorize the user
function VerifyTokenAndAuthorization(req,res,next){
    verifyToken(req,res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return res.status(403)//forbidden
            .json({message : "You are not allowed"})

        }
            
        
    })

}

// Verify Token et Admin
function VerifyTokenAndAdmin(req,res,next){
    verifyToken(req,res, ()=> {
        if(req.user.isAdmin){
            next()
        }else{
            return res.status(403)//forbidden
            .json({message : "You are not allowed, you only admin"})

        }
            
        
    })

}

module.exports = {
    verifyToken,
    VerifyTokenAndAuthorization,
    VerifyTokenAndAdmin
}