import { useState, useRef, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDescription, selectDescription } from '../FYMSlice/FYMSlice';
import useAutoSizeTextArea from '../../../hooks/useAutoSizeTextArea';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
  MutationDefinition,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

export interface DescriptionInputProps {
  isLoading: boolean;
  findMovie: MutationTrigger<
    MutationDefinition<
      string,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      'Collection',
      unknown,
      'api'
    >
  >;
}

const DescriptionInput = ({ isLoading, findMovie }: DescriptionInputProps) => {
  const inputDefault = useSelector(selectDescription);
  const dispatch = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [description, setDescription] = useState<string>(
    inputDefault.currentDescription
  );

  useAutoSizeTextArea(textAreaRef, description);

  async function handleOnSubmit() {
    try {
      if (description.length === 0 || isLoading) {
        return;
      }

      await findMovie(description);
      dispatch(setCurrentDescription({ description }));
    } catch (err) {
      console.log(err);
    }
  }

  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      const element = event.target as HTMLInputElement;
      setDescription(element.value);

      if (description.length === 1) {
        return;
      } else {
        handleOnSubmit();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <section className="fym_input">
      <div
        className="around_input"
        onClick={() => {
          if (textAreaRef.current) {
            textAreaRef.current.focus();
          }
        }}
      >
        <textarea
          maxLength={500}
          ref={textAreaRef}
          rows={1}
          onKeyUp={handleKeyUp}
          onChange={handleDescription}
          value={description}
          onKeyDown={handleKeyDown}
          placeholder="describe movie"
        ></textarea>

        <button
          onClick={handleOnSubmit}
          className="btn search_btn"
          disabled={isLoading}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default DescriptionInput;
