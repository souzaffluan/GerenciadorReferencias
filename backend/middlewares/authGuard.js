const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jstSecret = process.env.JWT_SECRET

const authGuard = async (req, res, next) =>{
    const authHeader = req.headers["authorization"]
    const token =  authHeader && authHeader.split(" ")[1];

}