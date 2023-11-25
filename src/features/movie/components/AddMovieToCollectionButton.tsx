import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { useAddMovieToCollectionsMutation } from '../movieSlice/movieApi';
import { AddToCollectionMovie, Movie } from '../types';

interface AddMovieToCollectionButton {
  selectedCollection: string[];
  movie: AddToCollectionMovie;
}

const AddMovieToCollectionButton = ({
  selectedCollection,
  movie,
}: AddMovieToCollectionButton) => {
  let errorMessage;
  const [addMovie, { isError, isLoading, isSuccess, error }] =
    useAddMovieToCollectionsMutation();

  if (isError) {
    errorMessage = getQueryErrorMessage(error);
  } else if (isSuccess) {
    // TODO: Success message
  }

  async function addMovieToCollection(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    try {
      if (selectedCollection.length === 0) {
        throw Error('no collection selected');
      }
      await addMovie({ movie, collectionIDs: selectedCollection });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <button
        disabled={isLoading}
        onClick={(e) => {
          addMovieToCollection(e);
        }}
      >
        SUBMIT
      </button>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </>
  );
};

export default AddMovieToCollectionButton;
