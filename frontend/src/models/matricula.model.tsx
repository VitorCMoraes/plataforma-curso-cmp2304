import type { ICurso } from "./curso.model";
import type { IUsuario } from "./usuario.model";

export interface IMatricula{
    id?: string;
    dataMatricula: Date;
    dataConclusao?: Date;
    usuario: IUsuario;
    curso: ICurso;
}