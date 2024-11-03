import { AxiosError, isAxiosError } from 'axios';
import { isRouteErrorResponse } from 'react-router-dom';

export function printCustomError(
  e: unknown,
  errorFunctionName: string,
): number | null {
  let errorMessage: string;

  let errorStatus = null;

  if (isAxiosError(e) && e.response) {
    errorStatus = e.response.status;
    errorMessage = `[${errorFunctionName}] ${e.response.status} : ${e.response.data.message || e.response.data.detail || 'no  error message'}`;
  } else errorMessage = `[${errorFunctionName}] ${e}`;

  console.error(errorMessage);
  return errorStatus;
}

export function throwCustomError(e: unknown, errorFunctionName: string): never {
  let errorMessage: string;
  let error: Error;

  if (isAxiosError(e) && e.response) {
    errorMessage = `[${errorFunctionName}] ${e.response.status} : ${e.response.data.message || e.response.data.detail || 'no  error message'}`;

    error = new AxiosError(errorMessage) as AxiosError;

    // e.response should be defined because handleError function has e.response check logic
    (error as AxiosError).response = e.response;
  } else {
    errorMessage = `[${errorFunctionName}] ${e}`;
    error = new Error(errorMessage);
  }

  throw error;
}

export function getErrorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return '페이지를 찾을 수 없습니다';
  }
  return '예상치 못한 오류가 발생하였습니다';
}
