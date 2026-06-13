import { Button } from "../../../components/Button";
import type { ITrilha } from "../../../models/trilha.model";

interface TrilhaTableProps {
    trilhas: ITrilha[];
    onEdit: (trilha: ITrilha) => void;
    onDelete: (id: string) => void;
    trilhaEmEdicao: ITrilha | null;
}

export const TrilhaTable = ({ trilhas, onEdit, onDelete, trilhaEmEdicao }: TrilhaTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr><th>TÍTULO</th><th>DESCRIÇÃO</th><th>CATEGORIA</th><th>AÇÕES</th></tr>
            </thead>
            <tbody>
                {trilhas.map((trilha) => {
                    const desabilitado = !!trilhaEmEdicao;
                    return (
                        <tr key={trilha.id}>
                            <td>{trilha.titulo}</td>
                            <td>{trilha.descricao}</td>
                            <td>{trilha.categoria?.nome}</td>
                            <td className="d-flex gap-2">
                                <Button variant="warning" value="Editar" onClick={() => onEdit(trilha)} disabled={desabilitado} />
                                <Button variant="danger" value="Excluir" onClick={() => onDelete(trilha.id || "")} disabled={desabilitado} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
