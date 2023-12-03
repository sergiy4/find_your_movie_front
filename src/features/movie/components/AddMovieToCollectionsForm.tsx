import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { useState } from 'react';
import { DetailMovie, Movie } from '../types';
import { getMovieObjForRequest } from '../../../utils/getMovieObjForRequest';
import Modal from '../../../components/Modal';
import CreateCollectionForm from '../../collection/components/CreateCollectionForm';
import CollectionList from './CollectionsListForForm';
import useToastMessages from '../../../hooks/useToastMessage';
import { useAddMovieToCollectionsMutation } from '../movieSlice/movieApi';
import { QueryError } from '../../../utils/getQueryErrorMessage';
type AddMovieToCollectionFormProps = {
  movie: DetailMovie | Movie;
};

const AddMovieToCollectionForm = ({ movie }: AddMovieToCollectionFormProps) => {
  let movieObj = getMovieObjForRequest(movie);
  const [selectedCollection, setSelectedCollection] = useState<string[]>([]);
  const [notifySuccess, notifyError] = useToastMessages();

  const [addMovie, { isLoading }] = useAddMovieToCollectionsMutation();

  async function addMovieToCollection(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    try {
      if (selectedCollection.length === 0) {
        throw Error('no collection selected');
      }

      await addMovie({
        movie: movieObj,
        collectionIDs: selectedCollection,
      }).unwrap();

      notifySuccess('Movie added to collections');
    } catch (err) {
      console.log(err);

      let errorMessage = getQueryErrorMessage(err as QueryError);
      notifyError(errorMessage);
    }
  }

  return (
    <section className="around_form">
      <h2 className="title_form">ADD TO COLLECTION</h2>
      <CollectionList setSelectedCollection={setSelectedCollection} />
      <section className="buttons_section">
        <Modal label="CREATE COLLECTION">
          <CreateCollectionForm />
        </Modal>
        <button
          disabled={isLoading}
          className="btn submit_btn"
          onClick={(e) => {
            addMovieToCollection(e);
          }}
        >
          SUBMIT
        </button>
      </section>
    </section>
  );
};

export default AddMovieToCollectionForm;
