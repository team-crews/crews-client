export type IRole = 'APPLICANT' | 'ADMIN';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIRole(obj: any): obj is IRole {
  return obj === 'APPLICANT' || obj === 'ADMIN';
}
