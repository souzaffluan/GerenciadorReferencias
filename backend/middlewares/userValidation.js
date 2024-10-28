const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("nome")
      .isString()
      .withMessage("O nome é obrigatorio.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no minimo 3 caracteres!"),
    body("email")
      .isString()
      .withMessage("O email é obrigatório!")
      .isEmail()
      .withMessage("Insira um email válido"),
    body("senha")
      .isString()
      .withMessage("A senha é obrigatória!")
      .isLength({ min: 5 })
      .withMessage("A senha deve ter no mínimo 5 caracteres!"),
    body("confirmaSenha")
      .isString()
      .withMessage("A confirmnação de senha é obrigatoria!")
      .custom((value, { req }) => {
        if (value != req.body.senha) {
          throw new Error("As senhas não são iguais!");
        }
        return true;
      }),
  ];
};

const loginValidation = () =>{
    return [
        body("email")
        .isString()
        .withMessage("O email é obrigátorio")
        .isEmail()
        .withMessage("insira um email válido"),
        body("senha")
        .isString()
        .withMessage("A senha é obrigatória")
    ]
};

const userUpdateValidation = () =>{
    return[
    body("nome")
    .optional()
    .isLength({min:3})
    .withMessage("O nome deve ter no minimo 3 caracteres"),
    body("senha")
    .optional()
    .isLength({min:3})
    .withMessage("A senha deve ter no minimo 5 caracteres")
    ]
}

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation
};
