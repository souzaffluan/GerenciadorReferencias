import "./Navbar.css";

// componentes
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BshousedoorFill,
  BsFillPeresonFill,
  BsFillCameraFill,
  BsHouseDoor,
} from "react-icons/bs";
const Navbar = () => {
  return (
    <nav id="nav">
      <Link to="/">GeRef</Link>
      <form id="search-form">
        <BsSearch />
        <input type="text" placeholder="Pesquisar"></input>
      </form>
      <ul id="nav-links">
        <li>
        <NavLink to="/">
          <BsHouseDoor />
        </NavLink>
        </li>
        <li><NavLink to="/login">Entrar</NavLink></li>
        <li><NavLink to="/register">Cadastrar</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
