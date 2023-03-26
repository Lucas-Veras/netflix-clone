import React, { useContext } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./styles.css";
import NetflixAvatar from "../../../assets/netflixAvatar.png";
import { AuthContext } from "../../../context/authContext/authContext";
import { logout } from "../../../context/authContext/authActions";

interface IHeaderUser {
  handleClick: () => void;
  showMenu: boolean;
  dispatch: (e: any) => any;
}

const HeaderUser = ({ handleClick, showMenu, dispatch }: IHeaderUser) => {
  return (
    <div className="header-user" onClick={handleClick}>
      <div>
        <img src={NetflixAvatar} alt="user" />
      </div>
      <ArrowDropDownIcon
        className={showMenu ? `menuTriangle active` : `menuTriangle`}
      />
      <ArrowDropDownIcon
        className={showMenu ? `dropdown-triangle active` : `dropdown-triangle`}
      />
      <div className={showMenu ? `dropdown active` : `dropdown`}>
        <p>Configurações</p>
        <p className="logout" onClick={() => dispatch(logout())}>
          Sair da netflix
        </p>
      </div>
    </div>
  );
};

export default HeaderUser;
