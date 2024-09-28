/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICreatedSection, ISection } from '../models/i-section.ts';
import { isICreatedQuestion, isIQuestion } from './i-question-tg.ts';

function isISection(obj: any): obj is ISection {
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

function isICreatedSection(obj: any): obj is ICreatedSection {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.id === null || typeof obj.id === 'number') &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    Array.isArray(obj.questions) &&
    obj.questions.every(isICreatedQuestion)
  );
}

export { isISection, isICreatedSection };
