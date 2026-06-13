import { Button } from "../../../components/Button";
import type { ICategoria } from "../../../models/categoria.model";

interface CategoriaTableProps {
    categorias: ICategoria[];
    onEdit: (categoria: ICategoria) => void;
    onDelete: (id: string) => void;
    categoriaEmEdicao: ICategoria | null;
}

export const CategoriaTable = ({ categorias, onEdit, onDelete, categoriaEmEdicao }: CategoriaTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>DESCRIÇÃO</th>
                    <th>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                {categorias.map((categoria) => {
                    const desabilitado = !!categoriaEmEdicao;
                    return (
                        <tr key={categoria.id}>
                            <td>{categoria.id}</td>
                            <td>{categoria.nome}</td>
                            <td>{categoria.descricao}</td>
                            <td className="d-flex gap-2">
                                <Button variant="warning" value="Editar" onClick={() => onEdit(categoria)} disabled={desabilitado} />
                                <Button variant="danger" value="Excluir" onClick={() => onDelete(categoria.id || "")} disabled={desabilitado} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};