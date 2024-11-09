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
      required: true,
    },

    subtitulo: {
      type: String,
      required: false,
    },

    autor: {
      nome:{
        type: String,
        required:true
      },
      sobrenome:{
        type: String,
        required: true
      }
    },
    ano: {
      type: Number,
      required: true,
    },
    usuarioId: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
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

const podcastSchema = new Schema({
  nomePodcast: String,
  entrevistado: String,
  entrevistador: String,
  local: {
    produtora: String,
    dataPod: Date,
  },
  url: String,
  acesso: Date,
})

const revistaSchema = new Schema({
  tituloRevista: String,
  local: String,
  volume: Number,
  numero: Number,
  paginas: String
})

const Livro = Referencia.discriminator("Livro", livroSchema);
const Artigo = Referencia.discriminator("Artigo", artigoOnlineSchema);
const Podcast = Referencia.discriminator("Podcast", podcastSchema)
const Revista = Referencia.discriminator("Revista", revistaSchema)

module.exports = { Referencia, Livro, Artigo, Podcast, Revista };
