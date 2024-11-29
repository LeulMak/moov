import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { axiosInstance } from "~/app/_core/config/axios_config/axios_config";
import type { Movie, MovieList } from "~/app/_core/models/movie/movie";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const movieRouter = createTRPCRouter({
  getPopularMovies: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ ctx, input }) => {
      const response = await axiosInstance
        .get(`movie/popular?language=en-US&page=${input.page}`, {
          headers: {
            Authorization: ctx.Authorization,
          },
        })
        .catch((error) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error as string | undefined,
          });
        });
      return response.data as MovieList;
    }),
  getFirstPopularMovie: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ ctx, input }) => {
      const response = await axiosInstance
        .get(`movie/popular?language=en-US&page=${input.page}`, {
          headers: {
            Authorization: ctx.Authorization,
          },
        })
        .catch((error) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error as string | undefined,
          });
        });

      const movieDataList = response.data as MovieList;
      const movieDataListResult = movieDataList.results;

      if (movieDataListResult != null && movieDataListResult.length != 0) {
        return movieDataListResult.at(0)!;
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Popular movies not found. Please try again",
        });
      }
    }),
});
