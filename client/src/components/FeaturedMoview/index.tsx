import "./styles.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IMovie } from "../../interfaces/IMovie";

interface IFeaturedMovieProps {
  item: IMovie;
  type?: string;
  setGenre: (e: string) => void;
  genre: string | undefined;
}

const FeaturedMovie = ({
  item,
  type,
  setGenre,
  genre,
}: IFeaturedMovieProps) => {
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
        {type && (
          <div className="category">
            <span>{type === "movie" ? "Filmes" : "Séries"}</span>
            <select
              name="genre"
              id="genre"
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
            >
              <option disabled selected>
                Gênero
              </option>
              <option value="">Todos</option>
              <option value="aventura">Aventura</option>
              <option value="Comédia">Comédia</option>
              <option value="Crime">Crime</option>
              <option value="fantasia">Fantasia</option>
              <option value="historico">Histórico</option>
              <option value="Terror">Terror</option>
              <option value="romance">Romance</option>
              <option value="ficçao cientifica">Ficção Científica</option>
              <option value="Ação">Ação</option>
              <option value="animaçao">Animação</option>
              <option value="drama">Drama</option>
              <option value="documentario">Documentário</option>
            </select>
          </div>
        )}
        <div className="featured-horizontal">
          <img src={item.imgTitle} alt={item.title} className="featured-imgTitle" />
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
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovie;
