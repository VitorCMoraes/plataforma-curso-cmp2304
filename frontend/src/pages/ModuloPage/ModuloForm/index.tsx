import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import type { IModulo } from "../../../models/modulo.model";

interface ModuloFormProps {
    modulo: IModulo | null;
    onSave: (modulo: IModulo) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

export const ModuloForm = ({ modulo = null, onSave, onCancel, errors = {} }: ModuloFormProps) => {
    const [moduloState, setModuloState] = useState<IModulo>(
        modulo || { id: "", titulo: "", ordem: 0, listaAulas: [] }
    );

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <h5 className="card-title">Formulário de Módulo</h5>
                        <hr />
                        <div className="container">
                            <Input
                                label="Título"
                                id="titulo"
                                visible="true"
                                type="text"
                                placeholder="Digite o título do módulo..."
                                value={moduloState.titulo}
                                onChange={(value) => setModuloState({ ...moduloState, titulo: value })}
                                error={errors.titulo}
                            />
                            <Input
                                label="Ordem"
                                id="ordem"
                                visible="true"
                                type="number"
                                value={String(moduloState.ordem)}
                                onChange={(value) => setModuloState({ ...moduloState, ordem: Number(value) })}
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
                                    value={moduloState.id ? "Atualizar" : "Salvar"}
                                    variant={moduloState.id ? "warning" : "primary"}
                                    type="button"
                                    onClick={() => onSave(moduloState)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
