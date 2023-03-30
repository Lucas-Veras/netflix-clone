import React, { useContext } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import NetflixLogo from "../../assets/netflixLogo.png"
import Avatar from "../../assets/netflixAvatar.png"
import { AuthContext } from "../../context/authContext/authContext"

export default function Topbar() {
  const { user } = useContext(AuthContext)

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">
            <img src={NetflixLogo} alt="" />
          </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src={user.profilePic ? user.profilePic : Avatar} alt={user.username} className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
