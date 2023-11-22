export type CustomErrorType = {
  status: number;
  data: {
    message: 'string';
  };
};

export function isCustomErrorType(error: unknown): error is CustomErrorType {
  return (
    typeof error === 'object' &&
    error != null &&
    'data' in error &&
    typeof (error as any)?.data?.message === 'string'
  );
}
