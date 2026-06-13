import { Button } from "../../../components/Button";
import type { ICertificado } from "../../../models/certificado.model";

interface CertificadoTableProps {
    certificados: ICertificado[];
    onEdit: (certificado: ICertificado) => void;
    onDelete: (id: string) => void;
    certificadoEmEdicao: ICertificado | null;
}

export const CertificadoTable = ({ certificados, onEdit, onDelete, certificadoEmEdicao }: CertificadoTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr><th>USUÁRIO</th><th>CURSO</th><th>TRILHA</th><th>CÓDIGO</th><th>EMISSÃO</th><th>AÇÕES</th></tr>
            </thead>
            <tbody>
                {certificados.map((c) => {
                    const desabilitado = !!certificadoEmEdicao;
                    return (
                        <tr key={c.id}>
                            <td>{c.usuario?.nome}</td>
                            <td>{c.curso?.titulo}</td>
                            <td>{c.trilha?.titulo || "-"}</td>
                            <td>{c.codigoVerificacao}</td>
                            <td>{c.dataEmissao}</td>
                            <td className="d-flex gap-2">
                                <Button variant="warning" value="Editar" onClick={() => onEdit(c)} disabled={desabilitado} />
                                <Button variant="danger" value="Excluir" onClick={() => onDelete(c.id || "")} disabled={desabilitado} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
