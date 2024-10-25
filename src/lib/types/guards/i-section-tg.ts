/* eslint-disable @typescript-eslint/no-explicit-any */

import { ISection } from '../models/i-section.ts';
import { isIQuestion } from './i-question-tg.ts';

export function isISection(obj: any): obj is ISection {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    Array.isArray(obj.questions) &&
    obj.questions.every(isIQuestion)
  );
}
