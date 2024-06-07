const express = require("express")
const router = express.Router()

const {createReferencia, getReferenciasbyUser} = require("../controller/ReferenciasController")


const authGuard = require("../middlewares/authGuard");

router.post("/newreferencia", authGuard, createReferencia);
router.get("/usereferencias", authGuard, getReferenciasbyUser);

module.exports = router;