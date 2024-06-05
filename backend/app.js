require("dotenv").config()

const express = require("express")
const cors = require("cors")

const port = process.env.PORT;

const app = express();

//configurando json e o form data para receber dados json

app.use(express.json())
app.use(express.urlencoded({extended: false}));

//resolvendo problema de cors quando executa apliçao pelo mesmo dominio
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

//conexao com banco de dados
require("./config/db.js");

//rotas 
const router = require("./routes/Router");

app.use(router);

app.listen(port, ()=>{

    console.log(`App rodando na porta ${port}`);

});