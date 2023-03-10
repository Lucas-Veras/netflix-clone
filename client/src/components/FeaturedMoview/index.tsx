import { IMovieDetail } from "../../interfaces/IMovieDetail";
import "./styles.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { IMovie } from "../../interfaces/IMovie";

interface IFeaturedMovieProps {
  item: IMovie;
}

const FeaturedMovie = ({ item }: IFeaturedMovieProps) => {
  let description = item.desc;
  if (description.length > 200) {
    description = description.substring(0, 200) + "...";
  }

  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${item.img})`,
      }}
    >
      <div className="featured-vertical">
        <div className="featured-horizontal">
          {/**   <div className="featured-name">{item.title}</div> */}
          <img
            src="https://w7.pngwing.com/pngs/642/405/png-transparent-superman-logo-the-new-52-the-title-bar-design-heroes-text-trademark-thumbnail.png"
            alt=""
            className="featured-imgTitle"
          />
          {/**     <div className="featured-info">
            <div className="featured-points">{item.limit} anos</div>
            <div className="featured-year">{item.year}</div>
          </div> */}
          <div className="featured-description">{description}</div>
          <div className="featured-buttons">
            <a href={`/watch/${item._id}`} className="featured-watchButton">
              <PlayArrowIcon />
              Assistir
            </a>
            <a href={`/list/add/${item._id}`} className="featured-myListButton">
              <InfoOutlinedIcon />
              Mais informações
            </a>
          </div>
          {/**    <div className="featured-genres">
            Gêneros: <strong>{/*genresList.join(", ") item.genre}</strong>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovie;
