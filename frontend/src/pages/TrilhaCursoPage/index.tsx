import { useEffect, useState } from "react";
import type { ITrilhaCurso } from "../../models/trilha_curso.model";
import type { ITrilha } from "../../models/trilha.model";
import type { ICurso } from "../../models/curso.model";
import { trilhaCursoService } from "../../services/trilha_curso.service";
import { trilhaService } from "../../services/trilha.service";
import { cursoService } from "../../services/curso.service";
import { TrilhaCursoForm } from "./TrilhaCursoForm";
import { TrilhaCursoTable } from "./TrilhaCursoTable";

export const TrilhaCursoPage = () => {
    const [trilhaCurso, setTrilhaCurso] = useState<ITrilhaCurso | null>(null);
    const [listaTrilhasCursos, setListaTrilhasCursos] = useState<ITrilhaCurso[]>([]);
    const [trilhas, setTrilhas] = useState<ITrilha[]>([]);
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);

    const carregarDados = async () => {
        try {
            const [tcs, ts, cs] = await Promise.all([
                trilhaCursoService.findAll(),
                trilhaService.findAll(),
                cursoService.findAll(),
            ]);
            setListaTrilhasCursos(tcs);
            setTrilhas(ts);
            setCursos(cs);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    useEffect(() => { carregarDados(); }, []);

    const validarTrilhaCurso = (tc: ITrilhaCurso): ITrilhaCurso | null => {
        const novosErros: Record<string, string> = {};
        if (!tc.trilha?.id) novosErros.trilha = "Selecione uma trilha";
        if (!tc.curso?.id) novosErros.curso = "Selecione um curso";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0 ? tc : null;
    };

    const isEdicao = (tc: ITrilhaCurso) => Boolean(tc.id && tc.id.trim() !== "");
    const limparFormulario = () => { setTrilhaCurso(null); setErrors({}); setKeyReiniciar((k) => k + 1); };

    const handleCreate = async (tc: ITrilhaCurso) => {
        try { const novo = await trilhaCursoService.create(tc); setListaTrilhasCursos((l) => [...l, novo]); limparFormulario(); }
        catch (error) { console.error("Erro ao criar trilha-curso:", error); }
    };
    const handleUpdate = async (tc: ITrilhaCurso) => {
        try { await trilhaCursoService.update(tc.id!, tc); setListaTrilhasCursos((l) => l.map((x) => (x.id === tc.id ? tc : x))); limparFormulario(); }
        catch (error) { console.error("Erro ao atualizar trilha-curso:", error); }
    };
    const handleSave = (tc: ITrilhaCurso) => {
        const v = validarTrilhaCurso(tc);
        if (!v) return;
        if (isEdicao(v)) handleUpdate(v); else handleCreate(v);
    };
    const handleCancel = () => limparFormulario();
    const handleEdit = (tc: ITrilhaCurso) => { setTrilhaCurso(tc); setErrors({}); };
    const handleDelete = async (id: string) => {
        try { await trilhaCursoService.delete(id); setListaTrilhasCursos((l) => l.filter((x) => x.id !== id)); }
        catch (error) { console.error("Erro ao excluir trilha-curso:", error); }
    };

    return (
        <>
            <div className="row m-4 border-bottom"><h4>Trilhas-Cursos</h4></div>
            <div className="container row m-4">
                <div className="col-12 col-md-6">
                    <TrilhaCursoForm
                        key={trilhaCurso ? trilhaCurso.id : `new-${keyReiniciar}`}
                        trilhaCurso={trilhaCurso}
                        trilhas={trilhas}
                        cursos={cursos}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        errors={errors}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <hr />
                    <TrilhaCursoTable trilhasCursos={listaTrilhasCursos} onEdit={handleEdit} onDelete={handleDelete} trilhaCursoEmEdicao={trilhaCurso} />
                </div>
            </div>
        </>
    );
};
