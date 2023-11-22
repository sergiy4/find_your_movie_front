import { SetURLSearchParams } from 'react-router-dom';
import { addUrlParameter } from '../utils/addUrlParameter';

interface PaginationButtonProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchParams: SetURLSearchParams;
}
const PaginationButton = ({
  page,
  setPage,
  setSearchParams,
}: PaginationButtonProps) => {
  const setCurrentPage = () => {
    const urlWithPageParameter = addUrlParameter('page', page.toString(10));

    setSearchParams(urlWithPageParameter);
    setPage(page);
  };

  return <button onClick={() => setCurrentPage()}>{page}</button>;
};

export default PaginationButton;
