import { isAxiosError } from 'axios';

type ErrorHandler = 'PRINT' | 'THROW';

function handleError(
  e: unknown,
  errorFunctionName: string,
  errorHandler: ErrorHandler = 'PRINT',
): void {
  let errorMessage: string;

  if (isAxiosError(e) && e.response)
    errorMessage = `[${errorFunctionName}] ${e.response.status} : ${e.response.data.message || e.response.data.detail || 'no  error message'}`;
  else errorMessage = `[${errorFunctionName}] ${e}`;

  if (errorHandler === 'PRINT') console.error(errorMessage);
  else throw new Error(errorMessage);
}

export function throwCustomError(
  errorFunctionName: string,
  errorMessage: string,
): never {
  throw new Error(`[${errorFunctionName}] ${errorMessage}`);
}

export default handleError;
