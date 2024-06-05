const mongoose = require("mongoose");
const dbUser = ''
const dbPassword = ''

//conexao

const conn = async () =>{
    try{

        const dbConn = await mongoose.connect(`mongodb+srv://luan261999:k1eNXvLjufSHamTO@gereftcc.fqajzta.mongodb.net/`

        );

        console.log("Conectado ao banco!");
        return dbConn;
    }catch(error){

        console.log(error);
    }
}

conn();

module.exports = conn;