import { useEffect, useState } from "react";
import type { IAula } from "../../models/aula.model";
import { aulaService } from "../../services/aula.service";
import { AulaForm } from "./AulaForm";
import { AulaTable } from "./AulaTable";

export const AulaPage = () => {
    const [aula, setAula] = useState<IAula | null>(null);
    const [listaAulas, setListaAulas] = useState<IAula[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);

    const carregarAulas = async () => {
        try {
            const aulas = await aulaService.findAll();
            setListaAulas(aulas);
        } catch (error) {
            console.error("Erro ao carregar aulas:", error);
        }
    };

    useEffect(() => {
        carregarAulas();
    }, []);

    const validarAula = (a: IAula): IAula | null => {
        const novosErros: Record<string, string> = {};
        if (!a.titulo || a.titulo.trim() === "") novosErros.titulo = "Título é obrigatório";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0 ? a : null;
    };

    const isEdicao = (a: IAula) => Boolean(a.id && a.id.trim() !== "");
    const limparFormulario = () => { setAula(null); setErrors({}); setKeyReiniciar((prev) => prev + 1); };

    const handleCreate = async (a: IAula) => {
        try {
            const nova = await aulaService.create({ titulo: a.titulo, tipoConteudo: a.tipoConteudo, urlConteudo: a.urlConteudo, duracao: a.duracao, ordem: a.ordem });
            setListaAulas((lista) => [...lista, nova]);
            limparFormulario();
        } catch (error) {
            console.error("Erro ao criar aula:", error);
        }
    };

    const handleUpdate = async (a: IAula) => {
        try {
            await aulaService.update(a.id!, a);
            setListaAulas((lista) => lista.map((x) => (x.id === a.id ? a : x)));
            limparFormulario();
        } catch (error) {
            console.error("Erro ao atualizar aula:", error);
        }
    };

    const handleSave = (a: IAula) => {
        const validada = validarAula(a);
        if (!validada) return;
        if (isEdicao(validada)) handleUpdate(validada);
        else handleCreate(validada);
    };

    const handleCancel = () => limparFormulario();
    const handleEdit = (a: IAula) => { setAula(a); setErrors({}); };
    const handleDelete = async (id: string) => {
        try {
            await aulaService.delete(id);
            setListaAulas((lista) => lista.filter((x) => x.id !== id));
        } catch (error) {
            console.error("Erro ao excluir aula:", error);
        }
    };

    return (
        <>
            <div className="row m-4 border-bottom">
                <h4>Aulas</h4>
            </div>
            <div className="container row m-4">
                <div className="col-12 col-md-6">
                    <AulaForm
                        key={aula ? aula.id : `new-${keyReiniciar}`}
                        aula={aula}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        errors={errors}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <hr />
                    <AulaTable
                        aulas={listaAulas}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        aulaEmEdicao={aula}
                    />
                </div>
            </div>
        </>
    );
};
