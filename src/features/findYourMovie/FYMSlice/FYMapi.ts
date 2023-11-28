import { apiSlice } from '../../../app/api/apiSlice';

const FYMSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFoundMovie: builder.mutation<unknown, string>({
      query: (description) => ({
        url: '/FYM',
        method: 'POST',
        body: {
          description,
        },
      }),
    }),
  }),
});

export const { useGetFoundMovieMutation } = FYMSlice;
