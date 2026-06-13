import { z } from "zod";

export interface ICategoria {
  id?: string;
  nome: string;
  descricao?: string;
}

export const categoriaSchema = z.object({
  nome: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  descricao: z.string().optional(),
});