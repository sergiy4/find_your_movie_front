import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { useDeleteCollectionMutation } from '../collectionSlice/collectionApi';
import useToastMessages from '../../../hooks/useToastMessage';

const DeleteButton = ({ id }: { id: string }) => {
  const [notifySuccess, notifyError] = useToastMessages();

  const [deleteCollection, { error }] = useDeleteCollectionMutation();

  const handleDelete = async () => {
    try {
      await deleteCollection(id).unwrap();
      notifySuccess('Collection was deleted');
    } catch (err) {
      let errorMessage = getQueryErrorMessage(error);
      notifyError(errorMessage);
    }
  };

  return (
    <>
      <button
        className="btn delete_collection_btn"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      >
        DELETE
      </button>
    </>
  );
};

export default DeleteButton;
