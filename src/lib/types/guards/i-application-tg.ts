/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  IAnswer,
  IApplication,
  IApplicationOverview,
  INarrativeAnswer,
  ISelectiveAnswer
} from '../models/i-application.ts';

function isIApplicationOverview(obj: any): obj is IApplicationOverview {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.studentNumber === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.major === 'string' &&
    (obj.outcome === 'PASS' ||
      obj.outcome === 'FAIL' ||
      obj.outcome === 'PENDING')
  );
}

function isIBaseAnswer(obj: any): boolean {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.answerId === 'number' &&
    typeof obj.questionId === 'number'
  );
}

function isINarrativeAnswer(obj: any): obj is INarrativeAnswer {
  return (
    isIBaseAnswer(obj) &&
    typeof obj.content === 'string' &&
    obj.choiceId === null &&
    obj.type === 'NARRATIVE'
  );
}

function isISelectiveAnswer(obj: any): obj is ISelectiveAnswer {
  return (
    isIBaseAnswer(obj) &&
    obj.content === null &&
    typeof obj.choiceId === 'number' &&
    obj.type === 'SELECTIVE'
  );
}

function isICreatedBaseAnswer(obj: any): boolean {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.answerId === null || typeof obj.answerId === 'number') &&
    typeof obj.questionId === 'number'
  );
}

function isICreatedNarrativeAnswer(obj: any): obj is INarrativeAnswer {
  return (
    isICreatedBaseAnswer(obj) &&
    typeof obj.content === 'string' &&
    obj.choiceId === null &&
    obj.type === 'NARRATIVE'
  );
}

function isICreatedSelectiveAnswer(obj: any): obj is ISelectiveAnswer {
  return (
    isICreatedBaseAnswer(obj) &&
    obj.content === null &&
    typeof obj.choiceId === 'number' &&
    obj.type === 'SELECTIVE'
  );
}

function isIAnswer(obj: any): obj is IAnswer {
  return isINarrativeAnswer(obj) || isISelectiveAnswer(obj);
}

function isICreatedAnswer(obj: any): obj is IAnswer {
  return isICreatedNarrativeAnswer(obj) || isICreatedSelectiveAnswer(obj);
}

function isIApplication(obj: any): obj is IApplication {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.studentNumber === 'string' &&
    typeof obj.major === 'string' &&
    typeof obj.name === 'string' &&
    Array.isArray(obj.answers) &&
    obj.answers.every(isIAnswer)
  );
}

function isICreatedApplication(obj: any): obj is IApplication {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.id === null || typeof obj.id === 'number') &&
    typeof obj.studentNumber === 'string' &&
    typeof obj.major === 'string' &&
    typeof obj.name === 'string' &&
    Array.isArray(obj.answers) &&
    obj.answers.every(isICreatedAnswer)
  );
}

export {
  isIBaseAnswer,
  isICreatedBaseAnswer,
  isICreatedApplication,
  isIApplication,
  isINarrativeAnswer,
  isICreatedNarrativeAnswer,
  isICreatedSelectiveAnswer,
  isISelectiveAnswer,
  isIApplicationOverview,
  isICreatedAnswer,
  isIAnswer,
};
