const express = require("express")
const router = express.Router()

const {createReferencia, getReferenciasbyUser, deleteReferencia, updateReferencia, getReferenciaById, searchReferenciasByAutor} = require("../controller/ReferenciasController")


const authGuard = require("../middlewares/authGuard");

router.post("/newreferencia", authGuard, createReferencia);
router.get("/usereferencias", authGuard, getReferenciasbyUser);
router.delete("/deletereferencia/:id", authGuard, deleteReferencia);
router.put("/:id", authGuard, updateReferencia);
router.get("/getref/:id", authGuard, getReferenciaById);
router.get("/search", authGuard, searchReferenciasByAutor)

module.exports = router;