import { Button } from "../../../components/Button";
import type { ITrilhaCurso } from "../../../models/trilha_curso.model";

interface TrilhaCursoTableProps {
    trilhasCursos: ITrilhaCurso[];
    onEdit: (trilhaCurso: ITrilhaCurso) => void;
    onDelete: (id: string) => void;
    trilhaCursoEmEdicao: ITrilhaCurso | null;
}

export const TrilhaCursoTable = ({ trilhasCursos, onEdit, onDelete, trilhaCursoEmEdicao }: TrilhaCursoTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr><th>TRILHA</th><th>CURSO</th><th>ORDEM</th><th>AÇÕES</th></tr>
            </thead>
            <tbody>
                {trilhasCursos.map((tc) => {
                    const desabilitado = !!trilhaCursoEmEdicao;
                    return (
                        <tr key={tc.id}>
                            <td>{tc.trilha?.titulo}</td>
                            <td>{tc.curso?.titulo}</td>
                            <td>{tc.ordem}</td>
                            <td className="d-flex gap-2">
                                <Button variant="warning" value="Editar" onClick={() => onEdit(tc)} disabled={desabilitado} />
                                <Button variant="danger" value="Excluir" onClick={() => onDelete(tc.id || "")} disabled={desabilitado} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
