export interface Movie {
  _id: string;
  userID: string;
  name: string;
  isMovie: boolean;
  tmdb_id: number;
  backdrop_path: string;
}

export interface AddToCollectionMovie {
  name: string;
  isMovie: boolean;
  tmdb_id: number;
  backdrop_path: string;
}

export interface DetailMovie {
  genres?: { name: string }[];
  backdrop_path?: string;
  created_by?: { name: string }[];
  title?: string;
  original_title?: string;
  original_name?: string;
  release_date?: string;
  first_air_date?: string;
  homepage?: string;
  status?: string;
  number_of_seasons?: string;
  tagline?: string;
  overview?: string;
  number_of_episodes?: string;
  poster_path?: string;
  id?: number;
}

export interface GetMovieParams {
  collectionID: string;
  movieID: string;
}

export interface AddMovieToCollectionParams {
  movie: AddToCollectionMovie;
  collectionIDs: string[];
}

export interface DeleteMovieFromCollectionParams {
  collectionID: string;
  movieID: string;
}
