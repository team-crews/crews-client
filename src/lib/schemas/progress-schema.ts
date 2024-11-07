import { z } from 'zod';

/*
  FixMe
  - fix to zod enum
  - https://zod.dev/?id=zod-enums
 */
export const ProgressSchema = z.union([
  z.literal('READY'),
  z.literal('IN_PROGRESS'),
  z.literal('COMPLETION'),
  z.literal('ANNOUNCED'),
]);
