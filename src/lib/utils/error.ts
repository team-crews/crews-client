import { AxiosError, isAxiosError } from 'axios';
import { isRouteErrorResponse } from 'react-router-dom';

// export const ERROR: Record<number, string> = {
//   1003: '유효하지 않은 이메일 형식입니다.',
//   1004: '모집 마감 기한은 현재 시각 이전이며 한 시간 단위입니다.',
//   1005: '수정된 모집 마감 기한은 기존 기한 이후이며 모집 진행 중에만 수정할 수 있습니다.',
//   1006: '선택형 문항의 최대 선택 개수는 최소 선택 개수보다 크거나 같습니다.',
//   1007: '모집 공고 결과 발표가 이미 완료되었습니다.',
//   1008: '모집이 이미 시작되었습니다.',
//   1009: '모집이 시작되지 않았습니다.',
//   1010: '모집이 마감되었습니다.',
//   1011: '토큰이 존재하지 않습니다.',
//   1012: '토큰 형식이 잘못 되었습니다.',
//   1013: '잘못된 JWT 서명입니다.',
//   1014: '만료된 JWT 토큰입니다.',
//   1015: '지원되지 않는 JWT 토큰입니다.',
//   1016: 'JWT 토큰이 잘못되었습니다.',
//   1017: '유효하지 않은 refresh token 입니다.',
//   1018: '유효하지 않은 access token 입니다.',
//   1019: '존재하지 않는 사용자입니다.',
//   1020: '권한이 없는 사용자입니다.',
//   1021: '존재하지 않는 리프레시 토큰입니다.',
//   1022: '비밀번호가 일치하지 않습니다.', @@@@@@@
//   1026: '중복된 회원가입', @@@@@@@
//   2000: '엔티티(테이블 컬럼) 검증 실패 ex. 문자열 길이(모집 공고 제목은 30자 이하입니다.) 등',
//   3000: 'attributeName + "로 " + target + "을/를 찾을 수 없습니다."',
// };

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

  if (import.meta.env.DEV) console.error(errorMessage);
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

// FixMe
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getErrorMessage(error: any): string {
  console.log(error);
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return '페이지를 찾을 수 없습니다';
  }

  return error?.response?.data?.message || '예상치 못한 오류가 발생하였습니다';
}
