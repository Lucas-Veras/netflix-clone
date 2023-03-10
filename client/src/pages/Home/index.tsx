import { useEffect, useState } from "react";
import MovieRow from "../../components/MovieRow";
import { IMoviesList, IResults } from "../../interfaces/ImovieList";
import Tmdb from "../../service/Tmdb";
import FeaturedMovie from "../../components/FeaturedMoview";
import { IMovieDetail } from "../../interfaces/IMovieDetail";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import axios from "axios";
import { api } from "../../service/api";
import { IMovieRow } from "../../interfaces/IMovieRow";
import { IMovieRow2 } from "../../interfaces/IMovieRow2";
import MovieRow2 from "../../components/MovieRow2";
import { IMovie } from "../../interfaces/IMovie";

interface IHome {
  type?: string;
}

const Home = ({ type }: IHome) => {
  const [lists, setLists] = useState<IMovieRow2[]>([]);
  const [genre, setGenre] = useState<string | null>(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await api.get(
          `/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmU1YmNjMzI2M2ZkNjY3YzE1MThmMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3ODEyOTA3OSwiZXhwIjoxNjc4NTYxMDc5fQ.zFmCjAYJmW85R8en0veubhvj5ulNcRLqkPLi6BV8mog" /*+JSON.parse(localStorage.getItem("user")).accessToken,*/,
            },
          },
        );
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
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmU1YmNjMzI2M2ZkNjY3YzE1MThmMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3ODQ4ODA0NCwiZXhwIjoxNjc4OTIwMDQ0fQ.lld-MNaFbjgGh1ymlH8IzoJtI7BvqdNXskw29Hqzrmc" /*+ JSON.parse(localStorage.getItem("user")).accessToken,*/,
            },
          },
        );
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  console.log(content);

  const [movieList, setMovieList] = useState<IMoviesList[]>([]);
  const [featuredData, setFeaturedData] = useState<IMovieDetail | undefined>(
    undefined,
  );

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter((i) => i.slug === "originals");
      let chosen: IResults | undefined;

      while (chosen === undefined || chosen.backdrop_path === null) {
        let ramdomChosen = Math.floor(
          Math.random() * (originals[0].items.results.length - 1),
        );
        chosen = originals[0].items.results[ramdomChosen];
      }

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };
    loadAll();
  }, []);

  return (
    <div className="page">
      <Header />
      {content && <FeaturedMovie item={content} />}

      <section className="lists">
        {lists &&
          lists.map((item: IMovieRow2) => (
            <MovieRow2
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

      {movieList.length <= 0 && <Loading />}
    </div>
  );
};

export default Home;
