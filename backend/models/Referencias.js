const mongoose = require("mongoose")
const {Schema} = mongoose

//variavel para discriminar o tipo de referencia
const options = { discriminatorKey: 'tipo', collection: 'referencias'};

const referenciaSchema = new Schema({

    titulo:{
        type: String,
        require:true
    },

    autor:{
        type: String,
        require:true
    },
    ano:{
        type: Number,
        require:true
    },
    usuarioId:{
        type: mongoose.ObjectId, 
        ref: 'User', 
        require:true
    },options},
    {
        timestamps: true
    }

);

const Referencia = mongoose.model("Referencia", referenciaSchema);

module.exports = Referencia;