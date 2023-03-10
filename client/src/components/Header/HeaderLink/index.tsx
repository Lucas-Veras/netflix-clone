import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import "./styles.css"

const HeaderLink = (props: NavLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "activeNavLink" : "deactiveNavLink"
      }
      {...props}
    />
  );
};

export default HeaderLink;
