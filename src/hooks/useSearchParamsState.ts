import { useSearchParams } from 'react-router-dom';

export function useSearchParamsState(
  searchParamName: string,
  defaultValue: string
): readonly [
  searchParamsState: string,
  setSearchParamsState: (newState: string) => void
] {
  const [searchParams, setSearchParams] = useSearchParams();

  const acquiredSearchParam = searchParams.get(searchParamName);
  const searchParamsState = acquiredSearchParam ?? defaultValue;

  const setSearchParamsState = (newState: string) => {
    const next = Object.assign(
      {},
      [...searchParams.entries()].reduce(
        (obj, [key, value]) => ({ ...obj, [key]: value }),
        {}
      ),
      { [searchParamName]: newState }
    );

    // Check if the parameter being changed is 'page'
    if (searchParamName !== 'page') {
      // If any parameter other than 'page' is changed, set 'page' to 1
      next['page'] = '1';
    }
    setSearchParams(next);
  };
  return [searchParamsState, setSearchParamsState];
}
