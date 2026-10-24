import { z } from 'zod'

export const aiPromptSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, 'Enter at least 20 non-whitespace characters.')
    .max(2000, 'Keep your request to 2000 characters or fewer.'),
})

export type AiPromptFormValues = z.infer<typeof aiPromptSchema>
