const express = require("express")
const router = express.Router()

const {createReferencia, getReferenciasbyUser, deleteReferencia} = require("../controller/ReferenciasController")


const authGuard = require("../middlewares/authGuard");

router.post("/newreferencia", authGuard, createReferencia);
router.get("/usereferencias", authGuard, getReferenciasbyUser);
router.delete("/deletereferencia/:id", authGuard, deleteReferencia);

module.exports = router;