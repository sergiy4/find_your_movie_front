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
  const notifyError = (value: string) => toast.error(value);
  const notifySuccess = () => toast.success('Movie added to collections');
  const [addMovie, { isError, isLoading, isSuccess, error }] =
    useAddMovieToCollectionsMutation();

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
    if (isError) {
      let errorMessage = getQueryErrorMessage(error);
      notifyError(errorMessage);
    } else if (isSuccess) {
      notifySuccess();
    }
  }, [isSuccess, isError]);
  return (
    <>
      <button
        disabled={isLoading}
        className="btn submit_btn"
        onClick={(e) => {
          addMovieToCollection(e);
        }}
      >
        SUBMIT
      </button>
    </>
  );
};

export default AddMovieToCollectionButton;
