const express = require("express")
const router = express.Router()


//chamar as funcoes do controler
const{register, login} = require("../controller/UserController");

//Middlewares
const validate = require("../middlewares/handleValidation");
const {userCreateValidation, loginValidation} = require("../middlewares/userValidation");

//rotas
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);

module.exports = router;