import { Button } from "../../../components/Button";
import type { IProgressoAula } from "../../../models/progresso_aula.model";

interface ProgressoAulaTableProps {
    progressos: IProgressoAula[];
    onEdit: (progresso: IProgressoAula) => void;
    onDelete: (id: string) => void;
    progressoEmEdicao: IProgressoAula | null;
}

export const ProgressoAulaTable = ({ progressos, onEdit, onDelete, progressoEmEdicao }: ProgressoAulaTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr><th>USUÁRIO</th><th>AULA</th><th>STATUS</th><th>CONCLUSÃO</th><th>AÇÕES</th></tr>
            </thead>
            <tbody>
                {progressos.map((p) => {
                    const desabilitado = !!progressoEmEdicao;
                    return (
                        <tr key={p.id}>
                            <td>{p.usuario?.nome}</td>
                            <td>{p.aula?.titulo}</td>
                            <td>{p.status}</td>
                            <td>{p.dataConclusao || "-"}</td>
                            <td className="d-flex gap-2">
                                <Button variant="warning" value="Editar" onClick={() => onEdit(p)} disabled={desabilitado} />
                                <Button variant="danger" value="Excluir" onClick={() => onDelete(p.id || "")} disabled={desabilitado} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
