import { z } from "zod";

export const baseRegisterSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  confirmPassword: z.string().min(8, { message: "A confirmação de senha deve ter pelo menos 8 caracteres" }),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas não coincidem",
      path: ["confirmPassword"], // adiciona erro direto no campo
    });
  }
});

export type RegisterSchemaInput = z.input<typeof baseRegisterSchema>;
