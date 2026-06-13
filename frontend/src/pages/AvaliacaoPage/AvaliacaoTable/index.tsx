import { Button } from "../../../components/Button";
import type { IAvaliacao } from "../../../models/avaliacao.model";

interface AvaliacaoTableProps {
    avaliacoes: IAvaliacao[];
    onEdit: (avaliacao: IAvaliacao) => void;
    onDelete: (id: string) => void;
    avaliacaoEmEdicao: IAvaliacao | null;
}

export const AvaliacaoTable = ({ avaliacoes, onEdit, onDelete, avaliacaoEmEdicao }: AvaliacaoTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr><th>USUÁRIO</th><th>CURSO</th><th>NOTA</th><th>DATA</th><th>AÇÕES</th></tr>
            </thead>
            <tbody>
                {avaliacoes.map((a) => {
                    const desabilitado = !!avaliacaoEmEdicao;
                    return (
                        <tr key={a.id}>
                            <td>{a.usuario?.nome}</td>
                            <td>{a.curso?.titulo}</td>
                            <td>{a.nota}</td>
                            <td>{a.dataAvaliacao}</td>
                            <td className="d-flex gap-2">
                                <Button variant="warning" value="Editar" onClick={() => onEdit(a)} disabled={desabilitado} />
                                <Button variant="danger" value="Excluir" onClick={() => onDelete(a.id || "")} disabled={desabilitado} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
