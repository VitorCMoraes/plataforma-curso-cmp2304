import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import type { IAula } from "../../../models/aula.model";

interface AulaFormProps {
    aula: IAula | null;
    onSave: (aula: IAula) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

const aulaVazia: IAula = {
    id: "", titulo: "", tipoConteudo: "video", urlConteudo: "", duracao: 0, ordem: 0,
};

export const AulaForm = ({ aula = null, onSave, onCancel, errors = {} }: AulaFormProps) => {
    const [aulaState, setAulaState] = useState<IAula>(aula || aulaVazia);

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <h5 className="card-title">Formulário de Aula</h5>
                        <hr />
                        <div className="container">
                            <Input
                                label="Título"
                                id="titulo"
                                visible="true"
                                type="text"
                                placeholder="Digite o título da aula..."
                                value={aulaState.titulo}
                                onChange={(value) => setAulaState({ ...aulaState, titulo: value })}
                                error={errors.titulo}
                            />
                            <Select
                                label="Tipo de Conteúdo"
                                id="tipoConteudo"
                                value={aulaState.tipoConteudo}
                                options={[
                                    { value: "video", label: "Vídeo" },
                                    { value: "texto", label: "Texto" },
                                    { value: "quiz", label: "Quiz" },
                                ]}
                                onChange={(value) => setAulaState({ ...aulaState, tipoConteudo: value as IAula["tipoConteudo"] })}
                                error={errors.tipoConteudo}
                            />
                            <Input
                                label="URL do Conteúdo"
                                id="urlConteudo"
                                visible="true"
                                type="text"
                                placeholder="Digite a URL do conteúdo..."
                                value={aulaState.urlConteudo}
                                onChange={(value) => setAulaState({ ...aulaState, urlConteudo: value })}
                                error={errors.urlConteudo}
                            />
                            <Input
                                label="Duração (min)"
                                id="duracao"
                                visible="true"
                                type="number"
                                value={String(aulaState.duracao)}
                                onChange={(value) => setAulaState({ ...aulaState, duracao: Number(value) })}
                                error={errors.duracao}
                            />
                            <Input
                                label="Ordem"
                                id="ordem"
                                visible="true"
                                type="number"
                                value={String(aulaState.ordem)}
                                onChange={(value) => setAulaState({ ...aulaState, ordem: Number(value) })}
                                error={errors.ordem}
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
                                    value={aulaState.id ? "Atualizar" : "Salvar"}
                                    variant={aulaState.id ? "warning" : "primary"}
                                    type="button"
                                    onClick={() => onSave(aulaState)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
