import type { ICurso } from "./curso.model";
import type { ITrilha } from "./trilha.model";
import type { IUsuario } from "./usuario.model";

export interface ICertificado {
  id?: string;
  usuario: IUsuario;         
  curso: ICurso;             
  trilha?: ITrilha;          
  codigoVerificacao: string; 
  dataEmissao: string;
}