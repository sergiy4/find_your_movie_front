import { apiSlice } from '../../../app/api/apiSlice';
import {
  GetMovieParams,
  AddMovieToCollectionParams,
  DeleteMovieFromCollectionParams,
} from '../types';
import { Collection } from '../../collection/types';

const movieSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovie: builder.query<unknown, GetMovieParams>({
      query: ({ collectionID, movieID }) => ({
        url: `/collections/${collectionID}/movies/${movieID}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => {
        return [{ type: 'Collection', id: arg.collectionID }];
      },
    }),

    addMovieToCollection: builder.mutation<
      Collection,
      AddMovieToCollectionParams
    >({
      query: ({ name, backdrop_path, isMovie, tmdb_id, collectionID }) => ({
        url: `/collections/${collectionID}/movies`,
        method: 'POST',
        body: {
          name,
          backdrop_path,
          isMovie,
          tmdb_id,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Collection', id: arg.collectionID }];
      },
    }),

    deleteMovieFromCollection: builder.mutation<
      { data: { message: string } },
      DeleteMovieFromCollectionParams
    >({
      query: ({ collectionID, movieID }) => ({
        url: `/collections/${collectionID}/movies/${movieID}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Collection', id: arg.collectionID }];
      },
    }),
  }),
});

export const {
  useGetMovieQuery,
  useAddMovieToCollectionMutation,
  useDeleteMovieFromCollectionMutation,
} = movieSlice;
