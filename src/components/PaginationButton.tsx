import { SetURLSearchParams } from 'react-router-dom';
import { addUrlParameter } from '../utils/addUrlParameter';

interface PaginationButtonProps {
  page: number;
  setPage: (newState: string) => void;
  setSearchParams: SetURLSearchParams;
}
const PaginationButton = ({
  page,
  setPage,
  setSearchParams,
}: PaginationButtonProps) => {
  const setCurrentPage = () => {
    // const urlWithPageParameter = addUrlParameter('page', page.toString(10));

    // setSearchParams(urlWithPageParameter);
    setPage(page.toString(10));
  };

  return <button onClick={() => setCurrentPage()}>{page}</button>;
};

export default PaginationButton;
