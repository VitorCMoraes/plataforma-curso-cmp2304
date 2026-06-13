import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import type { IMatricula } from "../../../models/matricula.model";
import type { IUsuario } from "../../../models/usuario.model";
import type { ICurso } from "../../../models/curso.model";

interface MatriculaFormProps {
    matricula: IMatricula | null;
    usuarios: IUsuario[];
    cursos: ICurso[];
    onSave: (matricula: IMatricula) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

const matriculaVazia: IMatricula = {
    id: "", usuario: {} as IUsuario, curso: {} as ICurso, dataMatricula: "", dataConclusao: "",
};

export const MatriculaForm = ({ matricula = null, usuarios, cursos, onSave, onCancel, errors = {} }: MatriculaFormProps) => {
    const [matriculaState, setMatriculaState] = useState<IMatricula>(matricula || matriculaVazia);

    const selecionarUsuario = (id: string) => {
        const usuario = usuarios.find((u) => u.id === id) || ({} as IUsuario);
        setMatriculaState({ ...matriculaState, usuario });
    };
    const selecionarCurso = (id: string) => {
        const curso = cursos.find((c) => c.id === id) || ({} as ICurso);
        setMatriculaState({ ...matriculaState, curso });
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <h5 className="card-title">Formulário de Matrícula</h5>
                        <hr />
                        <Select label="Usuário" id="usuario"
                            value={matriculaState.usuario?.id || ""}
                            options={usuarios.map((u) => ({ value: u.id || "", label: u.nome }))}
                            onChange={selecionarUsuario} error={errors.usuario} />
                        <Select label="Curso" id="curso"
                            value={matriculaState.curso?.id || ""}
                            options={cursos.map((c) => ({ value: c.id || "", label: c.titulo }))}
                            onChange={selecionarCurso} error={errors.curso} />
                        <Input label="Data de Matrícula" id="dataMatricula" visible="true" type="date"
                            value={matriculaState.dataMatricula} onChange={(v) => setMatriculaState({ ...matriculaState, dataMatricula: v })} />
                        <Input label="Data de Conclusão" id="dataConclusao" visible="true" type="date"
                            value={matriculaState.dataConclusao || ""} onChange={(v) => setMatriculaState({ ...matriculaState, dataConclusao: v })} />
                    </div>
                    <div className="card-footer">
                        <div className="row m-2">
                            <div className="col-6"><Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} /></div>
                            <div className="col-6">
                                <Button value={matriculaState.id ? "Atualizar" : "Salvar"} variant={matriculaState.id ? "warning" : "primary"} type="button" onClick={() => onSave(matriculaState)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
