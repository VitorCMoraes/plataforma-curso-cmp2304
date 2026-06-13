import { useEffect, useState } from "react";
import type { IAvaliacao } from "../../models/avaliacao.model";
import type { IUsuario } from "../../models/usuario.model";
import type { ICurso } from "../../models/curso.model";
import { avaliacaoService } from "../../services/avaliacao.service";
import { usuarioService } from "../../services/usuario.service";
import { cursoService } from "../../services/curso.service";
import { AvaliacaoForm } from "./AvaliacaoForm";
import { AvaliacaoTable } from "./AvaliacaoTable";

export const AvaliacaoPage = () => {
    const [avaliacao, setAvaliacao] = useState<IAvaliacao | null>(null);
    const [listaAvaliacoes, setListaAvaliacoes] = useState<IAvaliacao[]>([]);
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);

    const carregarDados = async () => {
        try {
            const [avaliacoes, users, cs] = await Promise.all([
                avaliacaoService.findAll(),
                usuarioService.findAll(),
                cursoService.findAll(),
            ]);
            setListaAvaliacoes(avaliacoes);
            setUsuarios(users);
            setCursos(cs);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    useEffect(() => { carregarDados(); }, []);

    const validarAvaliacao = (a: IAvaliacao): IAvaliacao | null => {
        const novosErros: Record<string, string> = {};
        if (!a.usuario?.id) novosErros.usuario = "Selecione um usuário";
        if (!a.curso?.id) novosErros.curso = "Selecione um curso";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0 ? a : null;
    };

    const isEdicao = (a: IAvaliacao) => Boolean(a.id && a.id.trim() !== "");
    const limparFormulario = () => { setAvaliacao(null); setErrors({}); setKeyReiniciar((p) => p + 1); };

    const handleCreate = async (a: IAvaliacao) => {
        try { const nova = await avaliacaoService.create(a); setListaAvaliacoes((l) => [...l, nova]); limparFormulario(); }
        catch (error) { console.error("Erro ao criar avaliação:", error); }
    };
    const handleUpdate = async (a: IAvaliacao) => {
        try { await avaliacaoService.update(a.id!, a); setListaAvaliacoes((l) => l.map((x) => (x.id === a.id ? a : x))); limparFormulario(); }
        catch (error) { console.error("Erro ao atualizar avaliação:", error); }
    };
    const handleSave = (a: IAvaliacao) => {
        const v = validarAvaliacao(a);
        if (!v) return;
        if (isEdicao(v)) handleUpdate(v); else handleCreate(v);
    };
    const handleCancel = () => limparFormulario();
    const handleEdit = (a: IAvaliacao) => { setAvaliacao(a); setErrors({}); };
    const handleDelete = async (id: string) => {
        try { await avaliacaoService.delete(id); setListaAvaliacoes((l) => l.filter((x) => x.id !== id)); }
        catch (error) { console.error("Erro ao excluir avaliação:", error); }
    };

    return (
        <>
            <div className="row m-4 border-bottom"><h4>Avaliações</h4></div>
            <div className="container row m-4">
                <div className="col-12 col-md-6">
                    <AvaliacaoForm
                        key={avaliacao ? avaliacao.id : `new-${keyReiniciar}`}
                        avaliacao={avaliacao}
                        usuarios={usuarios}
                        cursos={cursos}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        errors={errors}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <hr />
                    <AvaliacaoTable avaliacoes={listaAvaliacoes} onEdit={handleEdit} onDelete={handleDelete} avaliacaoEmEdicao={avaliacao} />
                </div>
            </div>
        </>
    );
};
