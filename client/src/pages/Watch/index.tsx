import "./styles.css";
import { ArrowBackOutlined } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { IMovie } from "../../interfaces/IMovie";
import { getHeaders } from "../../utils/getHeaders";

const Watch = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await api.get(`/movies/find/${id}`, getHeaders());
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
