import { selectFoundMovie } from '../FYMSlice/FYMSlice';
import { useSelector } from 'react-redux';
import CurrentMovie from '../../movie/components/CurrentMovie';

const FoundMoviePage = () => {
  const movie = useSelector(selectFoundMovie);
  return (
    <>
      <CurrentMovie {...movie} />
    </>
  );
};
export default FoundMoviePage;
