import { DetailMovie, AddToCollectionMovie } from '../features/movie/types';

export function getMovieObjForRequest(
  movie: DetailMovie | AddToCollectionMovie
): AddToCollectionMovie {
  let movieObjForRequest;

  if ('name' in movie) {
    movieObjForRequest = {
      name: movie.name,
      isMovie: movie.isMovie,
      tmdb_id: movie.tmdb_id,
      backdrop_path: movie.backdrop_path,
    };
  } else {
    movieObjForRequest = {
      name: movie.title || movie.original_title || movie.original_name || '',
      isMovie: movie.number_of_episodes ? false : true,
      tmdb_id: movie.id!,
      backdrop_path: movie.backdrop_path || '',
    };
  }
  return movieObjForRequest;
}
