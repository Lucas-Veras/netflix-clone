import "./styles.css";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IMovie } from "../../interfaces/IMovie";
import { api } from "../../services/api";
import { getHeaders } from "../../utils/getHeaders";

interface IMovieItem {
  index: number;
  item: string;
}

export default function MovieItem({ index, item }: IMovieItem) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState<IMovie>();
  console.log(movie);
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await api.get("/movies/find/" + item, getHeaders());
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMovie();
  }, [item]);

  return (
    <>
      <div className="movieRow-container">
        <div className="movieRow-item">
          {movie?._id && (
            <Link to={`/watch/${movie._id}`} id="movieItem">
              <div
                className="listItem"
                style={
                  isHovered
                    ? { left: index * 225 - 50 + index * 2.5 }
                    : { left: "initial" }
                }
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img src={movie?.img} alt="" className="cap" />
                {isHovered && (
                  <>
                    <video src={movie?.trailer} autoPlay={true} loop />
                    <div className="itemInfo">
                      <div className="icons">
                        <PlayArrow className="icon" />
                        <Add className="icon" />
                        <ThumbUpAltOutlined className="icon" />
                        <ThumbDownOutlined className="icon" />
                      </div>
                      <div className="itemInfoTop">
                        <span>{/*movie.duration*/}</span>
                        <span className="limit">+{movie?.limit}</span>
                        <span>{movie?.year}</span>
                      </div>
                      <div className="desc">{movie?.desc}</div>
                      <div className="genre">{movie?.genre}</div>
                    </div>
                  </>
                )}
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
