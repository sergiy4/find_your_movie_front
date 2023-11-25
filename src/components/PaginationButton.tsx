import { useParams } from 'react-router-dom';

interface PaginationButtonProps {
  page: number;
  setPage: (newState: string) => void;
}
const PaginationButton = ({ page, setPage }: PaginationButtonProps) => {
  const urlPage = new URLSearchParams(location.href).get('page');

  const setCurrentPage = () => {
    setPage(page.toString(10));
  };

  return (
    <button
      className={`btn pagination_btn  ${
        urlPage === page.toString(10) ? 'current' : ''
      }`}
      onClick={() => setCurrentPage()}
    >
      {page}
    </button>
  );
};

export default PaginationButton;
