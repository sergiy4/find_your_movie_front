import { SerializedError } from '@reduxjs/toolkit';
import { isCustomErrorType, CustomErrorType } from './isCustomErrorType';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type QueryError =
  | FetchBaseQueryError
  | CustomErrorType
  | SerializedError
  | undefined;

function getQueryErrorMessage(error: QueryError): string {
  console.log(error);
  if (error) {
    if (isCustomErrorType(error)) {
      return ` ${error?.data?.message}`;
    } else if ('error' in error) {
      return ` ${error?.error}`;
    }
  }
  return 'Some error';
}

export default getQueryErrorMessage;
