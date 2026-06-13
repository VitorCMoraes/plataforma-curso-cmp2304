import { useEffect, useState } from "react";
import type { IPlano } from "../../models/plano.model";
import { planoService } from "../../services/plano.service";
import { PlanoForm } from "./PlanoForm";
import { PlanoTable } from "./PlanoTable";

export const PlanoPage = () => {
    const [plano, setPlano] = useState<IPlano | null>(null);
    const [listaPlanos, setListaPlanos] = useState<IPlano[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);

    const carregarPlanos = async () => {
        try {
            const planos = await planoService.findAll();
            setListaPlanos(planos);
        } catch (error) {
            console.error("Erro ao carregar planos:", error);
        }
    };

    useEffect(() => {
        carregarPlanos();
    }, []);

    const validarPlano = (p: IPlano): IPlano | null => {
        const novosErros: Record<string, string> = {};
        if (!p.nome || p.nome.trim() === "") novosErros.nome = "Nome é obrigatório";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0 ? p : null;
    };

    const isEdicao = (p: IPlano) => Boolean(p.id && p.id.trim() !== "");
    const limparFormulario = () => { setPlano(null); setErrors({}); setKeyReiniciar((prev) => prev + 1); };

    const handleCreate = async (p: IPlano) => {
        try {
            const novo = await planoService.create({ nome: p.nome, descricao: p.descricao, preco: p.preco, duracaoMeses: p.duracaoMeses });
            setListaPlanos((lista) => [...lista, novo]);
            limparFormulario();
        } catch (error) {
            console.error("Erro ao criar plano:", error);
        }
    };

    const handleUpdate = async (p: IPlano) => {
        try {
            await planoService.update(p.id!, p);
            setListaPlanos((lista) => lista.map((x) => (x.id === p.id ? p : x)));
            limparFormulario();
        } catch (error) {
            console.error("Erro ao atualizar plano:", error);
        }
    };

    const handleSave = (p: IPlano) => {
        const validado = validarPlano(p);
        if (!validado) return;
        if (isEdicao(validado)) handleUpdate(validado);
        else handleCreate(validado);
    };

    const handleCancel = () => limparFormulario();
    const handleEdit = (p: IPlano) => { setPlano(p); setErrors({}); };
    const handleDelete = async (id: string) => {
        try {
            await planoService.delete(id);
            setListaPlanos((lista) => lista.filter((x) => x.id !== id));
        } catch (error) {
            console.error("Erro ao excluir plano:", error);
        }
    };

    return (
        <>
            <div className="row m-4 border-bottom">
                <h4>Planos</h4>
            </div>
            <div className="container row m-4">
                <div className="col-12 col-md-6">
                    <PlanoForm
                        key={plano ? plano.id : `new-${keyReiniciar}`}
                        plano={plano}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        errors={errors}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <hr />
                    <PlanoTable
                        planos={listaPlanos}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        planoEmEdicao={plano}
                    />
                </div>
            </div>
        </>
    );
};
