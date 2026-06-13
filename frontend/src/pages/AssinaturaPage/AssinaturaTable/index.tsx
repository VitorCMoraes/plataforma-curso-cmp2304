import { Button } from "../../../components/Button";
import type { IAssinatura } from "../../../models/assinatura.model";

interface AssinaturaTableProps {
    assinaturas: IAssinatura[];
    onEdit: (assinatura: IAssinatura) => void;
    onDelete: (id: string) => void;
    assinaturaEmEdicao: IAssinatura | null;
}

export const AssinaturaTable = ({ assinaturas, onEdit, onDelete, assinaturaEmEdicao }: AssinaturaTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr><th>USUÁRIO</th><th>PLANO</th><th>INÍCIO</th><th>FIM</th><th>AÇÕES</th></tr>
            </thead>
            <tbody>
                {assinaturas.map((a) => {
                    const desabilitado = !!assinaturaEmEdicao;
                    return (
                        <tr key={a.id}>
                            <td>{a.usuario?.nome}</td>
                            <td>{a.plano?.nome}</td>
                            <td>{a.dataInicio}</td>
                            <td>{a.dataFim}</td>
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
