import type { IPlano } from "./plano.model";
import type { IUsuario } from "./usuario.model";

export interface IAssinatura {
  id?: string;
  usuario: IUsuario;
  plano: IPlano;    
  dataInicio: string;
  dataFim: string;
}