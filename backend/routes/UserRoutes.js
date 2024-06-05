const express = require("express")
const router = express.Router()


//chamar as funcoes do controler
const{register, login, getCurrentUser, updateUser} = require("../controller/UserController");

//Middlewares
const validate = require("../middlewares/handleValidation");
const {userCreateValidation, loginValidation, userUpdateValidation} = require("../middlewares/userValidation");
const authGuard = require("../middlewares/authGuard");

//rotas
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, userUpdateValidation(), validate, updateUser);

module.exports = router;