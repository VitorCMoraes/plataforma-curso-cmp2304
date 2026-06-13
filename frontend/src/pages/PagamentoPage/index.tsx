import { useEffect, useState } from "react";
import type { IPagamento } from "../../models/pagamento.model";
import type { IAssinatura } from "../../models/assinatura.model";
import { pagamentoService } from "../../services/pagamento.service";
import { assinaturaService } from "../../services/assinatura.service";
import { PagamentoForm } from "./PagamentoForm";
import { PagamentoTable } from "./PagamentoTable";

export const PagamentoPage = () => {
    const [pagamento, setPagamento] = useState<IPagamento | null>(null);
    const [listaPagamentos, setListaPagamentos] = useState<IPagamento[]>([]);
    const [assinaturas, setAssinaturas] = useState<IAssinatura[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);

    const carregarDados = async () => {
        try {
            const [pagamentos, asss] = await Promise.all([
                pagamentoService.findAll(),
                assinaturaService.findAll(),
            ]);
            setListaPagamentos(pagamentos);
            setAssinaturas(asss);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    useEffect(() => { carregarDados(); }, []);

    const validarPagamento = (p: IPagamento): IPagamento | null => {
        const novosErros: Record<string, string> = {};
        if (!p.assinatura?.id) novosErros.assinatura = "Selecione uma assinatura";
        if (!p.idTransacaoGateway || p.idTransacaoGateway.trim() === "") novosErros.idTransacaoGateway = "ID da transação é obrigatório";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0 ? p : null;
    };

    const isEdicao = (p: IPagamento) => Boolean(p.id && p.id.trim() !== "");
    const limparFormulario = () => { setPagamento(null); setErrors({}); setKeyReiniciar((k) => k + 1); };

    const handleCreate = async (p: IPagamento) => {
        try { const novo = await pagamentoService.create(p); setListaPagamentos((l) => [...l, novo]); limparFormulario(); }
        catch (error) { console.error("Erro ao criar pagamento:", error); }
    };
    const handleUpdate = async (p: IPagamento) => {
        try { await pagamentoService.update(p.id!, p); setListaPagamentos((l) => l.map((x) => (x.id === p.id ? p : x))); limparFormulario(); }
        catch (error) { console.error("Erro ao atualizar pagamento:", error); }
    };
    const handleSave = (p: IPagamento) => {
        const v = validarPagamento(p);
        if (!v) return;
        if (isEdicao(v)) handleUpdate(v); else handleCreate(v);
    };
    const handleCancel = () => limparFormulario();
    const handleEdit = (p: IPagamento) => { setPagamento(p); setErrors({}); };
    const handleDelete = async (id: string) => {
        try { await pagamentoService.delete(id); setListaPagamentos((l) => l.filter((x) => x.id !== id)); }
        catch (error) { console.error("Erro ao excluir pagamento:", error); }
    };

    return (
        <>
            <div className="row m-4 border-bottom"><h4>Pagamentos</h4></div>
            <div className="container row m-4">
                <div className="col-12 col-md-6">
                    <PagamentoForm
                        key={pagamento ? pagamento.id : `new-${keyReiniciar}`}
                        pagamento={pagamento}
                        assinaturas={assinaturas}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        errors={errors}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <hr />
                    <PagamentoTable pagamentos={listaPagamentos} onEdit={handleEdit} onDelete={handleDelete} pagamentoEmEdicao={pagamento} />
                </div>
            </div>
        </>
    );
};
