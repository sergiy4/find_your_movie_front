import { z } from 'zod';

export const CollectionSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must contain max 100 characters' })
    .regex(new RegExp(/^[a-zA-Z0-9_\.]+$/), { message: 'Invalid characters' }),

  isPrivate: z.boolean(),
});

export type CollectionSchemaType = z.infer<typeof CollectionSchema>;
// /^[a-zA-Z0-9_\.]+$/
