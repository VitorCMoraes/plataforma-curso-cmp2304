import { useEffect, useState } from "react";
import type { ITrilha } from "../../models/trilha.model";
import type { ICategoria } from "../../models/categoria.model";
import { trilhaService } from "../../services/trilha.service";
import { categoriaService } from "../../services/categoria.service";
import { TrilhaForm } from "./TrilhaForm";
import { TrilhaTable } from "./TrilhaTable";

export const TrilhaPage = () => {
    const [trilha, setTrilha] = useState<ITrilha | null>(null);
    const [listaTrilhas, setListaTrilhas] = useState<ITrilha[]>([]);
    const [categorias, setCategorias] = useState<ICategoria[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);

    const carregarDados = async () => {
        try {
            const [trilhas, cats] = await Promise.all([
                trilhaService.findAll(),
                categoriaService.findAll(),
            ]);
            setListaTrilhas(trilhas);
            setCategorias(cats);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    useEffect(() => { carregarDados(); }, []);

    const validarTrilha = (t: ITrilha): ITrilha | null => {
        const novosErros: Record<string, string> = {};
        if (!t.titulo || t.titulo.trim() === "") novosErros.titulo = "Título é obrigatório";
        if (!t.descricao || t.descricao.trim() === "") novosErros.descricao = "Descrição é obrigatória";
        if (!t.categoria?.id) novosErros.categoria = "Selecione uma categoria";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0 ? t : null;
    };

    const isEdicao = (t: ITrilha) => Boolean(t.id && t.id.trim() !== "");
    const limparFormulario = () => { setTrilha(null); setErrors({}); setKeyReiniciar((p) => p + 1); };

    const handleCreate = async (t: ITrilha) => {
        try { const nova = await trilhaService.create(t); setListaTrilhas((l) => [...l, nova]); limparFormulario(); }
        catch (error) { console.error("Erro ao criar trilha:", error); }
    };
    const handleUpdate = async (t: ITrilha) => {
        try { await trilhaService.update(t.id!, t); setListaTrilhas((l) => l.map((x) => (x.id === t.id ? t : x))); limparFormulario(); }
        catch (error) { console.error("Erro ao atualizar trilha:", error); }
    };
    const handleSave = (t: ITrilha) => {
        const v = validarTrilha(t);
        if (!v) return;
        if (isEdicao(v)) handleUpdate(v); else handleCreate(v);
    };
    const handleCancel = () => limparFormulario();
    const handleEdit = (t: ITrilha) => { setTrilha(t); setErrors({}); };
    const handleDelete = async (id: string) => {
        try { await trilhaService.delete(id); setListaTrilhas((l) => l.filter((x) => x.id !== id)); }
        catch (error) { console.error("Erro ao excluir trilha:", error); }
    };

    return (
        <>
            <div className="row m-4 border-bottom"><h4>Trilhas</h4></div>
            <div className="container row m-4">
                <div className="col-12 col-md-6">
                    <TrilhaForm
                        key={trilha ? trilha.id : `new-${keyReiniciar}`}
                        trilha={trilha}
                        categorias={categorias}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        errors={errors}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <hr />
                    <TrilhaTable trilhas={listaTrilhas} onEdit={handleEdit} onDelete={handleDelete} trilhaEmEdicao={trilha} />
                </div>
            </div>
        </>
    );
};
