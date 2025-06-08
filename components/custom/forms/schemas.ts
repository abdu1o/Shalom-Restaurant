import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' });

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Enter correct email' }),
  password: passwordSchema,
});

export const formRegisterSchema = z
  .object({
    email: z.string().email({ message: 'Enter correct email' }),
    fullName: z.string().min(2, { message: 'Enter your full name' }),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      const { password, confirmPassword } = data;

      if (!password && !confirmPassword) return true;

      if (password && confirmPassword) {
        return password.length >= 8 && password === confirmPassword;
      }

      return false;
    },
    {
      message:
        'Both password fields must be filled, match, and be at least 8 characters',
      path: ['confirmPassword'],
    }
  );

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
