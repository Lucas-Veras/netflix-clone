import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  PlayCircleOutline,
  List,
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li>
              <NavLink to="/" className={({ isActive }) =>
                isActive ? "link sidebarListItem active" : "link sidebarListItem"
              }>
                <LineStyle className="sidebarIcon" />
                Home
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <li>
              <NavLink to="/users" className={({ isActive }) =>
                isActive ? "link sidebarListItem active" : "link sidebarListItem"
              }>
                <PermIdentity className="sidebarIcon" />
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={({ isActive }) =>
                isActive ? "link sidebarListItem active" : "link sidebarListItem"
              }>
                <PlayCircleOutline className="sidebarIcon" />
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink to="/lists" className={({ isActive }) =>
                isActive ? "link sidebarListItem active" : "link sidebarListItem"
              }>
                <List className="sidebarIcon" />
                Lists
              </NavLink>
            </li>
            {/**      <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>
        {/**    <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div >
  );
}
