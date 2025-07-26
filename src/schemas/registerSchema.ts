import { z } from "zod";

export const baseRegisterSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
    register: z.string().min(1, { message: "Matrícula obrigatória" }),
    is_professor: z.enum(["true", "false"], {
        required_error: "Selecione se você é professor",
        invalid_type_error: "Selecione se você é professor",
    }),
    telegram_id: z.number().optional(),
});

export type RegisterSchemaInput = z.input<typeof baseRegisterSchema>; 
