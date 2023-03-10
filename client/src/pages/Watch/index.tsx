import "./styles.css";
import { ArrowBackOutlined } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { IMovie } from "../../interfaces/IMovie";

const Watch = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await api.get("/movies/find/" + id, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmU1YmNjMzI2M2ZkNjY3YzE1MThmMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3ODEyOTA3OSwiZXhwIjoxNjc4NTYxMDc5fQ.zFmCjAYJmW85R8en0veubhvj5ulNcRLqkPLi6BV8mog" /*+JSON.parse(localStorage.getItem("user")).accessToken0,*/,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMovie();
  }, []);
 
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className="video" autoPlay controls src={movie?.video} />
    </div>
  );
};

export default Watch;
