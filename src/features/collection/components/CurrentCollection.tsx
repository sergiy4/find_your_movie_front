import { useGetCollectionQuery } from '../collectionSlice/collectionApi';
import { useSearchParamsState } from '../../../hooks/useSearchParamsState';
import { useParams } from 'react-router-dom';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import DebounceInput from '../../../components/DeboundeInput';
import Loader from '../../../components/Loader';
import MovieCard from '../../movie/components/MovieCard';
import Pagination from '../../../components/Pagination';

const CurrentCollection = () => {
  let load;
  let content;
  let pagination;
  let title;
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
    load = <Loader />;
  } else if (isError) {
    let errorMessage = getQueryErrorMessage(error);
    content = <p>{errorMessage}</p>;
  } else if (isSuccess) {
    content = data.movies.map((movie) => (
      <MovieCard {...movie} key={movie._id} />
    ));
    pagination = (
      <Pagination
        currentPage={parseInt(page, 10)}
        setPage={setPage}
        siblingCount={1}
        totalPageCount={data.totalPageCount}
      />
    );
    title = data.collectionName;
  }

  return (
    <>
      <main className="collection_page">
        <section className="collection_page_header_container">
          <header className="title_collection">
            <h1 className="title">{title}</h1>
            {/* {editBtn} */}
          </header>
          <DebounceInput setSearch={setMovie} search={movie} />
        </section>
        <section className="collection_page_container">
          <section className="movie_grid">{content}</section>
          {load}
          <section>{pagination}</section>
        </section>
      </main>
    </>
  );
};

export default CurrentCollection;
