import { Button } from "../../../components/Button";
import type { IMatricula } from "../../../models/matricula.model";

interface MatriculaTableProps {
    matriculas: IMatricula[];
    onEdit: (matricula: IMatricula) => void;
    onDelete: (id: string) => void;
    matriculaEmEdicao: IMatricula | null;
}

export const MatriculaTable = ({ matriculas, onEdit, onDelete, matriculaEmEdicao }: MatriculaTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr><th>USUÁRIO</th><th>CURSO</th><th>MATRÍCULA</th><th>CONCLUSÃO</th><th>AÇÕES</th></tr>
            </thead>
            <tbody>
                {matriculas.map((m) => {
                    const desabilitado = !!matriculaEmEdicao;
                    return (
                        <tr key={m.id}>
                            <td>{m.usuario?.nome}</td>
                            <td>{m.curso?.titulo}</td>
                            <td>{m.dataMatricula}</td>
                            <td>{m.dataConclusao || "-"}</td>
                            <td className="d-flex gap-2">
                                <Button variant="warning" value="Editar" onClick={() => onEdit(m)} disabled={desabilitado} />
                                <Button variant="danger" value="Excluir" onClick={() => onDelete(m.id || "")} disabled={desabilitado} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
