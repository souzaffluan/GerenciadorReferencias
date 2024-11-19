import "./Auth.css";

// components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

//hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux
import {login, reset} from '../../slices/authSlice'

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const dispatch = useDispatch()

  const {loading, error} = useSelector((state)=> state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
        email,
        senha
    }
    dispatch(login(user));
  };

  //limpar todos states
  useEffect(()=>{
    dispatch(reset())
  }, [dispatch]);
  
  return (
    <div id="login">
      <div class="logo-container">
    <img src="logo.png" alt="Logo" class="logo" />
  </div>
      <p className="subtitle">Faça login para ver suas referências.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        ></input>
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
          value={senha || ""}
        ></input>
        {!loading && <input type="submit" value="Entrar"></input>}
        {loading && <input type="submit" value="Aguarde..."></input>}
        {error && <Message key="error-message" msg={error} type="error"></Message>}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui.</Link>
      </p>
    </div>
  );
};

export default Login;
