const { Referencia, Livro, Artigo } = require("../models/Referencias");

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
      default:
        return res.status(400).json({ message: 'Tipo de referência inválido' });
    }

    const savedReferencia = await novaReferencia.save();
    res.status(201).json(savedReferencia);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
    createReferencia
}