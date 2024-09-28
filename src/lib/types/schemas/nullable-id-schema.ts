/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from 'zod';

const WithNullableIdSchema = (schema: z.ZodObject<any>) =>
  schema.extend({
    id: z.number().nullable(),
  });

export default WithNullableIdSchema;
