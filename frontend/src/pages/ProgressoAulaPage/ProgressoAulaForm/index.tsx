import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import type { IProgressoAula } from "../../../models/progresso_aula.model";
import type { IUsuario } from "../../../models/usuario.model";
import type { IAula } from "../../../models/aula.model";

interface ProgressoAulaFormProps {
    progresso: IProgressoAula | null;
    usuarios: IUsuario[];
    aulas: IAula[];
    onSave: (progresso: IProgressoAula) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

const progressoVazio: IProgressoAula = {
    id: "", usuario: {} as IUsuario, aula: {} as IAula, status: "nao_iniciado", dataConclusao: "",
};

export const ProgressoAulaForm = ({ progresso = null, usuarios, aulas, onSave, onCancel, errors = {} }: ProgressoAulaFormProps) => {
    const [progressoState, setProgressoState] = useState<IProgressoAula>(progresso || progressoVazio);

    const selecionarUsuario = (id: string) => {
        const usuario = usuarios.find((u) => u.id === id) || ({} as IUsuario);
        setProgressoState({ ...progressoState, usuario });
    };
    const selecionarAula = (id: string) => {
        const aula = aulas.find((a) => a.id === id) || ({} as IAula);
        setProgressoState({ ...progressoState, aula });
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <h5 className="card-title">Formulário de Progresso de Aula</h5>
                        <hr />
                        <Select label="Usuário" id="usuario"
                            value={progressoState.usuario?.id || ""}
                            options={usuarios.map((u) => ({ value: u.id || "", label: u.nome }))}
                            onChange={selecionarUsuario} error={errors.usuario} />
                        <Select label="Aula" id="aula"
                            value={progressoState.aula?.id || ""}
                            options={aulas.map((a) => ({ value: a.id || "", label: a.titulo }))}
                            onChange={selecionarAula} error={errors.aula} />
                        <Select label="Status" id="status"
                            value={progressoState.status}
                            options={[
                                { value: "nao_iniciado", label: "Não Iniciado" },
                                { value: "em_progresso", label: "Em Progresso" },
                                { value: "concluido", label: "Concluído" },
                            ]}
                            onChange={(v) => setProgressoState({ ...progressoState, status: v as IProgressoAula["status"] })} />
                        <Input label="Data de Conclusão" id="dataConclusao" visible="true" type="date"
                            value={progressoState.dataConclusao || ""} onChange={(v) => setProgressoState({ ...progressoState, dataConclusao: v })} />
                    </div>
                    <div className="card-footer">
                        <div className="row m-2">
                            <div className="col-6"><Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} /></div>
                            <div className="col-6">
                                <Button value={progressoState.id ? "Atualizar" : "Salvar"} variant={progressoState.id ? "warning" : "primary"} type="button" onClick={() => onSave(progressoState)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
