import { useGetCollectionQuery } from '../collectionSlice/collectionApi';
import { useSearchParamsState } from '../../../hooks/useSearchParamsState';
import { useParams } from 'react-router-dom';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import DebounceInput from '../../../components/DeboundeInput';
import Loader from '../../../components/Loader';
import MovieCard from '../../movie/components/MovieCard';
import Pagination from '../../../components/Pagination';

const CurrentCollection = () => {
  let content;
  let pagination;
  const { collectionID } = useParams();
  const [movie, setMovie] = useSearchParamsState('movie', '');
  const [page, setPage] = useSearchParamsState('page', '1');

  const { data, isSuccess, isLoading, isFetching, isError, error } =
    useGetCollectionQuery({
      movie,
      page: parseInt(page, 10),
      collectionID: collectionID || '',
    });

  if (isLoading || isFetching) {
    content = <Loader />;
  } else if (isError) {
    let errorMessage = getQueryErrorMessage(error);
    content = <p>{errorMessage}</p>;
  } else if (isSuccess) {
    content = data.movies.map((movie) => <MovieCard key={movie._id} />);
    pagination = (
      <Pagination
        currentPage={parseInt(page, 10)}
        setPage={setPage}
        siblingCount={1}
        totalPageCount={data.totalPageCount}
      />
    );
  }

  return (
    <>
      <DebounceInput setSearch={setMovie} search={movie} />
      {content}
      {pagination}
    </>
  );
};

export default CurrentCollection;
