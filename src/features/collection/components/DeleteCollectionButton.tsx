import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { useDeleteCollectionMutation } from '../collectionSlice/collectionApi';

const DeleteButton = ({ id }: { id: string }) => {
  let errorMessage;
  const [deleteCollection, { isError, error }] = useDeleteCollectionMutation();

  if (isError) {
    errorMessage = getQueryErrorMessage(error);
  }

  return (
    <>
      <button onClick={() => deleteCollection(id)}>DELETE</button>;
      {errorMessage ? <p>{errorMessage}</p> : null}
    </>
  );
};

export default DeleteButton;
