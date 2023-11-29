import { useUpdateCollectionMutation } from '../collectionSlice/collectionApi';
import { useForm, FormProvider } from 'react-hook-form';
import CheckboxInput from '../../../components/CheckboxInput';
import FormInput from '../../../components/FormInput';
import { CollectionSchema, CollectionSchemaType } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

interface UpdateCollectionFormProps {
  _id: string;
  isPrivate: boolean;
  name: string;
}

const UpdateCollectionForm = ({
  _id,
  isPrivate,
  name,
}: UpdateCollectionFormProps) => {
  const notifyError = (value: string) => toast.error(value);
  const notifySuccess = () => toast.success('Сollection successfully updated ');

  const methods = useForm<CollectionSchemaType>({
    resolver: zodResolver(CollectionSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [update, { isError, isSuccess, error, isLoading }] =
    useUpdateCollectionMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await update({ ...data, collectionID: _id });
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    if (isError) {
      let errorMessage = getQueryErrorMessage(error);
      notifyError(errorMessage);
    }
    if (isSuccess) {
      notifySuccess();
    }
  }, [isSuccess, isError]);

  return (
    <>
      <h1>UPDATE COLLECTION</h1>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormInput
            label="Name"
            placeholder="Name"
            id={'name'}
            type="text"
            name="name"
            defaultValue={name}
            errors={errors}
          />
          <CheckboxInput
            label="Private ?"
            name="isPrivate"
            errors={errors}
            defaultValue={isPrivate}
          />
          <button
            disabled={isLoading}
            onClick={onSubmit}
            className="btn submit_btn"
          >
            SAVE
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default UpdateCollectionForm;
