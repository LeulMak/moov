"use client";

import { fetchPopularMovie } from "./_core/services/movie_service/use_movie_service";
import { HeroSection } from "./_components/HeroSection";

export default function Home() {
  const { data, isLoading: isPopularMoviesLoading } = fetchPopularMovie({
    page: 1,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white overflow-x-hidden">
      <HeroSection  />
    </main>
  );
}
