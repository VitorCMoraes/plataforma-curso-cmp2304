import { Button } from "../../../components/Button";
import type { IAula } from "../../../models/aula.model";

interface AulaTableProps {
    aulas: IAula[];
    onEdit: (aula: IAula) => void;
    onDelete: (id: string) => void;
    aulaEmEdicao: IAula | null;
}

export const AulaTable = ({ aulas, onEdit, onDelete, aulaEmEdicao }: AulaTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>TÍTULO</th>
                    <th>TIPO</th>
                    <th>DURAÇÃO (MIN)</th>
                    <th>ORDEM</th>
                    <th>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                {aulas.map((aula) => {
                    const desabilitado = !!aulaEmEdicao;
                    return (
                        <tr key={aula.id}>
                            <td>{aula.titulo}</td>
                            <td>{aula.tipoConteudo}</td>
                            <td>{aula.duracao}</td>
                            <td>{aula.ordem}</td>
                            <td className="d-flex gap-2">
                                <Button variant="warning" value="Editar" onClick={() => onEdit(aula)} disabled={desabilitado} />
                                <Button variant="danger" value="Excluir" onClick={() => onDelete(aula.id || "")} disabled={desabilitado} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
