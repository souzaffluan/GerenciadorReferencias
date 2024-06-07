const mongoose = require("mongoose");
const { Schema } = mongoose;

//variavel para discriminar o tipo de referencia
const options = {
  discriminatorKey: "tipo",
  collection: "referencias",
  timestamps: true,
};

const referenciaSchema = new Schema(
  {
    titulo: {
      type: String,
      require: true,
    },

    subtitulo: {
      type: String,
      require: false,
    },

    autor: {
      nome:{
        type: String,
        require:true
      },
      sobrenome:{
        type: String,
        require: true
      }
    },
    ano: {
      type: Number,
      require: true,
    },
    usuarioId: {
      type: mongoose.ObjectId,
      ref: "User",
      require: true,
    },
  },
  options
);

const Referencia = mongoose.model("Referencia", referenciaSchema);

const livroSchema = new Schema({
  editora: String,
  edicao: String,
  datapubli: Date,
});

const artigoOnlineSchema = new Schema({
  nomeSite: String,
  url: String,
  disponivel: String,
  acesso: Date,
});

const Livro = Referencia.discriminator("Livro", livroSchema);
const Artigo = Referencia.discriminator("Artigo", artigoOnlineSchema);

module.exports = { Referencia, Livro, Artigo };
