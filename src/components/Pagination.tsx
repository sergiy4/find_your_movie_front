import { usePagination, usePaginationArgs } from '../hooks/usePagination';
import PaginationButton from './PaginationButton';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps extends usePaginationArgs {
  // setPage: React.Dispatch<React.SetStateAction<number>>;
  setPage: (newState: string) => void;
}

const Pagination = ({
  currentPage,
  siblingCount = 1,
  totalPageCount,
  setPage,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    siblingCount,
    totalPageCount,
  });
  console.log(paginationRange);
  const [searchParams, setSearchParams] = useSearchParams();

  if (!paginationRange) {
    return null;
  }
  if (currentPage === 0 && paginationRange?.length < 2) {
    return null;
  }

  return (
    <>
      <section>
        {paginationRange.map((page) => {
          if (typeof page === 'string') {
            return <div key={page}>...</div>;
          }

          return (
            <PaginationButton
              page={page}
              key={page}
              setPage={setPage}
              setSearchParams={setSearchParams}
            />
          );
        })}
      </section>
    </>
  );
};

export default Pagination;
