import Modal from '../../../components/Modal';
import AddMovieToCollectionForm from '../../movie/components/AddMovieToCollectionsForm';
import { DetailMovie } from '../../movie/types';
import { useNavigate } from 'react-router-dom';

const FoundMovie = ({
  overview,
  genres,
  original_name,
  title,
  release_date,
  first_air_date,
  backdrop_path,
  poster_path,
}: DetailMovie) => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASIC_IMG_URL;
  const genresString = genres?.map((item) => item.name).join(', ');

  let review = overview;
  if (typeof overview === 'string') {
    if (overview?.length > 400) {
      review = overview.slice(0, 400);
    }
  }

  const navigateToMoviePage = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    navigate('/FYM/movie');
  };
  console.log(`${baseUrl}${poster_path}`);
  return (
    <article className="card">
      <section className="card_img_part">
        <img
          src={`${baseUrl}${poster_path}`}
          alt="background img"
          onClick={(e) => {
            e.stopPropagation();
            navigateToMoviePage(e);
          }}
        ></img>
      </section>

      <section className="card_info_part">
        <div className="info_movie_card">
          <h3>{title || original_name}</h3>
          {release_date || first_air_date ? (
            <h4>year - {release_date || first_air_date}</h4>
          ) : null}
          {genres?.length ? (
            <>
              <h4>Genres: </h4>
              <p>{genresString}</p>
            </>
          ) : null}
          {review ? (
            <>
              <h4>description </h4>
              <p>
                {review}
                <span className="more_link" onClick={navigateToMoviePage}>
                  {' MORE...'}
                </span>
              </p>
            </>
          ) : null}
          <Modal label="ADD TO COLLECTION">
            <AddMovieToCollectionForm
              movie={{
                overview,
                genres,
                original_name,
                title,
                release_date,
                first_air_date,
                backdrop_path,
                poster_path,
              }}
            />
          </Modal>
        </div>
      </section>
    </article>
  );
};

export default FoundMovie;
