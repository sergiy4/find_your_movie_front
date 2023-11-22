export interface Movie {
  _id: string;
  name: string;
  isMovie: boolean;
  tmdb_id: number;
  backdrop_path: string;
}

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

export interface getCollectionsQueryParams extends PaginationQueryParams {
  search?: string;
}

export interface getCollectionParams extends PaginationQueryParams {
  search?: string;
  collectionID: string;
}

export interface getCollectionResult {
  _id: string;
  collectionName: string;
  isPrivate: boolean;
  movies: Movie[];
}

export interface CollectionCredential {
  name: string;
  isPrivate: boolean;
}
export interface UpdateCollectionCredential extends CollectionCredential {
  collectionID: string;
}
