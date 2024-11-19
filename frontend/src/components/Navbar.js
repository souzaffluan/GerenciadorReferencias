import "./Navbar.css";
import { useState } from "react";

//redux
import { logout, reset } from "../slices/authSlice";
import { searchReferencias } from "../slices/referenciaSlice";

//hooks
import { useAuth } from "../hooks/useAuth";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";

// componentes
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,

} from "react-icons/bs";
const Navbar = () => {
  const { auth } = useAuth();
  const [searchTerm, setSearchTerm] = useState(""); // Armazena o termo de pesquisa
  

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return; // Evita buscas vazias
    dispatch(searchReferencias(searchTerm)); // Faz a pesquisa pelo Redux
  };

  return (
    <nav id="nav" key={"navbar"}>
      <Link to="/">GeRef</Link>
      <form id="search-form" onSubmit={handleSearch}>
        <BsSearch />
        <input
          type="text"
          placeholder="Pesquisar por Autor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
        />
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
              <NavLink to="/create-reference">Criar Referência</NavLink>
            </li>
            <li key={"logout"}>
              <NavLink to="/login" onClick={handlelogout}>
                Sair
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li key={"entrar"}>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li key={"cadastro"}>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
