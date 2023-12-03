import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { useGetCurrentUserAllCollectionsQuery } from '../../collection/collectionSlice/collectionApi';

type CollectionListProps = {
  setSelectedCollection: React.Dispatch<React.SetStateAction<string[]>>;
};
const CollectionList = ({ setSelectedCollection }: CollectionListProps) => {
  let content;
  let errorMessage;
  const { data, isError, isSuccess, error } =
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

  if (isError) {
    errorMessage = getQueryErrorMessage(error);
  } else if (isSuccess) {
    if (data) {
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
    <form className="add_movie_form" onSubmit={(e) => e.preventDefault()}>
      <div className="overflow_form">{content}</div>
    </form>
  );
};

export default CollectionList;
