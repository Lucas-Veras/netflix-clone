import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  Publish,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import NetflixAvatar from "../../assets/netflixAvatar.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext/userContext";
import { getUser, updateUser } from "../../context/userContext/apiCall";
import Loading from "../../components/Loading";

export default function User() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(UserContext);
  const { state } = useLocation();
  const { _id } = state.some;

  useEffect(() => {
    setLoading(true);
    getUser(_id).then((msg) => {
      setUser(msg);
      setEmail(msg.email);
      setUsername(msg.username);
      setIsAdmin(msg.isAdmin);
      setProfilePic(msg.profilePic);
      setLoading(false);
    });
  }, [_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    let updatedUser = {
      username,
      email,
      isAdmin,
      profilePic,
    };

    if (password) {
      updatedUser.password = password;
    }

    updateUser(user._id, updatedUser, dispatch).then((msg) => {
      if (typeof msg === "string") {
        setError(msg);
        setLoading(false);
        return;
      }
      setUser(msg);
      setLoading(false);
    });
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.profilePic ? user.profilePic : NetflixAvatar}
              alt={user.username}
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">{user._id}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                {new Date(user.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle" style={{ margin: 0 }}>
                Last update:{" "}
                {new Date(user.updatedAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle" style={{ margin: 0 }}>
                Is Admin: {user.isAdmin ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label className="userUpdateItem">Is Admin</label>
                <input
                  type="checkbox"
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  checked={isAdmin}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="******"
                  className="userUpdateInput"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="userUpdateItem">
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.profilePic ? user.profilePic : NetflixAvatar}
                  alt={user.username}
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button
                className="userUpdateButton"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <Loading width="15px" /> : <span>Update</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
