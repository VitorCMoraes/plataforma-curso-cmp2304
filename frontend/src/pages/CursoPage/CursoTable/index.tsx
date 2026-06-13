import { Button } from "../../../components/Button";
import type { ICurso } from "../../../models/curso.model";

interface CursoTableProps {
    cursos: ICurso[];
    onEdit: (curso: ICurso) => void;
    onDelete: (id: string) => void;
    cursoEmEdicao: ICurso | null;
}

export const CursoTable = ({ cursos, onEdit, onDelete, cursoEmEdicao }: CursoTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr><th>TÍTULO</th><th>NÍVEL</th><th>INSTRUTOR</th><th>CATEGORIA</th><th>AÇÕES</th></tr>
            </thead>
            <tbody>
                {cursos.map((curso) => {
                    const desabilitado = !!cursoEmEdicao;
                    return (
                        <tr key={curso.id}>
                            <td>{curso.titulo}</td>
                            <td>{curso.nivel}</td>
                            <td>{curso.instrutor?.nome}</td>
                            <td>{curso.categoria?.nome}</td>
                            <td className="d-flex gap-2">
                                <Button variant="warning" value="Editar" onClick={() => onEdit(curso)} disabled={desabilitado} />
                                <Button variant="danger" value="Excluir" onClick={() => onDelete(curso.id || "")} disabled={desabilitado} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};