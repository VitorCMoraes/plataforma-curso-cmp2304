import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import type { IPlano } from "../../../models/plano.model";

interface PlanoFormProps {
    plano: IPlano | null;
    onSave: (plano: IPlano) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

export const PlanoForm = ({ plano = null, onSave, onCancel, errors = {} }: PlanoFormProps) => {
    const [planoState, setPlanoState] = useState<IPlano>(
        plano || { id: "", nome: "", descricao: "", preco: 0, duracaoMeses: 0 }
    );

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <h5 className="card-title">Formulário de Plano</h5>
                        <hr />
                        <div className="container">
                            <Input
                                label="Nome"
                                id="nome"
                                visible="true"
                                type="text"
                                placeholder="Digite o nome do plano..."
                                value={planoState.nome}
                                onChange={(value) => setPlanoState({ ...planoState, nome: value })}
                                error={errors.nome}
                            />
                            <Input
                                label="Descrição"
                                id="descricao"
                                visible="true"
                                type="text"
                                placeholder="Digite uma descrição..."
                                value={planoState.descricao || ""}
                                onChange={(value) => setPlanoState({ ...planoState, descricao: value })}
                                error={errors.descricao}
                            />
                            <Input
                                label="Preço"
                                id="preco"
                                visible="true"
                                type="number"
                                value={String(planoState.preco)}
                                onChange={(value) => setPlanoState({ ...planoState, preco: Number(value) })}
                                error={errors.preco}
                            />
                            <Input
                                label="Duração (meses)"
                                id="duracaoMeses"
                                visible="true"
                                type="number"
                                value={String(planoState.duracaoMeses)}
                                onChange={(value) => setPlanoState({ ...planoState, duracaoMeses: Number(value) })}
                                error={errors.duracaoMeses}
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
                                    value={planoState.id ? "Atualizar" : "Salvar"}
                                    variant={planoState.id ? "warning" : "primary"}
                                    type="button"
                                    onClick={() => onSave(planoState)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
