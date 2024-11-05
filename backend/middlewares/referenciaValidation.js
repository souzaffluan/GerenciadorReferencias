const { body } = require("express-validator");

const livroValidation = () => {
  return [
    body("tipo").equals("Livro").withMessage("O tipo deve ser 'Livro'."),
    body("autor.nome")
      .isString()
      .withMessage("O nome do autor é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome do autor deve ter no mínimo 3 caracteres."),
    body("autor.sobrenome")
      .isString()
      .withMessage("O sobrenome do autor é obrigatório."),
    body("titulo")
      .isString()
      .withMessage("O título do livro é obrigatório."),
    body("ano")
      .isInt({ min: 0 })
      .withMessage("O ano de publicação é obrigatório e deve ser um número inteiro."),
    body("editora")
      .isString()
      .withMessage("A editora é obrigatória.")
  ];
};

const artigoValidation = () => {
  return [
    body("tipo").equals("Artigo").withMessage("O tipo deve ser 'Artigo'."),
    body("autor.nome")
      .isString()
      .withMessage("O nome do autor é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome do autor deve ter no mínimo 3 caracteres."),
    body("autor.sobrenome")
      .isString()
      .withMessage("O sobrenome do autor é obrigatório."),
    body("titulo")
      .isString()
      .withMessage("O título do artigo é obrigatório."),
    body("ano")
      .isInt({ min: 0 })
      .withMessage("O ano de publicação é obrigatório e deve ser um número inteiro."),
    body("revista")
      .isString()
      .withMessage("O nome da revista é obrigatório.")
  ];
};

const podcastValidation = () => {
  return [
    body("tipo").equals("Podcast").withMessage("O tipo deve ser 'Podcast'."),
    body("autor.nome")
      .isString()
      .withMessage("O nome do autor é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome do autor deve ter no mínimo 3 caracteres."),
    body("autor.sobrenome")
      .isString()
      .withMessage("O sobrenome do autor é obrigatório."),
    body("titulo")
      .isString()
      .withMessage("O título do podcast é obrigatório."),
    body("ano")
      .isInt({ min: 0 })
      .withMessage("O ano de publicação é obrigatório e deve ser um número inteiro."),
    body("plataforma")
      .isString()
      .withMessage("A plataforma do podcast é obrigatória.")
  ];
};

const revistaValidation = () => {
  return [
    body("tipo").equals("Revista").withMessage("O tipo deve ser 'Revista'."),
    body("autor.nome")
      .isString()
      .withMessage("O nome do autor é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome do autor deve ter no mínimo 3 caracteres."),
    body("autor.sobrenome")
      .isString()
      .withMessage("O sobrenome do autor é obrigatório."),
    body("titulo")
      .isString()
      .withMessage("O título da revista é obrigatório."),
    body("ano")
      .isInt({ min: 0 })
      .withMessage("O ano de publicação é obrigatório e deve ser um número inteiro."),
    body("edicao")
      .isString()
      .withMessage("A edição da revista é obrigatória.")
  ];
};

module.exports = {
  livroValidation,
  artigoValidation,
  podcastValidation,
  revistaValidation
};