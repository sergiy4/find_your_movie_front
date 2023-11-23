import CollectionItem from './CollectionItem';
import { useGetAllCurrentUserCollectionsQuery } from '../collectionSlice/collectionApi';
import Pagination from '../../../components/Pagination';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import DebounceInput from '../../../components/DeboundeInput';
import { useSearchParamsState } from '../../../hooks/useSearchParamsState';

const CollectionList = () => {
  let collections;
  let pagination;
  let errorMessage;
  const [search, setSearch] = useSearchParamsState('search', '');
  const [page, setPage] = useSearchParamsState('page', '1');

  const { currentData, isSuccess, isError, error, isFetching, isLoading } =
    useGetAllCurrentUserCollectionsQuery({ search, page: parseInt(page, 10) });

  if (isFetching || isLoading) {
    // loader = <Loader />;
  } else if (isError) {
    console.log(error);
    errorMessage = getQueryErrorMessage(error);
  } else if (isSuccess) {
    console.log(currentData);
    if (currentData) {
      collections = currentData.collections.map((collection) => (
        <CollectionItem key={collection._id} {...collection} />
      ));
    }

    if (currentData?.totalCountPage) {
      pagination = (
        <Pagination
          siblingCount={1}
          currentPage={parseInt(page, 10)}
          setPage={setPage}
          totalPageCount={currentData?.totalCountPage}
        />
      );
    }
  }

  return (
    <>
      <DebounceInput setSearch={setSearch} search={search} />
      {collections}
      {pagination}
    </>
  );
};

export default CollectionList;
