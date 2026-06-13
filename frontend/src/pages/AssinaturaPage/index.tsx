import { useEffect, useState } from "react";
import type { IAssinatura } from "../../models/assinatura.model";
import type { IUsuario } from "../../models/usuario.model";
import type { IPlano } from "../../models/plano.model";
import { assinaturaService } from "../../services/assinatura.service";
import { usuarioService } from "../../services/usuario.service";
import { planoService } from "../../services/plano.service";
import { AssinaturaForm } from "./AssinaturaForm";
import { AssinaturaTable } from "./AssinaturaTable";

export const AssinaturaPage = () => {
    const [assinatura, setAssinatura] = useState<IAssinatura | null>(null);
    const [listaAssinaturas, setListaAssinaturas] = useState<IAssinatura[]>([]);
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [planos, setPlanos] = useState<IPlano[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);

    const carregarDados = async () => {
        try {
            const [assinaturas, users, ps] = await Promise.all([
                assinaturaService.findAll(),
                usuarioService.findAll(),
                planoService.findAll(),
            ]);
            setListaAssinaturas(assinaturas);
            setUsuarios(users);
            setPlanos(ps);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    useEffect(() => { carregarDados(); }, []);

    const validarAssinatura = (a: IAssinatura): IAssinatura | null => {
        const novosErros: Record<string, string> = {};
        if (!a.usuario?.id) novosErros.usuario = "Selecione um usuário";
        if (!a.plano?.id) novosErros.plano = "Selecione um plano";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0 ? a : null;
    };

    const isEdicao = (a: IAssinatura) => Boolean(a.id && a.id.trim() !== "");
    const limparFormulario = () => { setAssinatura(null); setErrors({}); setKeyReiniciar((k) => k + 1); };

    const handleCreate = async (a: IAssinatura) => {
        try { const nova = await assinaturaService.create(a); setListaAssinaturas((l) => [...l, nova]); limparFormulario(); }
        catch (error) { console.error("Erro ao criar assinatura:", error); }
    };
    const handleUpdate = async (a: IAssinatura) => {
        try { await assinaturaService.update(a.id!, a); setListaAssinaturas((l) => l.map((x) => (x.id === a.id ? a : x))); limparFormulario(); }
        catch (error) { console.error("Erro ao atualizar assinatura:", error); }
    };
    const handleSave = (a: IAssinatura) => {
        const v = validarAssinatura(a);
        if (!v) return;
        if (isEdicao(v)) handleUpdate(v); else handleCreate(v);
    };
    const handleCancel = () => limparFormulario();
    const handleEdit = (a: IAssinatura) => { setAssinatura(a); setErrors({}); };
    const handleDelete = async (id: string) => {
        try { await assinaturaService.delete(id); setListaAssinaturas((l) => l.filter((x) => x.id !== id)); }
        catch (error) { console.error("Erro ao excluir assinatura:", error); }
    };

    return (
        <>
            <div className="row m-4 border-bottom"><h4>Assinaturas</h4></div>
            <div className="container row m-4">
                <div className="col-12 col-md-6">
                    <AssinaturaForm
                        key={assinatura ? assinatura.id : `new-${keyReiniciar}`}
                        assinatura={assinatura}
                        usuarios={usuarios}
                        planos={planos}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        errors={errors}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <hr />
                    <AssinaturaTable assinaturas={listaAssinaturas} onEdit={handleEdit} onDelete={handleDelete} assinaturaEmEdicao={assinatura} />
                </div>
            </div>
        </>
    );
};
