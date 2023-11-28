import { useEffect } from 'react';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { useAddMovieToCollectionsMutation } from '../movieSlice/movieApi';
import { AddToCollectionMovie, Movie } from '../types';
import { toast } from 'react-toastify';

interface AddMovieToCollectionButton {
  selectedCollection: string[];
  movie: AddToCollectionMovie;
}

const AddMovieToCollectionButton = ({
  selectedCollection,
  movie,
}: AddMovieToCollectionButton) => {
  let errorMessage;
  const notifySuccess = () => toast.success('Movie added to collections');
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
  useEffect(() => {
    if (isSuccess) {
      notifySuccess();
    }
  }, [isSuccess]);
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
