import { z } from "zod";

const EMAIL_SCHEMA = z
  .string()
  .min(1, "Endereço de e-mail é obrigatório.")
  .email("Endereço de e-mail inválido.");

export const loginSchema = z.object({
  email: EMAIL_SCHEMA,
  password: z.string().min(1, "Senha é obrigatória."),
});

export const registerSchema = z.object({
  email: EMAIL_SCHEMA,
  name: z
    .string()
    .min(1, {
      message: "Nome é obrigatório.",
    })
    .min(4, "O nome deve ter pelo menos 4 caracteres.")
    .max(24, "O nome pode ter no máximo 24 caracteres."),
  password: z
    .string()
    .min(1, "Senha é obrigatória.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export const partySchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Nome é obrigatório." })
      .min(4, "O nome deve ter pelo menos 3 caracteres.")
      .max(24, "O nome pode ter no máximo 18 caracteres."),
    pixKey: z
      .string()
      .optional()
    ,
    description: z
      .string()
      .max(120, "A descrição pode ter no máximo 120 caracteres.")
      .optional(),
    isPaymentActive: z.boolean().default(false),
    valueForEachParticipant: z
      .string()
      .optional(),
  })
  .refine(
    (data) =>
      !data.isPaymentActive || (data.valueForEachParticipant && parseFloat(data.valueForEachParticipant) > 0),
    {
      path: ["valueForEachParticipant"], // Localiza o erro no campo correto
      message: "O valor deve ser um número válido maior que zero quando pagamentos estão ativos.",
    }
  );

export const resendSchema = z.object({
  email: EMAIL_SCHEMA,
});

export const resetPasswordSchema = z.object({
  email: EMAIL_SCHEMA,
});

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Senha é obrigatória.")
      .min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem.",
    path: ["confirmPassword"],
  });

export const twoFactorSchema = z.object({
  code: z
    .string()
    .regex(/^[0-9]+$/, "O código deve conter apenas números.")
    .length(6, "O código deve ter 6 dígitos."),
});

export const profileSchema = z
  .object({
    name: z.optional(
      z
        .string()
        .min(1, {
          message: "Nome é obrigatório.",
        })
        .min(4, "O nome deve ter pelo menos 4 caracteres.")
        .max(24, "O nome pode ter no máximo 24 caracteres.")
    ),
    email: z.optional(z.string().email("Endereço de e-mail inválido.")),
    password: z.optional(z.string().min(6, "A senha deve ter pelo menos 6 caracteres.")),
    newPassword: z.optional(z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres.")),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (!data.password && data.newPassword) return false;
      return true;
    },
    {
      message: "Senha é obrigatória.",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    {
      message: "Nova senha é obrigatória.",
      path: ["newPassword"],
    }
  );
