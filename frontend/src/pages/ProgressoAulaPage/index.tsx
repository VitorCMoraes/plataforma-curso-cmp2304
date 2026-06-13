import { useEffect, useState } from "react";
import type { IProgressoAula } from "../../models/progresso_aula.model";
import type { IUsuario } from "../../models/usuario.model";
import type { IAula } from "../../models/aula.model";
import { progressoAulaService } from "../../services/progresso_aula.service";
import { usuarioService } from "../../services/usuario.service";
import { aulaService } from "../../services/aula.service";
import { ProgressoAulaForm } from "./ProgressoAulaForm";
import { ProgressoAulaTable } from "./ProgressoAulaTable";

export const ProgressoAulaPage = () => {
    const [progresso, setProgresso] = useState<IProgressoAula | null>(null);
    const [listaProgressos, setListaProgressos] = useState<IProgressoAula[]>([]);
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [aulas, setAulas] = useState<IAula[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);

    const carregarDados = async () => {
        try {
            const [progressos, users, as] = await Promise.all([
                progressoAulaService.findAll(),
                usuarioService.findAll(),
                aulaService.findAll(),
            ]);
            setListaProgressos(progressos);
            setUsuarios(users);
            setAulas(as);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    useEffect(() => { carregarDados(); }, []);

    const validarProgresso = (p: IProgressoAula): IProgressoAula | null => {
        const novosErros: Record<string, string> = {};
        if (!p.usuario?.id) novosErros.usuario = "Selecione um usuário";
        if (!p.aula?.id) novosErros.aula = "Selecione uma aula";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0 ? p : null;
    };

    const isEdicao = (p: IProgressoAula) => Boolean(p.id && p.id.trim() !== "");
    const limparFormulario = () => { setProgresso(null); setErrors({}); setKeyReiniciar((k) => k + 1); };

    const handleCreate = async (p: IProgressoAula) => {
        try { const novo = await progressoAulaService.create(p); setListaProgressos((l) => [...l, novo]); limparFormulario(); }
        catch (error) { console.error("Erro ao criar progresso:", error); }
    };
    const handleUpdate = async (p: IProgressoAula) => {
        try { await progressoAulaService.update(p.id!, p); setListaProgressos((l) => l.map((x) => (x.id === p.id ? p : x))); limparFormulario(); }
        catch (error) { console.error("Erro ao atualizar progresso:", error); }
    };
    const handleSave = (p: IProgressoAula) => {
        const v = validarProgresso(p);
        if (!v) return;
        if (isEdicao(v)) handleUpdate(v); else handleCreate(v);
    };
    const handleCancel = () => limparFormulario();
    const handleEdit = (p: IProgressoAula) => { setProgresso(p); setErrors({}); };
    const handleDelete = async (id: string) => {
        try { await progressoAulaService.delete(id); setListaProgressos((l) => l.filter((x) => x.id !== id)); }
        catch (error) { console.error("Erro ao excluir progresso:", error); }
    };

    return (
        <>
            <div className="row m-4 border-bottom"><h4>Progresso de Aulas</h4></div>
            <div className="container row m-4">
                <div className="col-12 col-md-6">
                    <ProgressoAulaForm
                        key={progresso ? progresso.id : `new-${keyReiniciar}`}
                        progresso={progresso}
                        usuarios={usuarios}
                        aulas={aulas}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        errors={errors}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <hr />
                    <ProgressoAulaTable progressos={listaProgressos} onEdit={handleEdit} onDelete={handleDelete} progressoEmEdicao={progresso} />
                </div>
            </div>
        </>
    );
};
