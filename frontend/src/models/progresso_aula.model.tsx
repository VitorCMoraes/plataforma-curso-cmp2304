import type { IAula } from "./aula.model";
import type { IUsuario } from "./usuario.model";

export interface IProgressoAula {
    id?: string;
    usuario: IUsuario;
    aula: IAula;
    dataConclusao?: string;
    status: "concluido" | "em_progresso" | "nao_iniciado";
}