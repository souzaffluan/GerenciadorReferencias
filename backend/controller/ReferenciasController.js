const { Referencia, Livro, Artigo, Podcast, Revista } = require("../models/Referencias");


// criar referencia
const createReferencia = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    
    // Desestruturar diretamente do req.body
    const { tipo, titulo, autor, ano, ...dados } = req.body;

    // Verificação de campos obrigatórios
    if (!titulo || titulo.trim() === "" || 
        !autor || 
        !autor.nome || autor.nome.trim() === "" || 
        !autor.sobrenome || autor.sobrenome.trim() === "" || 
        !ano || isNaN(ano)) {
      return res.status(400).json({ message: "Preencha todos os campos obrigatórios: título, autor (nome e sobrenome) e ano." });
    }

    let novaReferencia;

    switch (tipo) {
      case 'Livro':
        novaReferencia = new Livro({ titulo, autor, ano, ...dados, usuarioId: userId });
        break;
      case 'Artigo':
        novaReferencia = new Artigo({ titulo, autor, ano, ...dados, usuarioId: userId });
        break;
      case 'Podcast':
        novaReferencia = new Podcast({ titulo, autor, ano, ...dados, usuarioId: userId });
        break;
      case 'Revista':
        novaReferencia = new Revista({ titulo, autor, ano, ...dados, usuarioId: userId });
        break;
      default:
        return res.status(400).json({ message: 'Tipo de referência inválido' });
    }

    // Salvar a nova referência no banco de dados
    const savedReferencia = await novaReferencia.save();
    res.status(201).json(savedReferencia);

  } catch (err) {
    console.error(err); // Adicione log de erro para depuração
    res.status(500).json({ message: "Ocorreu um erro ao criar a referência." });
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

// Atualizar referência
const updateReferencia = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const referenciaId = req.params.id;
    const { tipo, autor: { nome, sobrenome }, ...dados } = req.body;

    // Verificar se a referência existe e pertence ao usuário
    let referenciaExistente = await Referencia.findOne({ _id: referenciaId, usuarioId: userId });

    if (!referenciaExistente) {
      return res.status(404).json({ message: "Referência não encontrada." });
    }

    // Determinar o tipo de referência e atualizar os campos
    let referenciaAtualizada;

    switch (tipo) {
      case 'Livro':
        referenciaAtualizada = await Livro.findByIdAndUpdate(
          referenciaId,
          { ...dados, autor: { nome, sobrenome }, usuarioId: userId },
          { new: true }
        );
        break;

      case 'Artigo':
        referenciaAtualizada = await Artigo.findByIdAndUpdate(
          referenciaId,
          { ...dados, autor: { nome, sobrenome }, usuarioId: userId },
          { new: true }
        );
        break;

      case 'Podcast':
        referenciaAtualizada = await Podcast.findByIdAndUpdate(
          referenciaId,
          { ...dados, autor: { nome, sobrenome }, usuarioId: userId },
          { new: true }
        );
        break;

      case 'Revista':
        referenciaAtualizada = await Revista.findByIdAndUpdate(
          referenciaId,
          { ...dados, autor: { nome, sobrenome }, usuarioId: userId },
          { new: true }
        );
        break;

      default:
        return res.status(400).json({ message: 'Tipo de referência inválido.' });
    }

    res.status(200).json(referenciaAtualizada);
    
  } catch (err) {
    res.status(400).json({ message: "Erro ao atualizar a referência.", error: err.message });
  }
};

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
    deleteReferencia,
    updateReferencia
}