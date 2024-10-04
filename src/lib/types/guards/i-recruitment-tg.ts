/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICreatedRecruitment, IRecruitment } from '../models/i-recruitment.ts';
import { isIProgress } from './i-progress-tg.ts';
import { isICreatedSection, isISection } from './i-section-tg.ts';

function isIRecruitment(obj: any): obj is IRecruitment {
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

function isICreatedRecruitment(obj: any): obj is ICreatedRecruitment {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.id === null || typeof obj.id === 'number') &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    Array.isArray(obj.sections) &&
    obj.sections.every(isICreatedSection) &&
    typeof obj.deadline === 'string'
  );
}

export { isIRecruitment, isICreatedRecruitment };
