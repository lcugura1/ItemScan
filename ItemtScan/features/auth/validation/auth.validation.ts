import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email je obavezan")
    .email("Unesite valjanu email adresu"),
  password: z.string().min(1, "Lozinka je obavezna"),
});

export const signupSchema = z.object({
  fullName: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
  email: z.string().min(1, "Email je obavezan").email("Nevaljana email adresa"),
  password: z
    .string()
    .min(8, "Najmanje 8 znakova")
    .regex(/[A-Z]/, "Mora sadržavati veliko slovo")
    .regex(/[0-9]/, "Mora sadržavati broj"),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type SignupForm = z.infer<typeof signupSchema>;
