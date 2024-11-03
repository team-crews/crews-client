import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FieldErrors } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import { RoleSchema } from '../types/schemas/role-schema.ts';
import { z } from 'zod';
import { AnswersBySectionSchema } from '../types/schemas/application-schema.ts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findFirstErrorMessage(errors: FieldErrors): string | null {
  for (const key in errors) {
    const error = errors[key];

    if (error?.message) {
      return error.message as string;
    }

    if (typeof error === 'object') {
      const nestedMessage = findFirstErrorMessage(error as FieldErrors);
      if (nestedMessage) return nestedMessage;
    }
  }
  return null;
}

/** This function changes date number to HH:MM:SS format*/
export const formatNumberTime = (diff: number) => {
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}:${String(seconds).padStart(2, '0')}`;
};

export function extractRole(token: string) {
  const payload = jwtDecode<{ sub: string; role: string; exp: number }>(token);

  return RoleSchema.parse(payload.role);
}

export function findSelectedSection(
  answersBySection: z.infer<typeof AnswersBySectionSchema>[],
): number[] {
  const selectedSections = answersBySection.reduce(
    (acc: number[], ansBySec) => {
      if (
        ansBySec.answers.some((ans) => {
          if (ans.type === 'NARRATIVE' && ans.content !== null) return true;
          if (ans.type === 'SELECTIVE' && ans.choiceIds !== null) return true;
          return false;
        })
      )
        acc.push(ansBySec.sectionId);
      return acc;
    },
    [],
  );

  if (answersBySection.length > 1 && selectedSections.length === 1)
    selectedSections.push(1);

  return selectedSections;
}
