import { isAxiosError } from 'axios';

type ErrorHandler = 'PRINT' | 'THROW';

function handleError(
  e: unknown,
  errorFunctionName: string,
  errorHandler: ErrorHandler = 'PRINT',
): number | null {
  let errorMessage: string;

  let errorStatus = null;
  if (isAxiosError(e) && e.response) {
    errorStatus = e.response.status;
    errorMessage = `[${errorFunctionName}] ${e.response.status} : ${e.response.data.message || e.response.data.detail || 'no  error message'}`;
  } else errorMessage = `[${errorFunctionName}] ${e}`;

  if (errorHandler === 'PRINT') {
    console.error(errorMessage);
    return errorStatus;
  } else throw new Error(errorMessage);
}

export default handleError;
