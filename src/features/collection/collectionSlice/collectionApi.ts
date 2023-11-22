import { apiSlice } from '../../../app/api/apiSlice';
import {
  getCollectionsQueryParams,
  getCollectionsQueryResult,
  getCollectionParams,
  getCollectionResult,
  CollectionCredential,
  Collection,
  UpdateCollectionCredential,
} from '../types';

export const collectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCurrentUserCollections: builder.query<
      getCollectionsQueryResult,
      getCollectionsQueryParams
    >({
      query: ({ page, pageSize, search }) => ({
        url: '/collections',
        method: 'GET',
        params: { page, pageSize, search },
      }),
      providesTags: (result) => {
        if (result) {
          return [
            { type: 'Collection', id: 'LIST' },
            ...result.collections.map((collections) => ({
              type: 'Collection' as const,
              id: collections._id,
            })),
          ];
        } else return [{ type: 'Collection', id: 'LIST' }];
      },
    }),

    getCollection: builder.query<getCollectionResult, getCollectionParams>({
      query: ({ collectionID, page, pageSize, search }) => ({
        url: `/collections/${collectionID}`,
        method: 'GET',
        params: { page, pageSize, search },
      }),

      providesTags: (result) => {
        if (result) {
          return [{ type: 'Collection', id: result._id }];
        }
        return [{ type: 'Collection', id: 'LIST' }];
      },
    }),

    createNewCollection: builder.mutation<Collection, CollectionCredential>({
      query: ({ isPrivate, name }) => ({
        url: '/collections',
        method: 'POST',
        body: {
          name,
          isPrivate,
        },
      }),
      invalidatesTags: ['Collection'],
    }),

    updateCollection: builder.mutation<Collection, UpdateCollectionCredential>({
      query: ({ isPrivate, name, collectionID }) => ({
        url: `/collections${collectionID}`,
        method: 'PATCH',
        body: {
          name,
          isPrivate,
        },
      }),
      invalidatesTags: ['Collection'],
    }),

    deleteCollection: builder.mutation<{ data: { message: string } }, string>({
      query: (id) => ({
        url: `/collections${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Collection'],
    }),
  }),
});

export const {
  useGetAllCurrentUserCollectionsQuery,
  useGetCollectionQuery,
  useCreateNewCollectionMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
} = collectionApiSlice;
