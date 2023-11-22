import { useUpdateCollectionMutation } from '../collectionSlice/collectionApi';
import { useForm, FormProvider } from 'react-hook-form';
import CheckboxInput from '../../../components/CheckboxInput';
import FormInput from '../../../components/FormInput';
import { CollectionSchema, CollectionSchemaType } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { Collection } from '../types';

const CreateCollectionForm = ({ _id, isPrivate, name }: Collection) => {
  let errorMessage;
  let successMessage;

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

  if (isError) {
    console.log(error);
    errorMessage = getQueryErrorMessage(error);
  } else if (isSuccess) {
    // TODO: success message
    successMessage = 'Collection created!';
  }
  return (
    <>
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
          <button disabled={isLoading} onClick={onSubmit}>
            Create
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default CreateCollectionForm;
