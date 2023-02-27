import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import MovieRow from "./components/MovieRow";
import { IMoviesList, IResults } from "./interfaces/ImovieList";

import Tmdb from "./service/Tmdb";

import "./App.css";
import FeaturedMovie from "./components/FeaturedMoview";
import { IMovieDetail } from "./interfaces/IMovieDetail";
import Header from "./components/Header";
import Loading from "./components/Loading";

function App() {
  const [movieList, setMovieList] = useState<IMoviesList[]>([]);
  const [featuredData, setFeaturedData] = useState<IMovieDetail | undefined>(
    undefined,
  );
  const [blackHeader, setBlackHeader] = useState(false);

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

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);
  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      {movieList.length <= 0 && <Loading />}
    </div>
  );
}

export default App;
