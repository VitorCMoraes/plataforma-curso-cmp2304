import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import type { ITrilha } from "../../../models/trilha.model";
import type { ICategoria } from "../../../models/categoria.model";

interface TrilhaFormProps {
    trilha: ITrilha | null;
    categorias: ICategoria[];
    onSave: (trilha: ITrilha) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

const trilhaVazia: ITrilha = {
    id: "", titulo: "", descricao: "", categoria: {} as ICategoria,
};

export const TrilhaForm = ({ trilha = null, categorias, onSave, onCancel, errors = {} }: TrilhaFormProps) => {
    const [trilhaState, setTrilhaState] = useState<ITrilha>(trilha || trilhaVazia);

    const selecionarCategoria = (id: string) => {
        const categoria = categorias.find((c) => c.id === id) || ({} as ICategoria);
        setTrilhaState({ ...trilhaState, categoria });
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <h5 className="card-title">Formulário de Trilha</h5>
                        <hr />
                        <Input label="Título" id="titulo" visible="true" type="text" placeholder="Título da trilha..."
                            value={trilhaState.titulo} onChange={(v) => setTrilhaState({ ...trilhaState, titulo: v })} error={errors.titulo} />
                        <Input label="Descrição" id="descricao" visible="true" type="text" placeholder="Descrição..."
                            value={trilhaState.descricao} onChange={(v) => setTrilhaState({ ...trilhaState, descricao: v })} error={errors.descricao} />
                        <Select label="Categoria" id="categoria"
                            value={trilhaState.categoria?.id || ""}
                            options={categorias.map((c) => ({ value: c.id || "", label: c.nome }))}
                            onChange={selecionarCategoria} error={errors.categoria} />
                    </div>
                    <div className="card-footer">
                        <div className="row m-2">
                            <div className="col-6"><Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} /></div>
                            <div className="col-6">
                                <Button value={trilhaState.id ? "Atualizar" : "Salvar"} variant={trilhaState.id ? "warning" : "primary"} type="button" onClick={() => onSave(trilhaState)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
