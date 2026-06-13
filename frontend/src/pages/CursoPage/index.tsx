import { useEffect, useState } from "react";
import type { ICurso } from "../../models/curso.model";
import type { IUsuario } from "../../models/usuario.model";
import type { ICategoria } from "../../models/categoria.model";
import { cursoService } from "../../services/curso.service";
import { usuarioService } from "../../services/usuario.service";
import { categoriaService } from "../../services/categoria.service";
import { CursoForm } from "./CursoForm";
import { CursoTable } from "./CursoTable";

export const CursoPage = () => {
    const [curso, setCurso] = useState<ICurso | null>(null);
    const [listaCursos, setListaCursos] = useState<ICurso[]>([]);
    const [instrutores, setInstrutores] = useState<IUsuario[]>([]); // p/ o select
    const [categorias, setCategorias] = useState<ICategoria[]>([]); // p/ o select
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);

    const carregarDados = async () => {
        try {
            const [cursos, usuarios, cats] = await Promise.all([
                cursoService.findAll(),
                usuarioService.findAll(),
                categoriaService.findAll(),
            ]);
            setListaCursos(cursos);
            setInstrutores(usuarios);
            setCategorias(cats);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    useEffect(() => { carregarDados(); }, []);

    const validarCurso = (c: ICurso): ICurso | null => {
        const novosErros: Record<string, string> = {};
        if (!c.titulo || c.titulo.trim().length < 3) novosErros.titulo = "Título deve ter no mínimo 3 caracteres";
        if (!c.descricao || c.descricao.trim() === "") novosErros.descricao = "Descrição é obrigatória";
        if (!c.instrutor?.id) novosErros.instrutor = "Selecione um instrutor";
        if (!c.categoria?.id) novosErros.categoria = "Selecione uma categoria";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0 ? c : null;
    };

    const isEdicao = (c: ICurso) => Boolean(c.id && c.id.trim() !== "");
    const limparFormulario = () => { setCurso(null); setErrors({}); setKeyReiniciar((p) => p + 1); };

    const handleCreate = async (c: ICurso) => {
        try { const novo = await cursoService.create(c); setListaCursos((l) => [...l, novo]); limparFormulario(); }
        catch (error) { console.error("Erro ao criar curso:", error); }
    };
    const handleUpdate = async (c: ICurso) => {
        try { await cursoService.update(c.id!, c); setListaCursos((l) => l.map((x) => (x.id === c.id ? c : x))); limparFormulario(); }
        catch (error) { console.error("Erro ao atualizar curso:", error); }
    };
    const handleSave = (c: ICurso) => {
        const v = validarCurso(c);
        if (!v) return;
        if (isEdicao(v)) handleUpdate(v); else handleCreate(v);
    };
    const handleCancel = () => limparFormulario();
    const handleEdit = (c: ICurso) => { setCurso(c); setErrors({}); };
    const handleDelete = async (id: string) => {
        try { await cursoService.delete(id); setListaCursos((l) => l.filter((x) => x.id !== id)); }
        catch (error) { console.error("Erro ao excluir curso:", error); }
    };

    return (
        <>
            <div className="row m-4 border-bottom"><h4>Cursos</h4></div>
            <div className="container row m-4">
                <div className="col-12 col-md-6">
                    <CursoForm
                        key={curso ? curso.id : `new-${keyReiniciar}`}
                        curso={curso}
                        instrutores={instrutores}
                        categorias={categorias}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        errors={errors}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <hr />
                    <CursoTable cursos={listaCursos} onEdit={handleEdit} onDelete={handleDelete} cursoEmEdicao={curso} />
                </div>
            </div>
        </>
    );
};