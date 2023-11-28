import { useParams } from 'react-router-dom';

interface PaginationButtonProps {
  page: number;
  setPage: (newState: string) => void;
}
const PaginationButton = ({ page, setPage }: PaginationButtonProps) => {
  console.log(location.href);
  const urlPage = new URL(location.href).searchParams.get('page');
  console.log(urlPage);

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
