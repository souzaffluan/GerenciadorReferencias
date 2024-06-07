const express = require("express")
const router = express();

router.use("/api/users", require("./UserRoutes"))
router.use("/api/referencias", require("./ReferenciaRoutes"))

//teste de rota

router.get("/", (req, res)=>{
    res.send("Funcionando");

});
module.exports = router;