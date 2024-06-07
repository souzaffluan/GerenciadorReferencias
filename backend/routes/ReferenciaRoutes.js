const express = require("express")
const router = express.Router()

const {createReferencia} = require("../controller/ReferenciasController")


const authGuard = require("../middlewares/authGuard");

router.post("/newreferencia", authGuard, createReferencia);

module.exports = router;