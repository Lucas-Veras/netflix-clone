import { Link, NavLink } from "react-router-dom";
import HeaderLink from "./HeaderLink";
import "./styles.css";
import netflixLogo from "../../assets/netflixLogo.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import HeaderUser from "./HeaderUser";

interface IHeader {
  black: boolean;
}

const Header = ({ black }: IHeader) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  
  return (
    <header className={black ? "black" : ""}>
      <div className="left">
        <Link to="/">
          <img src={netflixLogo} alt="Netflix logo" />
        </Link>
        <div className="header-links">
          <HeaderLink to="/" end>
            Início
          </HeaderLink>
          <HeaderLink to="/series">Séries</HeaderLink>
          <HeaderLink to="/movies">Filmes</HeaderLink>
          <HeaderLink to="/teste" end>
            Bombando
          </HeaderLink>
          <HeaderLink to="/teste" end>
            Minha Lista
          </HeaderLink>
        </div>
      </div>
      <div className="right">
        <div className="header-search">
          <SearchIcon />
        </div>
        <div className="header-type">Infantil</div>
        <div className="header-notifications">
          <NotificationsNoneIcon />
        </div>

        <HeaderUser handleClick={handleShowMenu} showMenu={showMenu} />
      </div>
    </header>
  );
};

export default Header;
