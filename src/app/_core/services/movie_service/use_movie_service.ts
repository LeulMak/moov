import { api } from "~/trpc/react";

const fetchPopularMovie = api.movie.getPopularMovies.useQuery;
const fetchFirstPopularMovie = api.movie.getFirstPopularMovie.useQuery;

const useFetchNowPlayingMovies = api.post.hello.useQuery;

export { useFetchNowPlayingMovies, fetchPopularMovie, fetchFirstPopularMovie };
