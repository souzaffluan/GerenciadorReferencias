import "./Navbar.css";

//redux
import {logout, reset} from '../slices/authSlice'

//hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// componentes
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
  BsHouseDoor,
} from "react-icons/bs";
const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handlelogout = () =>{
    dispatch(logout());
    dispatch(reset());
    navigate("/login")
  }

  const handleSearch = (e) => {
    e.preventDefault();
    // lógica de pesquisa
  };

  

  

  return (
    <nav id="nav" key={"navbar"}>
      <Link to="/">GeRef</Link>
      <form id="search-form" onSubmit={handleSearch}>
        <BsSearch />
        <input type="text" placeholder="Pesquisar"></input>
        
      </form>
      
      <ul id="nav-links">
        {auth ? (
          <>
            <li key={"home"}>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            
              <li key={"profile"}>
                <NavLink to="/profile">
                <BsFillPersonFill />
                </NavLink>
              </li>
              <li key={"create-reference"}>
              <NavLink to="/create-reference" >Criar Referência</NavLink>
            </li>
              <li key={"logout"}>
              <NavLink to="/login" onClick={handlelogout}>Sair</NavLink>
              </li>
          </>
        ) : (
          <>
            <li key={"entrar"}>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li  key={"cadastro"}>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
