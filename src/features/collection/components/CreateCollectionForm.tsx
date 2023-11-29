import { useCreateNewCollectionMutation } from '../collectionSlice/collectionApi';
import { useForm, FormProvider } from 'react-hook-form';
import CheckboxInput from '../../../components/CheckboxInput';
import FormInput from '../../../components/FormInput';
import { CollectionSchema, CollectionSchemaType } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const CreateCollectionForm = () => {
  const notifyError = (value: string) => toast.error(value);
  const notifySuccess = () => toast.success('Сollection successfully created');

  const methods = useForm<CollectionSchemaType>({
    resolver: zodResolver(CollectionSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [create, { isError, isSuccess, error, isLoading }] =
    useCreateNewCollectionMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await create(data);
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
      <h2>CREATE COLLECTION</h2>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormInput
            label="Name"
            placeholder="Name"
            id={'name'}
            type="text"
            name="name"
            errors={errors}
          />
          <CheckboxInput label="Private ?" name="isPrivate" errors={errors} />
          <button
            disabled={isLoading}
            onClick={onSubmit}
            className="btn submit_btn"
          >
            Create
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default CreateCollectionForm;
