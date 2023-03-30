import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import NetflixAvatar from "../../assets/netflixAvatar.png"
import { getHeaders } from "../../utils/getHeaders";

const CreatedAt = (date) => {
  const newDate = new Date(date).getTime()
  return newDate
}

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([])

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await api.get("/users?new=true", getHeaders())
        setNewUsers(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getNewUsers()
  }, [])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map(user => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={user.profilePic || NetflixAvatar}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">{CreatedAt(user.createdAt)}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
