import { SerializedError } from '@reduxjs/toolkit';
import { isCustomErrorType, CustomErrorType } from './isCustomErrorType';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type QueryError =
  | FetchBaseQueryError
  | CustomErrorType
  | SerializedError
  | undefined;

function getQueryErrorMessage(error: QueryError): string {
  console.log(error, 'ererer');
  if (error) {
    if (isCustomErrorType(error)) {
      return `Error: ${error?.data?.message}`;
    } else if ('error' in error) {
      return `Error: ${error?.error}`;
    }
  }
  return 'Some error';
}

export default getQueryErrorMessage;
