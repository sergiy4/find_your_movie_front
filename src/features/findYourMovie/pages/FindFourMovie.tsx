import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { useGetFoundMovieMutation } from '../FYMSlice/FYMapi';
import DescriptionInput from '../components/DescriptionInput';
import { useDispatch, useSelector } from 'react-redux';
import { selectFoundMovie, setFoundMovie } from '../FYMSlice/FYMSlice';
import FoundMovie from '../components/FoundMovie';
import { DetailMovie } from '../../movie/types';
import Loader from '../../../components/Loader';
import { useEffect } from 'react';

const FindYourMovie = () => {
  let content;
  const dispatch = useDispatch();
  const movieInStore = useSelector(selectFoundMovie);
  const [
    findMovie,
    { isError, isLoading, isSuccess, isUninitialized, error, data },
  ] = useGetFoundMovieMutation();

  if (isUninitialized) {
    if (Object.keys(movieInStore).length !== 0) {
      content = <FoundMovie {...movieInStore} />;
    } else {
      content = (
        <article>
          <p className="instruction">
            Describe the movie or series you want, and artificial intelligence
            will find the movie you need. The better and larger the description,
            the better the result
          </p>
        </article>
      );
    }
  } else if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    let errorMessage = getQueryErrorMessage(error);
    console.log(errorMessage);
    content = <p className="error_message">{errorMessage}</p>;
  } else if (isSuccess) {
    const movieData = data as DetailMovie;

    content = <FoundMovie {...movieData} />;
  } else {
    content = <FoundMovie {...movieInStore} />;
  }

  useEffect(() => {
    if (isSuccess) {
      const movieData = data as DetailMovie;
      dispatch(setFoundMovie(movieData));
    }
  }, [isSuccess]);
  return (
    <>
      <main className="fym_page">
        <section className="fym_container">
          <section className="fym_card_place">{content}</section>

          <section className="fym_input_section">
            <DescriptionInput findMovie={findMovie} isLoading={isLoading} />
          </section>
        </section>
      </main>
    </>
  );
};
export default FindYourMovie;
