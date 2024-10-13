/* eslint-disable @typescript-eslint/no-explicit-any */

import { IRecruitment } from '../models/i-recruitment.ts';
import { isIProgress } from './i-progress-tg.ts';
import { isISection } from './i-section-tg.ts';

export function isIRecruitment(obj: any): obj is IRecruitment {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    isIProgress(obj.recruitmentProgress) &&
    Array.isArray(obj.sections) &&
    obj.sections.every(isISection) &&
    typeof obj.deadline === 'string' &&
    typeof obj.code === 'string'
  );
}
