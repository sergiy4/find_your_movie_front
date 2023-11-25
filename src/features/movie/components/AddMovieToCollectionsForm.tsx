import { useGetCurrentUserAllCollectionsQuery } from '../../collection/collectionSlice/collectionApi';
import AddMovieToCollectionButton from './AddMovieToCollectionButton';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { useState } from 'react';
import { DetailMovie, Movie } from '../types';
import { getMovieObjForRequest } from '../../../utils/getMovieObjForRequest';
import Modal from '../../../components/Modal';
import CreateCollectionForm from '../../collection/components/CreateCollectionForm';

interface AddMovieToCollectionFormProps {
  movie: DetailMovie | Movie;
}

const AddMovieToCollectionForm = ({ movie }: AddMovieToCollectionFormProps) => {
  console.log('FORM');
  let movieObj = getMovieObjForRequest(movie);
  console.log(movieObj);
  const [selectedCollection, setSelectedCollection] = useState<string[]>([]);
  let content;
  let errorMessage;

  const { data, isError, isLoading, isSuccess, error, isFetching } =
    useGetCurrentUserAllCollectionsQuery();

  function handleCheckboxChange(
    e: React.ChangeEvent<HTMLInputElement>,
    collectionId: string
  ) {
    if (e.target.checked) {
      setSelectedCollection((prev) => [...prev, collectionId]);
    } else {
      setSelectedCollection((prev) => prev.filter((id) => id !== collectionId));
    }
  }

  if (isFetching || isLoading) {
  } else if (isError) {
    errorMessage = getQueryErrorMessage(error);
  } else if (isSuccess) {
    if (data) {
      console.log(data);
      content = data.map((collection) => (
        <div key={collection._id} className="form_item">
          <label>{collection.name}</label>
          <input
            type="checkbox"
            onChange={(e) => handleCheckboxChange(e, collection._id)}
          ></input>
        </div>
      ));
      console.log(content);
    }
  }

  return (
    <section className="around_form">
      <h2 className="title_form">ADD TO COLLECTION</h2>
      <form className="add_movie_form" onSubmit={(e) => e.preventDefault()}>
        <div className="overflow_form">
          {isSuccess ? <>{content}</> : <>Create collection</>}
          {content}
        </div>
      </form>
      <section className="buttons_section">
        {/* <button className="btn create_collection_btn" onClick={changeOpen}>
          CREATE COLLECTION
        </button> */}
        <AddMovieToCollectionButton
          movie={movieObj}
          selectedCollection={selectedCollection}
        />
        <Modal label="CREATE COLLECTION">
          <CreateCollectionForm />
        </Modal>
      </section>
    </section>
  );
};

export default AddMovieToCollectionForm;
