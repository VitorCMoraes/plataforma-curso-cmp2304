import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import type { IAvaliacao } from "../../../models/avaliacao.model";
import type { IUsuario } from "../../../models/usuario.model";
import type { ICurso } from "../../../models/curso.model";

interface AvaliacaoFormProps {
    avaliacao: IAvaliacao | null;
    usuarios: IUsuario[];
    cursos: ICurso[];
    onSave: (avaliacao: IAvaliacao) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

const avaliacaoVazia: IAvaliacao = {
    id: "", usuario: {} as IUsuario, curso: {} as ICurso, nota: 1, comentario: "", dataAvaliacao: "",
};

export const AvaliacaoForm = ({ avaliacao = null, usuarios, cursos, onSave, onCancel, errors = {} }: AvaliacaoFormProps) => {
    const [avaliacaoState, setAvaliacaoState] = useState<IAvaliacao>(avaliacao || avaliacaoVazia);

    const selecionarUsuario = (id: string) => {
        const usuario = usuarios.find((u) => u.id === id) || ({} as IUsuario);
        setAvaliacaoState({ ...avaliacaoState, usuario });
    };
    const selecionarCurso = (id: string) => {
        const curso = cursos.find((c) => c.id === id) || ({} as ICurso);
        setAvaliacaoState({ ...avaliacaoState, curso });
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <h5 className="card-title">Formulário de Avaliação</h5>
                        <hr />
                        <Select label="Usuário" id="usuario"
                            value={avaliacaoState.usuario?.id || ""}
                            options={usuarios.map((u) => ({ value: u.id || "", label: u.nome }))}
                            onChange={selecionarUsuario} error={errors.usuario} />
                        <Select label="Curso" id="curso"
                            value={avaliacaoState.curso?.id || ""}
                            options={cursos.map((c) => ({ value: c.id || "", label: c.titulo }))}
                            onChange={selecionarCurso} error={errors.curso} />
                        <Select label="Nota" id="nota"
                            value={String(avaliacaoState.nota)}
                            options={[
                                { value: "1", label: "1" },
                                { value: "2", label: "2" },
                                { value: "3", label: "3" },
                                { value: "4", label: "4" },
                                { value: "5", label: "5" },
                            ]}
                            onChange={(v) => setAvaliacaoState({ ...avaliacaoState, nota: (Number(v) || 1) as IAvaliacao["nota"] })}
                            error={errors.nota} />
                        <Input label="Comentário" id="comentario" visible="true" type="text" placeholder="Comentário opcional..."
                            value={avaliacaoState.comentario || ""} onChange={(v) => setAvaliacaoState({ ...avaliacaoState, comentario: v })} />
                        <Input label="Data da Avaliação" id="dataAvaliacao" visible="true" type="date"
                            value={avaliacaoState.dataAvaliacao} onChange={(v) => setAvaliacaoState({ ...avaliacaoState, dataAvaliacao: v })} />
                    </div>
                    <div className="card-footer">
                        <div className="row m-2">
                            <div className="col-6"><Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} /></div>
                            <div className="col-6">
                                <Button value={avaliacaoState.id ? "Atualizar" : "Salvar"} variant={avaliacaoState.id ? "warning" : "primary"} type="button" onClick={() => onSave(avaliacaoState)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
