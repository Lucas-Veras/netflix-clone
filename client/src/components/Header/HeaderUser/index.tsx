import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./styles.css"

interface IHeaderUser {
  handleClick: () => void;
  showMenu: boolean;
}

const HeaderUser = ({ handleClick, showMenu }: IHeaderUser) => {
  return (
    <div className="header-user" onClick={handleClick}>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="user"
        />
      </div>
      <ArrowDropDownIcon
        className={showMenu ? `menuTriangle active` : `menuTriangle`}
      />
      <ArrowDropDownIcon
        className={showMenu ? `dropdown-triangle active` : `dropdown-triangle`}
      />
      <div className={showMenu ? `dropdown active` : `dropdown`}>
        <p>Configurações</p>
        <p className="logout">Sair da netflix</p>
      </div>
    </div>
  );
};

export default HeaderUser;
