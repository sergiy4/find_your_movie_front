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

    addMovieToCollections: builder.mutation<
      { data: { message: string } },
      AddMovieToCollectionParams
    >({
      query: ({ movie, collectionIDs }) => ({
        url: `/movies`,
        method: 'POST',
        body: {
          ...movie,
          collectionIDs,
        },
      }),
      invalidatesTags: ['Collection'],
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
  useAddMovieToCollectionsMutation,
  useDeleteMovieFromCollectionMutation,
} = movieSlice;
