import { useParams } from 'react-router-dom';
import CurrentMovie from '../components/CurrentMovie';
import { useGetMovieQuery } from '../movieSlice/movieApi';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import Loader from '../../../components/Loader';
import { DetailMovie } from '../types';

const Movie = () => {
  let content;
  const { movieID, collectionID } = useParams();
  const { data, isSuccess, isError, isFetching, isLoading, error } =
    useGetMovieQuery({
      collectionID: collectionID || '',
      movieID: movieID || '',
    });

  if (isFetching || isLoading) {
    content = <Loader />;
  } else if (isError) {
    let errorMessage = getQueryErrorMessage(error);
    content = <p>{errorMessage}</p>;
  } else if (isSuccess) {
    content = <CurrentMovie {...(data as DetailMovie)} />;
  }
  return <>{content}</>;
};

export default Movie;
