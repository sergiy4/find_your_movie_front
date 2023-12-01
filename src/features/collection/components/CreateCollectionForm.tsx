import { useCreateNewCollectionMutation } from '../collectionSlice/collectionApi';
import { useForm, FormProvider } from 'react-hook-form';
import CheckboxInput from '../../../components/CheckboxInput';
import FormInput from '../../../components/FormInput';
import { CollectionSchema, CollectionSchemaType } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import useToastMessages from '../../../hooks/useToastMessage';

const CreateCollectionForm = () => {
  const [notifySuccess, notifyError] = useToastMessages();

  const methods = useForm<CollectionSchemaType>({
    resolver: zodResolver(CollectionSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [create, { error, isLoading }] = useCreateNewCollectionMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await create(data).unwrap();
      notifySuccess('Сollection successfully created');
    } catch (err) {
      console.log(err);

      let errorMessage = getQueryErrorMessage(error);
      notifyError(errorMessage);
    }
  });

  return (
    <>
      <h2>CREATE COLLECTION</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          data-testid="create_collection_form"
        >
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
