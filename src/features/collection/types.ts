import { Movie } from '../movie/types';

export interface Collection {
  _id: string;
  userID: string;
  name: string;
  isPrivate: boolean;
  movies: Movie[];
}

export interface getCollectionsQueryResult {
  collections: Collection[];
  totalCountPage: number;
}

export interface PaginationQueryParams {
  page?: number;
  pageSize?: number;
}

export interface getCollectionsQueryParams {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface getCollectionParams extends PaginationQueryParams {
  movie?: string;
  collectionID: string;
}

export interface getCollectionResult {
  _id: string;
  collectionName: string;
  isPrivate: boolean;
  movies: Movie[];
  totalPageCount: number;
}

export interface CollectionCredential {
  name: string;
  isPrivate: boolean;
}
export interface UpdateCollectionCredential extends CollectionCredential {
  collectionID: string;
}
