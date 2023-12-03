import { z } from 'zod';

export const personAuthSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Name is required' })
    .regex(new RegExp(/^[a-zA-Z0-9_\.]+$/), { message: 'Invalid characters' })
    .max(100, { message: 'Name must contain max 100 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password is required' })
    .max(100, { message: 'Password must contain max 100 characters' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/, {
      message:
        'Password must contain upper and lower case letters, numbers and special characters',
    }),
});

export type PersonAuthType = z.infer<typeof personAuthSchema>;
