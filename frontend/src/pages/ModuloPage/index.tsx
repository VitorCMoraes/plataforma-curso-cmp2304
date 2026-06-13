import { useEffect, useState } from "react";
import type { IModulo } from "../../models/modulo.model";
import { moduloService } from "../../services/modulo.service";
import { ModuloForm } from "./ModuloForm";
import { ModuloTable } from "./ModuloTable";

export const ModuloPage = () => {
    const [modulo, setModulo] = useState<IModulo | null>(null);
    const [listaModulos, setListaModulos] = useState<IModulo[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);

    const carregarModulos = async () => {
        try {
            const modulos = await moduloService.findAll();
            setListaModulos(modulos);
        } catch (error) {
            console.error("Erro ao carregar módulos:", error);
        }
    };

    useEffect(() => {
        carregarModulos();
    }, []);

    const validarModulo = (m: IModulo): IModulo | null => {
        const novosErros: Record<string, string> = {};
        if (!m.titulo || m.titulo.trim() === "") novosErros.titulo = "Título é obrigatório";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0 ? m : null;
    };

    const isEdicao = (m: IModulo) => Boolean(m.id && m.id.trim() !== "");
    const limparFormulario = () => { setModulo(null); setErrors({}); setKeyReiniciar((prev) => prev + 1); };

    const handleCreate = async (m: IModulo) => {
        try {
            const novo = await moduloService.create({ titulo: m.titulo, ordem: m.ordem, listaAulas: m.listaAulas });
            setListaModulos((lista) => [...lista, novo]);
            limparFormulario();
        } catch (error) {
            console.error("Erro ao criar módulo:", error);
        }
    };

    const handleUpdate = async (m: IModulo) => {
        try {
            await moduloService.update(m.id!, m);
            setListaModulos((lista) => lista.map((x) => (x.id === m.id ? m : x)));
            limparFormulario();
        } catch (error) {
            console.error("Erro ao atualizar módulo:", error);
        }
    };

    const handleSave = (m: IModulo) => {
        const validado = validarModulo(m);
        if (!validado) return;
        if (isEdicao(validado)) handleUpdate(validado);
        else handleCreate(validado);
    };

    const handleCancel = () => limparFormulario();
    const handleEdit = (m: IModulo) => { setModulo(m); setErrors({}); };
    const handleDelete = async (id: string) => {
        try {
            await moduloService.delete(id);
            setListaModulos((lista) => lista.filter((x) => x.id !== id));
        } catch (error) {
            console.error("Erro ao excluir módulo:", error);
        }
    };

    return (
        <>
            <div className="row m-4 border-bottom">
                <h4>Módulos</h4>
            </div>
            <div className="container row m-4">
                <div className="col-12 col-md-6">
                    <ModuloForm
                        key={modulo ? modulo.id : `new-${keyReiniciar}`}
                        modulo={modulo}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        errors={errors}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <hr />
                    <ModuloTable
                        modulos={listaModulos}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        moduloEmEdicao={modulo}
                    />
                </div>
            </div>
        </>
    );
};
