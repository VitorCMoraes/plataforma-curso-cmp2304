import { useEffect, useState } from "react";
import type { IMatricula } from "../../models/matricula.model";
import type { IUsuario } from "../../models/usuario.model";
import type { ICurso } from "../../models/curso.model";
import { matriculaService } from "../../services/matricula.service";
import { usuarioService } from "../../services/usuario.service";
import { cursoService } from "../../services/curso.service";
import { MatriculaForm } from "./MatriculaForm";
import { MatriculaTable } from "./MatriculaTable";

export const MatriculaPage = () => {
    const [matricula, setMatricula] = useState<IMatricula | null>(null);
    const [listaMatriculas, setListaMatriculas] = useState<IMatricula[]>([]);
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);

    const carregarDados = async () => {
        try {
            const [matriculas, users, cs] = await Promise.all([
                matriculaService.findAll(),
                usuarioService.findAll(),
                cursoService.findAll(),
            ]);
            setListaMatriculas(matriculas);
            setUsuarios(users);
            setCursos(cs);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    useEffect(() => { carregarDados(); }, []);

    const validarMatricula = (m: IMatricula): IMatricula | null => {
        const novosErros: Record<string, string> = {};
        if (!m.usuario?.id) novosErros.usuario = "Selecione um usuário";
        if (!m.curso?.id) novosErros.curso = "Selecione um curso";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0 ? m : null;
    };

    const isEdicao = (m: IMatricula) => Boolean(m.id && m.id.trim() !== "");
    const limparFormulario = () => { setMatricula(null); setErrors({}); setKeyReiniciar((p) => p + 1); };

    const handleCreate = async (m: IMatricula) => {
        try { const nova = await matriculaService.create(m); setListaMatriculas((l) => [...l, nova]); limparFormulario(); }
        catch (error) { console.error("Erro ao criar matrícula:", error); }
    };
    const handleUpdate = async (m: IMatricula) => {
        try { await matriculaService.update(m.id!, m); setListaMatriculas((l) => l.map((x) => (x.id === m.id ? m : x))); limparFormulario(); }
        catch (error) { console.error("Erro ao atualizar matrícula:", error); }
    };
    const handleSave = (m: IMatricula) => {
        const v = validarMatricula(m);
        if (!v) return;
        if (isEdicao(v)) handleUpdate(v); else handleCreate(v);
    };
    const handleCancel = () => limparFormulario();
    const handleEdit = (m: IMatricula) => { setMatricula(m); setErrors({}); };
    const handleDelete = async (id: string) => {
        try { await matriculaService.delete(id); setListaMatriculas((l) => l.filter((x) => x.id !== id)); }
        catch (error) { console.error("Erro ao excluir matrícula:", error); }
    };

    return (
        <>
            <div className="row m-4 border-bottom"><h4>Matrículas</h4></div>
            <div className="container row m-4">
                <div className="col-12 col-md-6">
                    <MatriculaForm
                        key={matricula ? matricula.id : `new-${keyReiniciar}`}
                        matricula={matricula}
                        usuarios={usuarios}
                        cursos={cursos}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        errors={errors}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <hr />
                    <MatriculaTable matriculas={listaMatriculas} onEdit={handleEdit} onDelete={handleDelete} matriculaEmEdicao={matricula} />
                </div>
            </div>
        </>
    );
};
