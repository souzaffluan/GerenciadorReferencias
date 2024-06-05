const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const authGuard = async (req, res, next) =>{
    const authHeader = req.headers["authorization"]
    const token =  authHeader && authHeader.split(" ")[1];

    //checar se tem um token na requisicao
    if(!token) return res.status(401).json({errors:["Acesso negado"]})

    //checar se o token é valido
    try {

        const verified = jwt.verify(token, jwtSecret);

        req.user = await User.findById(verified.id).select("-senha")
        next();        
    } catch (error) {
        res.status(401).json({errors:["Token invalido"]})
    }



}    
module.exports = authGuard;