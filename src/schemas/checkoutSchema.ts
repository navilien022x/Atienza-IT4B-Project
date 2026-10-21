import { z } from 'zod'

export const checkoutSchema = z.object({
  notes: z
    .string()
    .trim()
    .max(200, 'Special instructions must be 200 characters or fewer')
    .refine((value) => value.length === 0 || value.length >= 3, {
      message: 'If you add notes, they must be at least 3 characters long',
    })
    .refine((value) => !/\b(asap|urgent)\b/i.test(value), {
      message: 'Please keep requests clear and professional',
    }),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
