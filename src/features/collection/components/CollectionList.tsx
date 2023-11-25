import { motion } from 'framer-motion';
import { MoveTextAnimation } from '../../../utils/anim';
import CollectionItem from './CollectionItem';
import { useGetCurrentUserCollectionsQuery } from '../collectionSlice/collectionApi';
import Pagination from '../../../components/Pagination';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import DebounceInput from '../../../components/DeboundeInput';
import { useSearchParamsState } from '../../../hooks/useSearchParamsState';
import Loader from '../../../components/Loader';
import Modal from '../../../components/Modal';
import CreateCollectionForm from './CreateCollectionForm';

const CollectionList = () => {
  let load;
  let collections;
  let pagination;

  const [search, setSearch] = useSearchParamsState('search', '');
  const [page, setPage] = useSearchParamsState('page', '1');

  const { currentData, isSuccess, isError, error, isFetching, isLoading } =
    useGetCurrentUserCollectionsQuery({ search, page: parseInt(page, 10) });

  if (isFetching || isLoading) {
    load = <Loader />;
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
      <main id="my_collection" className="collections_page">
        <section className="collections_page_title_container ">
          <header className="title_my_collections">
            <motion.div className="line_mask">
              <motion.div
                className="wrapper"
                variants={MoveTextAnimation}
                custom={0}
                initial="hidden"
                animate="showCantHover"
              >
                <h1>MY COLLECTIONS</h1>
              </motion.div>
            </motion.div>

            <Modal label="CREATE COLLECTION">
              <CreateCollectionForm />
            </Modal>
          </header>
          <DebounceInput setSearch={setSearch} search={search} />
        </section>
        <section className="collections_page_container ">
          <section className="collection_grid">{collections}</section>
          {load}
          <section>{pagination}</section>
        </section>
      </main>
    </>
  );
};

export default CollectionList;
