import { DetailMovie } from '../types';
import { htmlDecode } from '../../../utils/htmlDecode';
const CurrentMovie = (movie: DetailMovie) => {
  const baseUrl = import.meta.env.VITE_BASIC_IMG_URL;
  const movieBackgroundImgUrl = htmlDecode(movie?.backdrop_path!);
  const genresString = movie?.genres?.map((item) => item.name).join(', ');
  const creatorsString = movie?.created_by?.map((item) => item.name).join(', ');

  return (
    <>
      <section className="hero_section">
        <section className="movie_page_background">
          <img
            src={`${baseUrl}${movieBackgroundImgUrl}`}
            alt="background img"
          />
        </section>

        <section className="movie_page_container">
          <section className="info">
            <h1>
              {movie.title || movie.original_title || movie.original_name}
            </h1>
            <p>{movie.release_date || movie.first_air_date}</p>
            <p>{genresString ? <span>{genresString}</span> : null}</p>
            {movie?.homepage ? (
              <a href={movie.homepage} target="_blank">
                WATCH
              </a>
            ) : null}
          </section>
        </section>
      </section>

      <section className="second_movie_page">
        <section className="second_movie_page_container">
          {movie?.status ? (
            <>
              <h3>STATUS:</h3>
              <p>{movie?.status}</p>
            </>
          ) : null}
          {movie?.number_of_seasons ? (
            <>
              <h3>seasons:</h3>
              <p>{movie?.number_of_seasons}</p>
            </>
          ) : null}
          {movie?.created_by ? (
            <>
              <h3>CREATED BY: </h3>
              <p>{creatorsString}</p>
            </>
          ) : null}
          {movie?.tagline ? (
            <>
              <h3>TAGLINE: </h3>
              <p>{movie?.tagline}</p>
            </>
          ) : null}
          {movie?.overview ? (
            <>
              <h2>OVERVIEW: </h2>
              <section className="overview_text">
                <p>{movie.overview}</p>
              </section>
            </>
          ) : null}
        </section>
      </section>
    </>
  );
};

export default CurrentMovie;
