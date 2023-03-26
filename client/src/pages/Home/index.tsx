import { useContext, useEffect, useState } from "react";
import MovieRow from "../../components/MovieRow";
import FeaturedMovie from "../../components/FeaturedMoview";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { api } from "../../services/api";
import { IMovieRow } from "../../interfaces/IMovieRow";
import { IMovie } from "../../interfaces/IMovie";
import { getHeaders } from "../../utils/getHeaders";
import { AuthContext } from "../../context/authContext/authContext";

interface IHome {
  type?: string;
}

const Home = ({ type }: IHome) => {
  const [lists, setLists] = useState<IMovieRow[]>([]);
  const [genre, setGenre] = useState<string | undefined>();
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        let res;
        if (typeof type === "string") {
          res = await api.get(
            `/lists${type ? "?type=" + type : ""}${
              genre ? "&genre=" + genre : ""
            }`,
            getHeaders(),
          );
        } else {
          res = await api.get(`/lists`, getHeaders());
        }

        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  const [content, setContent] = useState<IMovie>();

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await api.get(
          `/movies/ramdom${type ? "?type=" + type : ""}`,
          getHeaders(),
        );
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <div className="page">
      <Header dispatch={dispatch} />
      {content && (
        <FeaturedMovie
          item={content}
          type={type}
          setGenre={setGenre}
          genre={genre}
        />
      )}

      <section className="lists">
        {lists &&
          lists.map((item: IMovieRow) => (
            <MovieRow
              key={item._id}
              title={item.title}
              content={item.content}
              _id={item._id}
              __v={item.__v}
              createdAt={item.createdAt}
              genre={item.genre}
              type={item.type}
              updatedAt={item.updatedAt}
            />
          ))}
      </section>

      {lists.length <= 0 && <Loading />}
    </div>
  );
};

export default Home;
