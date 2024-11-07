import { z } from 'zod';

export const RoleSchema = z.union([z.literal('APPLICANT'), z.literal('ADMIN')]);
