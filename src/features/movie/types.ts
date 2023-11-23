export interface Movie {
  _id: string;
  name: string;
  isMovie: boolean;
  tmdb_id: number;
  backdrop_path: string;
}

export interface GetMovieParams {
  collectionID: string;
  movieID: string;
}

export interface AddMovieToCollectionParams {
  collectionID: string;
  name: string;
  tmdb_id: string;
  isMovie: boolean;
  backdrop_path: string;
}

export interface DeleteMovieFromCollectionParams {
  collectionID: string;
  movieID: string;
}
