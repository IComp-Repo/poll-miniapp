import { z } from "zod";

export const baseRegisterSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
    register: z.string().min(1, { message: "Matrícula obrigatória" }),
    is_professor: z.boolean({
        required_error: "Selecione se você é professor",
        invalid_type_error: "Selecione se você é professor",
    }),
});

export type RegisterSchemaInput = z.input<typeof baseRegisterSchema>; 
