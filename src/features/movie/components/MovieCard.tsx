import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { card, cardImg } from '../../../utils/anim';
import { Movie } from '../types';
import Modal from '../../../components/Modal';
import AddMovieToCollectionForm from './AddMovieToCollectionsForm';
import useAuth from '../../auth/hooks/useAuth';
import DeleteMovieButton from './DeleteMovieButton';
import { htmlDecode } from '../../../utils/htmlDecode';
const MovieCard = ({
  _id,
  backdrop_path,
  isMovie,
  name,
  tmdb_id,
  userID,
}: Movie) => {
  const { userID: authUser } = useAuth();
  const navigate = useNavigate();
  const { collectionID } = useParams();
  const baseImgUrl = import.meta.env.VITE_BASIC_IMG_URL;
  const isUserOwnerColelction = userID === authUser ? true : false;
  console.log(isUserOwnerColelction);
  console.log(userID);
  console.log(`${baseImgUrl}${backdrop_path}`);

  function navigateToMovie() {
    navigate(`/collections/${collectionID}/movies/${_id}`);
  }
  return (
    <>
      <article className="movie_card">
        <motion.section
          variants={card}
          whileHover="hover"
          className="movie_img"
          onClick={navigateToMovie}
        >
          <motion.img
            alt="poster img  ."
            variants={cardImg}
            src={`${baseImgUrl}${htmlDecode(backdrop_path)}`}
          />
        </motion.section>

        <section className="movie_info_section">
          <h2 className="movie_title" onClick={navigateToMovie}>
            {name}
          </h2>
          <section>
            <Modal label="ADD TO COLLECTION">
              <AddMovieToCollectionForm
                movie={{ _id, backdrop_path, isMovie, name, tmdb_id }}
              />
            </Modal>

            {isUserOwnerColelction ? (
              <DeleteMovieButton
                collectionID={collectionID || ''}
                movieID={_id}
              />
            ) : null}
          </section>
        </section>
      </article>
    </>
  );
};

export default MovieCard;
