/* eslint-disable @typescript-eslint/no-explicit-any */

import { IRole } from '../models/i-role.ts';

export function isIRole(obj: any): obj is IRole {
  return obj === 'APPLICANT' || obj === 'ADMIN';
}
