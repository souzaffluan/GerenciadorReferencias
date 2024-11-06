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
  return (
    <nav id="nav">
      <Link to="/">GeRef</Link>
      <form id="search-form">
        <BsSearch />
        <input type="text" placeholder="Pesquisar"></input>
      </form>
      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink key={user.id} to={`;users/${user._id}`}/>
                <BsFillCameraFill></BsFillCameraFill>
              </li>
            )}
              <li>
                <NavLink to="/profile">
                <BsFillPersonFill />
                </NavLink>
              </li>
              <li>
              <NavLink to="/create-reference">Criar Referência</NavLink>
            </li>
              <li>
                <span onClick={handlelogout}>Sair</span>
              </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
