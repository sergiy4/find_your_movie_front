import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { useDeleteMovieFromCollectionMutation } from '../movieSlice/movieApi';

interface DeleteMovieButtonProps {
  collectionID: string;
  movieID: string;
}
const DeleteMovieButton = ({
  collectionID,
  movieID,
}: DeleteMovieButtonProps) => {
  let errorMessage;
  const [deleteMovie, { isError, error }] =
    useDeleteMovieFromCollectionMutation();

  if (isError) {
    errorMessage = getQueryErrorMessage(error);
  }

  return (
    <>
      <button
        className="btn delete_collection_btn"
        onClick={() =>
          deleteMovie({
            collectionID,
            movieID,
          })
        }
      >
        DELETE
      </button>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </>
  );
};

export default DeleteMovieButton;
