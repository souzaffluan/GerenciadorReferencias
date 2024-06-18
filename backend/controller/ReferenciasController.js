const { Referencia, Livro, Artigo, Podcast } = require("../models/Referencias");

//criar referencia
const createReferencia = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { tipo, autor: { nome, sobrenome }, ...dados } = req.body;

    let novaReferencia;

    switch (tipo) {
      case 'Livro':
        novaReferencia = new Livro({ ...dados, autor: { nome, sobrenome }, usuarioId: userId });
        break;
      case 'Artigo':
        novaReferencia = new Artigo({ ...dados, autor: { nome, sobrenome }, usuarioId: userId });
        break;
        
        case 'Podcast':
          novaReferencia = new Podcast({ ...dados, autor: { nome, sobrenome }, usuarioId: userId });
        break;
      default:
        return res.status(400).json({ message: 'Tipo de referência inválido' });
    }

    const savedReferencia = await novaReferencia.save();
    res.status(201).json(savedReferencia);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//pegar referencias do usuario
const getReferenciasbyUser = async (req, res) =>{

  try {
    const userId = req.user._id.toString();

    const referencias = await Referencia.find({usuarioId: userId});
    res.json({ error: null, referencias: referencias });
  } catch (error) {
    return res.status(400).json({ error });
    
  }

}

//deletar referencia
const deleteReferencia = async(req, res)=>{
  try {
    const userId = req.user._id.toString();
    const referenciaId = req.params.id;

    const referencia = await Referencia.findOne({ _id: referenciaId, usuarioId: userId });

    if(!referencia){
      res.status(404).json({ error: "Náo foi encontrado a referencia" });
    }

    await Referencia.deleteOne({ _id: referenciaId, usuarioId: userId });
    res.json({ error: null, message: "Referencia excluida com sucesso!" });
    
  } catch (error) {
    res.status(400).json({ error: "Acesso negado!" });
  }
}

module.exports = {
    createReferencia,
    getReferenciasbyUser,
    deleteReferencia
}