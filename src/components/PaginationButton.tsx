import { useParams } from 'react-router-dom';

interface PaginationButtonProps {
  page: number;
  currentPage: number;
  setPage: (newState: string) => void;
}
const PaginationButton = ({
  currentPage,
  page,
  setPage,
}: PaginationButtonProps) => {
  const setCurrentPage = () => {
    setPage(page.toString(10));
  };

  return (
    <button
      className={`btn pagination_btn  ${currentPage === page ? 'current' : ''}`}
      onClick={() => setCurrentPage()}
    >
      {page}
    </button>
  );
};

export default PaginationButton;
