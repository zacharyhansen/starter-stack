import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(5001),
  CLIENT_ORIGIN: z.string(),
});

export type Env = z.infer<typeof envSchema>;
