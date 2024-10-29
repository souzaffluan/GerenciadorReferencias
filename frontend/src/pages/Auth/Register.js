import "./Auth.css";

//Redux
import {register, reset} from '../../slices/authSlice';

//componentes
import { Link } from "react-router-dom";
import Message from '../../components/Message'

//hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Register = () => {
const [nome, setNome] = useState("")
const [email, setEmail] = useState("")
const [senha, setSenha] = useState("")
const [confirmaSenha, setConfimaSenha] = useState("")

const dispatch = useDispatch()

const {loading, error} = useSelector((state)=> state.auth);

const hundleSubmit = (e) =>{
    e.preventDefault();

    const user = {
        nome, 
        email,
        senha,
        confirmaSenha
    };

    console.log(user);
    dispatch(register(user))
};

//limpar todos os estados
useEffect(()=>{
    dispatch(reset());
}, [dispatch]);

return (
    <div id="register">
      <h2>GeRef</h2>
      <p className="subtitle">Cadastre-se para criar e gerenciar referências</p>
      <form onSubmit={hundleSubmit}>
        <input type="text" placeholder="Nome" onChange={(e) => setNome(e.target.value)} value={nome || ""} />
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email || ""}/>
        <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} value={senha || ""}/>
        <input type="password" placeholder="Confirme a senha" onChange={(e) => setConfimaSenha(e.target.value)} value={confirmaSenha || ""}/>
      
        {!loading && <input type="submit" value="Cadastrar"></input>}
        {loading && <input type="submit" value="Aguarde..."></input>}
        {error && <Message msg={error} type="error"></Message>}
      </form>
      <p>Já tem conta? <Link to="/login"> Clique aqui.</Link></p>
    </div>
);
}

  
  


export default Register;
