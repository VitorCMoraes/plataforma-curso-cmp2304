import { Button } from "../../../components/Button";
import type { IModulo } from "../../../models/modulo.model";

interface ModuloTableProps {
    modulos: IModulo[];
    onEdit: (modulo: IModulo) => void;
    onDelete: (id: string) => void;
    moduloEmEdicao: IModulo | null;
}

export const ModuloTable = ({ modulos, onEdit, onDelete, moduloEmEdicao }: ModuloTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>TÍTULO</th>
                    <th>ORDEM</th>
                    <th>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                {modulos.map((modulo) => {
                    const desabilitado = !!moduloEmEdicao;
                    return (
                        <tr key={modulo.id}>
                            <td>{modulo.titulo}</td>
                            <td>{modulo.ordem}</td>
                            <td className="d-flex gap-2">
                                <Button variant="warning" value="Editar" onClick={() => onEdit(modulo)} disabled={desabilitado} />
                                <Button variant="danger" value="Excluir" onClick={() => onDelete(modulo.id || "")} disabled={desabilitado} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
