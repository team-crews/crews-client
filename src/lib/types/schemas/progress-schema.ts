import { z } from 'zod';

export const ProgressSchema = z.union([
  z.literal('READY'),
  z.literal('IN_PROGRESS'),
  z.literal('COMPLETION'),
  z.literal('ANNOUNCED'),
]);
