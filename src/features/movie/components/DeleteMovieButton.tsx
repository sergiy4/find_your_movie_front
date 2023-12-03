import getQueryErrorMessage, {
  QueryError,
} from '../../../utils/getQueryErrorMessage';
import { useDeleteMovieFromCollectionMutation } from '../movieSlice/movieApi';
import useToastMessages from '../../../hooks/useToastMessage';
import ToastMessage from '../../../components/ToastMeassage';

interface DeleteMovieButtonProps {
  collectionID: string;
  movieID: string;
}
const DeleteMovieButton = ({
  collectionID,
  movieID,
}: DeleteMovieButtonProps) => {
  const [notifySuccess, notifyError] = useToastMessages();

  const [deleteMovie, {}] = useDeleteMovieFromCollectionMutation();

  const deleteHandle = async () => {
    try {
      await deleteMovie({
        collectionID,
        movieID,
      }).unwrap();

      notifySuccess('Collection successfully deleted');
    } catch (err) {
      let errorMessage = getQueryErrorMessage(err as QueryError);
      notifyError(errorMessage);
    }
  };
  return (
    <>
      <button
        className="btn delete_collection_btn"
        onClick={(e) => {
          e.stopPropagation();
          deleteHandle();
        }}
      >
        DELETE
      </button>
    </>
  );
};

export default DeleteMovieButton;
