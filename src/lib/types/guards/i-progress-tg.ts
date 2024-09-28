/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProgress } from '../models/i-progress.ts';

export function isIProgress(obj: any): obj is IProgress {
  return (
    obj === 'READY' ||
    obj === 'IN_PROGRESS' ||
    obj === 'COMPLETION' ||
    obj === 'ANNOUNCED'
  );
}
