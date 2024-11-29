import type { Movie } from "../_core/models/movie/movie";
import {
  fetchFirstPopularMovie,
  fetchPopularMovie,
} from "../_core/services/movie_service/use_movie_service";
import { NoData } from "./NoData";
import Image from "next/image";
import { Spinner } from "./Spinner";
import { Nav } from "./Nav";
import { Button } from "./ui/button";
import { ArrowUpRight, Star } from "lucide-react";

export const HeroSection = () => {
  const { data, isLoading: isHeroMovieLoading } = fetchFirstPopularMovie({
    page: 1,
  });

  const { data: trendingMovies, isLoading: isTrendingMoviesLoading } =
    fetchPopularMovie({ page: 1 });

  if (isHeroMovieLoading) return <Spinner />;

  if (!isHeroMovieLoading && data == null) return <NoData />;

  /// Trending movies mapping
  const trendingMoviesMapping =
    trendingMovies?.results && trendingMovies.results.length != 0
      ? trendingMovies?.results.map((movie) => (
          <div key={movie.id} className="h-72 w-52 rounded-lg bg-white">
            <img
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path ?? ""}`}
              className="h-72 w-60 rounded-lg"
            />
          </div>
        ))
      : null;

  return (
    <div className="flex h-screen flex-col">
      <div className="relative">
        {/* Background image */}
        <img
          src={`https://image.tmdb.org/t/p/original${data?.backdrop_path ?? ""}`}
          alt={data?.title ?? ""}
          className="h-screen w-screen object-cover"
        />

        {/* Overlay content */}
        <div className="absolute top-0 flex h-screen w-screen flex-col bg-gradient-to-t from-[#121212] to-transparent text-white"></div>
        <div className="absolute top-0 flex h-screen w-screen flex-col bg-gradient-to-r from-[#121212] to-transparent text-white">
          <Nav />

          {/* Hero content detail */}
          <div className="flex grow flex-col justify-center px-24">
            <div className="mt-44 flex w-1/2 flex-col">
              <h3 className="text-6xl font-bold">{data?.title ?? ""}</h3>
              <p className="flex flex-row gap-2 items-center"><Star size={18} color="yellow" /> {data?.vote_average}</p>
              <p className="font-extralight mt-3">{data?.overview}</p>
              <Button
                className="mt-5 w-1/4 rounded-full bg-white text-black hover:bg-white hover:text-black"
                variant="default"
              >
                Get Details <ArrowUpRight />
              </Button>
            </div>

            {/*  */}
            <div className="mt-48 flex w-screen flex-col">
              <h4 className="text-xl font-medium">Trending Movies</h4>
              <div className="mt-10 flex flex-wrap gap-3">
                {trendingMoviesMapping}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
