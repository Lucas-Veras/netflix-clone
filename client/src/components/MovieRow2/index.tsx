import { IMovieRow } from "../../interfaces/IMovieRow";
import "./styles.css";
import { useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MovieItem from "../MovieItem.tsx";
import { IMovieRow2 } from "../../interfaces/IMovieRow2";

const MovieRow2 = ({
  title,
  content,
  __v,
  _id,
  createdAt,
  genre,
  type,
  updatedAt,
}: IMovieRow2) => {
  const [scrollX, setScrollX] = useState(0);
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = content.length * 2 * 150;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60 -100;
    }
    setScrollX(x);
  };

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow-left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>

      <div className="movieRow-right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className="movieRow-listArea">
        <div
          className="movieRow-list"
          style={{
            marginLeft: scrollX,
            width: content.length * 305,
          }}
        >
          {content.length > 0 &&
            content.map((item, key) => (
              <MovieItem key={key} index={key} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow2;
