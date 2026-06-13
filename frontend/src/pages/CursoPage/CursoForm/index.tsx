import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import type { ICurso } from "../../../models/curso.model";
import type { IUsuario } from "../../../models/usuario.model";
import type { ICategoria } from "../../../models/categoria.model";

interface CursoFormProps {
    curso: ICurso | null;
    instrutores: IUsuario[];
    categorias: ICategoria[];
    onSave: (curso: ICurso) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

const cursoVazio: ICurso = {
    id: "", titulo: "", descricao: "", nivel: "iniciante",
    dataPublicacao: "", totalAulas: 0, totalHoras: 0,
    instrutor: {} as IUsuario, categoria: {} as ICategoria, listaModulos: [],
};

export const CursoForm = ({ curso = null, instrutores, categorias, onSave, onCancel, errors = {} }: CursoFormProps) => {
    const [cursoState, setCursoState] = useState<ICurso>(curso || cursoVazio);

    const selecionarInstrutor = (id: string) => {
        const instrutor = instrutores.find((u) => u.id === id) || ({} as IUsuario);
        setCursoState({ ...cursoState, instrutor });
    };
    const selecionarCategoria = (id: string) => {
        const categoria = categorias.find((c) => c.id === id) || ({} as ICategoria);
        setCursoState({ ...cursoState, categoria });
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <h5 className="card-title">Formulário de Curso</h5>
                        <hr />
                        <Input label="Título" id="titulo" visible="true" type="text" placeholder="Título do curso..."
                            value={cursoState.titulo} onChange={(v) => setCursoState({ ...cursoState, titulo: v })} error={errors.titulo} />
                        <Input label="Descrição" id="descricao" visible="true" type="text" placeholder="Descrição..."
                            value={cursoState.descricao} onChange={(v) => setCursoState({ ...cursoState, descricao: v })} error={errors.descricao} />
                        <Select label="Instrutor" id="instrutor"
                            value={cursoState.instrutor?.id || ""}
                            options={instrutores.map((u) => ({ value: u.id || "", label: u.nome }))}
                            onChange={selecionarInstrutor} error={errors.instrutor} />
                        <Select label="Categoria" id="categoria"
                            value={cursoState.categoria?.id || ""}
                            options={categorias.map((c) => ({ value: c.id || "", label: c.nome }))}
                            onChange={selecionarCategoria} error={errors.categoria} />
                        <Select label="Nível" id="nivel"
                            value={cursoState.nivel}
                            options={[
                                { value: "iniciante", label: "Iniciante" },
                                { value: "intermediario", label: "Intermediário" },
                                { value: "avancado", label: "Avançado" },
                            ]}
                            onChange={(v) => setCursoState({ ...cursoState, nivel: v as ICurso["nivel"] })} />
                        <Input label="Data de Publicação" id="dataPublicacao" visible="true" type="date"
                            value={cursoState.dataPublicacao} onChange={(v) => setCursoState({ ...cursoState, dataPublicacao: v })} />
                        <Input label="Total de Aulas" id="totalAulas" visible="true" type="number"
                            value={String(cursoState.totalAulas)} onChange={(v) => setCursoState({ ...cursoState, totalAulas: Number(v) })} />
                        <Input label="Total de Horas" id="totalHoras" visible="true" type="number"
                            value={String(cursoState.totalHoras)} onChange={(v) => setCursoState({ ...cursoState, totalHoras: Number(v) })} />
                    </div>
                    <div className="card-footer">
                        <div className="row m-2">
                            <div className="col-6"><Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} /></div>
                            <div className="col-6">
                                <Button value={cursoState.id ? "Atualizar" : "Salvar"} variant={cursoState.id ? "warning" : "primary"} type="button" onClick={() => onSave(cursoState)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};