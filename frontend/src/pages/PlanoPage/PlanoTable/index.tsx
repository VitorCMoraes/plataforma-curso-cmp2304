import { Button } from "../../../components/Button";
import type { IPlano } from "../../../models/plano.model";

interface PlanoTableProps {
    planos: IPlano[];
    onEdit: (plano: IPlano) => void;
    onDelete: (id: string) => void;
    planoEmEdicao: IPlano | null;
}

export const PlanoTable = ({ planos, onEdit, onDelete, planoEmEdicao }: PlanoTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>NOME</th>
                    <th>PREÇO</th>
                    <th>DURAÇÃO (MESES)</th>
                    <th>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                {planos.map((plano) => {
                    const desabilitado = !!planoEmEdicao;
                    return (
                        <tr key={plano.id}>
                            <td>{plano.nome}</td>
                            <td>{plano.preco}</td>
                            <td>{plano.duracaoMeses}</td>
                            <td className="d-flex gap-2">
                                <Button variant="warning" value="Editar" onClick={() => onEdit(plano)} disabled={desabilitado} />
                                <Button variant="danger" value="Excluir" onClick={() => onDelete(plano.id || "")} disabled={desabilitado} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
