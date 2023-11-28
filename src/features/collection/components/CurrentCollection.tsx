import { useGetCollectionQuery } from '../collectionSlice/collectionApi';
import { useSearchParamsState } from '../../../hooks/useSearchParamsState';
import { useParams } from 'react-router-dom';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import DebounceInput from '../../../components/DeboundeInput';
import Loader from '../../../components/Loader';
import MovieCard from '../../movie/components/MovieCard';
import Pagination from '../../../components/Pagination';
import Modal from '../../../components/Modal';
import UpdateCollectionForm from './UpdateCollection';
import { ReactElement, useEffect, useRef } from 'react';

const CurrentCollection = () => {
  let load;
  let content = useRef<ReactElement[] | ReactElement | null>();
  let pagination;
  let title = useRef<string>('');
  let editBtn;
  const { collectionID } = useParams();
  const [movie, setMovie] = useSearchParamsState('movie', '');
  const [page, setPage] = useSearchParamsState('page', '1');

  const { data, isSuccess, isLoading, isFetching, isError, error } =
    useGetCollectionQuery({
      movie,
      page: parseInt(page, 10),
      collectionID: collectionID || '',
    });

  if (isLoading) {
    load = <Loader />;
  } else if (isError) {
    let errorMessage = getQueryErrorMessage(error);
    content.current = <p>{errorMessage}</p>;
  } else if (isSuccess) {
    content.current = data?.movies?.map((movie) => (
      <MovieCard {...movie} userID={data.userID} key={movie._id} />
    ));
    pagination = (
      <Pagination
        currentPage={parseInt(page, 10)}
        setPage={setPage}
        siblingCount={1}
        totalPageCount={data.totalPageCount}
      />
    );

    editBtn = (
      <UpdateCollectionForm
        _id={data._id}
        isPrivate={data.isPrivate}
        name={data.collectionName}
      />
    );
    title.current = data.collectionName;
  }

  useEffect(() => {
    if (isError) {
      setPage('1');
    }
  }, [isError]);
  return (
    <>
      <main className="collection_page">
        <section className="collection_page_header_container">
          <header className="title_collection">
            <h1 className="title">{title.current}</h1>
            <Modal label={'EDIT'} disabled={isLoading || isFetching}>
              {editBtn}
            </Modal>
          </header>
          <DebounceInput setSearch={setMovie} search={movie} />
        </section>
        <section className="collection_page_container">
          <section className="movie_grid">{content.current}</section>
          {load}
          <section>{pagination}</section>
        </section>
      </main>
    </>
  );
};

export default CurrentCollection;
