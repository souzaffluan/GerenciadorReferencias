const jwt = require('jsonwebtoken')

const User = require("../models/User")

const jwtSecret = process.env.JWT_SECRET;

const getUserByToken = async (token) =>{
    if(!token){
        return res.status(401).json({error:["Acesso Negado"]})
    }

    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.id;

    const user = await User.findOne({_id: userId});

    return user;
}