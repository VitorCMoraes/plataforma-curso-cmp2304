import { Button } from "../../../components/Button";
import type { IPagamento } from "../../../models/pagamento.model";

interface PagamentoTableProps {
    pagamentos: IPagamento[];
    onEdit: (pagamento: IPagamento) => void;
    onDelete: (id: string) => void;
    pagamentoEmEdicao: IPagamento | null;
}

export const PagamentoTable = ({ pagamentos, onEdit, onDelete, pagamentoEmEdicao }: PagamentoTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr><th>ASSINATURA</th><th>VALOR</th><th>DATA</th><th>MÉTODO</th><th>AÇÕES</th></tr>
            </thead>
            <tbody>
                {pagamentos.map((p) => {
                    const desabilitado = !!pagamentoEmEdicao;
                    return (
                        <tr key={p.id}>
                            <td>{`${p.assinatura?.usuario?.nome || ""} / ${p.assinatura?.plano?.nome || ""}`}</td>
                            <td>{p.valorPago}</td>
                            <td>{p.dataPagamento}</td>
                            <td>{p.metodoPagamento}</td>
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
