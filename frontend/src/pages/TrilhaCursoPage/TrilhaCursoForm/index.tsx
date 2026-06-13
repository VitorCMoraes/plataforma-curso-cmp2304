import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import type { ITrilhaCurso } from "../../../models/trilha_curso.model";
import type { ITrilha } from "../../../models/trilha.model";
import type { ICurso } from "../../../models/curso.model";

interface TrilhaCursoFormProps {
    trilhaCurso: ITrilhaCurso | null;
    trilhas: ITrilha[];
    cursos: ICurso[];
    onSave: (trilhaCurso: ITrilhaCurso) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

const trilhaCursoVazio: ITrilhaCurso = {
    id: "", trilha: {} as ITrilha, curso: {} as ICurso, ordem: 0,
};

export const TrilhaCursoForm = ({ trilhaCurso = null, trilhas, cursos, onSave, onCancel, errors = {} }: TrilhaCursoFormProps) => {
    const [tcState, setTcState] = useState<ITrilhaCurso>(trilhaCurso || trilhaCursoVazio);

    const selecionarTrilha = (id: string) => {
        const trilha = trilhas.find((t) => t.id === id) || ({} as ITrilha);
        setTcState({ ...tcState, trilha });
    };
    const selecionarCurso = (id: string) => {
        const curso = cursos.find((c) => c.id === id) || ({} as ICurso);
        setTcState({ ...tcState, curso });
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <h5 className="card-title">Formulário de Trilha-Curso</h5>
                        <hr />
                        <Select label="Trilha" id="trilha"
                            value={tcState.trilha?.id || ""}
                            options={trilhas.map((t) => ({ value: t.id || "", label: t.titulo }))}
                            onChange={selecionarTrilha} error={errors.trilha} />
                        <Select label="Curso" id="curso"
                            value={tcState.curso?.id || ""}
                            options={cursos.map((c) => ({ value: c.id || "", label: c.titulo }))}
                            onChange={selecionarCurso} error={errors.curso} />
                        <Input label="Ordem" id="ordem" visible="true" type="number"
                            value={String(tcState.ordem)} onChange={(v) => setTcState({ ...tcState, ordem: Number(v) })} error={errors.ordem} />
                    </div>
                    <div className="card-footer">
                        <div className="row m-2">
                            <div className="col-6"><Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} /></div>
                            <div className="col-6">
                                <Button value={tcState.id ? "Atualizar" : "Salvar"} variant={tcState.id ? "warning" : "primary"} type="button" onClick={() => onSave(tcState)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
