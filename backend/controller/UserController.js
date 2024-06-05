const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET;

//geracao do token do usuario
const generateToken = (id) =>{
    return jwt.sign({id}, jwtSecret,{
        expiresIn: "7d"
    });
};

//registrar usuario e logar
const register = async(req, res) =>{
    const {nome, email, senha} = req.body

    //checar se usuario existe
    const user = await User.findOne({email});

    if(user){
        res.status(422).json({erros:["Por favor, utilize outro email"]})
        return
    }

    //gerar hash da senha
    const salt = await bcrypt.genSalt()
    const senhaHash = await bcrypt.hash(senha, salt);

    //criar usuario
    const newUser = await User.create({
        nome,
        email,
        senha: senhaHash

    })

    //se o usuario for criado com sucesso, irei retornar o token
    if(!newUser){
        res.status(422).json({erros:["Houve um erro por favor tente mais tarde"]})
        return

    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })

};

//login de usuário
const login = async (req, res) =>{
    const {email, senha} = req.body

    const user = await User.findOne({email});

    //checar se o usuario existe
    if(!user){
        res.status(404).json({errors: ["Usuário não encontrado."]})
        return
    }

    //verificar se a senha esta correta
    if(!(await bcrypt.compare(senha, user.senha))){
        res.status(422).json({erros: ["Senha inválida"]})
        return
    }

    //retornar usuario com o token
    res.status(201).json({
        _id: user._id,
        token: generateToken(user._id)
    })
}

module.exports = {
    register,
    login,
};