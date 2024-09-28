/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  IChoice,
  ICreatedChoice,
  ICreatedNarrativeQuestion,
  ICreatedQuestion,
  ICreatedSelectiveQuestion,
  INarrativeQuestion,
  IQuestion,
  ISelectiveQuestion
} from '../models/i-question.ts';

function isIBaseQuestion(obj: any): boolean {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.content === 'string' &&
    typeof obj.necessity === 'boolean' &&
    typeof obj.order === 'number'
  );
}

function isIChoice(obj: any): obj is IChoice {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.content === 'string'
  );
}

function isISelectiveQuestion(obj: any): obj is ISelectiveQuestion {
  return (
    isIBaseQuestion(obj) &&
    obj.type === 'SELECTIVE' &&
    obj.wordLimit === null &&
    typeof obj.minimumSelection === 'number' &&
    typeof obj.maximumSelection === 'number' &&
    Array.isArray(obj.choices) &&
    obj.choices.every(isIChoice)
  );
}

function isINarrativeQuestion(obj: any): obj is INarrativeQuestion {
  return (
    isIBaseQuestion(obj) &&
    obj.type === 'NARRATIVE' &&
    typeof obj.wordLimit === 'number' &&
    obj.minimumSelection === null &&
    obj.maximumSelection === null &&
    Array.isArray(obj.choices) &&
    obj.choices.length === 0
  );
}

function isIQuestion(obj: any): obj is IQuestion {
  return isISelectiveQuestion(obj) || isINarrativeQuestion(obj);
}

function isICreatedChoice(obj: any): obj is ICreatedChoice {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.id === null || typeof obj.id === 'number') &&
    typeof obj.content === 'string'
  );
}

function isICreatedSelectiveQuestion(
  obj: any,
): obj is ICreatedSelectiveQuestion {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.id === null || typeof obj.id === 'number') &&
    typeof obj.content === 'string' &&
    typeof obj.necessity === 'boolean' &&
    typeof obj.order === 'number' &&
    obj.type === 'SELECTIVE' &&
    obj.wordLimit === null &&
    typeof obj.minimumSelection === 'number' &&
    typeof obj.maximumSelection === 'number' &&
    Array.isArray(obj.choices) &&
    obj.choices.every(isICreatedChoice)
  );
}

function isICreatedNarrativeQuestion(
  obj: any,
): obj is ICreatedNarrativeQuestion {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.id === null || typeof obj.id === 'number') &&
    typeof obj.content === 'string' &&
    typeof obj.necessity === 'boolean' &&
    typeof obj.order === 'number' &&
    obj.type === 'NARRATIVE' &&
    typeof obj.wordLimit === 'number' &&
    obj.minimumSelection === null &&
    obj.maximumSelection === null &&
    Array.isArray(obj.choices) &&
    obj.choices.length === 0
  );
}

function isICreatedQuestion(obj: any): obj is ICreatedQuestion {
  return isICreatedSelectiveQuestion(obj) || isICreatedNarrativeQuestion(obj);
}

export {
  isICreatedQuestion,
  isIBaseQuestion,
  isICreatedChoice,
  isICreatedNarrativeQuestion,
  isICreatedSelectiveQuestion,
  isIChoice,
  isINarrativeQuestion,
  isISelectiveQuestion,
  isIQuestion,
};
