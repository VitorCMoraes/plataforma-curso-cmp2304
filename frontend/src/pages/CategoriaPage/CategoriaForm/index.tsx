import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import type { ICategoria } from "../../../models/categoria.model";

interface CategoriaFormProps {
    categoria: ICategoria | null;
    onSave: (categoria: ICategoria) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

export const CategoriaForm = ({ categoria = null, onSave, onCancel, errors = {} }: CategoriaFormProps) => {
    // Estado LOCAL do formulário: o que o usuário está digitando agora
    const [categoriaState, setCategoriaState] = useState<ICategoria>(
        categoria || { id: "", nome: "", descricao: "" }
    );

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <h5 className="card-title">Formulário de Categoria</h5>
                        <hr />
                        <div className="container">
                            <Input
                                label="Nome"
                                id="nome"
                                visible="true"
                                type="text"
                                placeholder="Digite o nome da categoria..."
                                value={categoriaState.nome}
                                onChange={(value) => setCategoriaState({ ...categoriaState, nome: value })}
                                error={errors.nome}
                            />
                            <Input
                                label="Descrição"
                                id="descricao"
                                visible="true"
                                type="text"
                                placeholder="Digite uma descrição..."
                                value={categoriaState.descricao || ""}
                                onChange={(value) => setCategoriaState({ ...categoriaState, descricao: value })}
                                error={errors.descricao}
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="row m-2">
                            <div className="col-6">
                                <Button value="Cancelar" variant="secondary" type="button" onClick={() => onCancel()} />
                            </div>
                            <div className="col-6">
                                <Button
                                    value={categoriaState.id ? "Atualizar" : "Salvar"}
                                    variant={categoriaState.id ? "warning" : "primary"}
                                    type="button"
                                    onClick={() => onSave(categoriaState)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};