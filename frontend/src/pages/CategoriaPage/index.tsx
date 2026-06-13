import { useEffect, useState } from "react";
import type { ICategoria } from "../../models/categoria.model";
import { categoriaSchema } from "../../models/categoria.model";
import { categoriaService } from "../../services/categoria.service";
import { CategoriaForm } from "./CategoriaForm";
import { CategoriaTable } from "./CategoriaTable";

export const CategoriaPage = () => {
    const [categoria, setCategoria] = useState<ICategoria | null>(null);
    const [listaCategorias, setListaCategorias] = useState<ICategoria[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);

    const carregarCategorias = async () => {
        try {
            const categorias = await categoriaService.findAll();
            setListaCategorias(categorias);
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
        }
    };

    useEffect(() => {
        carregarCategorias();
    }, []);

    const validarCategoria = (cat: ICategoria): ICategoria | null => {
        setErrors({});
        const result = categoriaSchema.safeParse(cat);
        if (!result.success) {
            const errosFormatados: Record<string, string> = {};
            result.error.issues.forEach((err) => {
                if (err.path[0]) errosFormatados[err.path[0] as string] = err.message;
            });
            setErrors(errosFormatados);
            return null;
        }
        return cat;
    };

    const isEdicao = (cat: ICategoria): boolean => Boolean(cat.id && cat.id.trim() !== "");

    const limparFormulario = () => {
        setCategoria(null);
        setErrors({});
        setKeyReiniciar((prev) => prev + 1);
    };

    const handleCreate = async (cat: ICategoria) => {
        try {
            const nova = await categoriaService.create({ nome: cat.nome, descricao: cat.descricao });
            setListaCategorias((lista) => [...lista, nova]);
            limparFormulario();
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
        }
    };

    const handleUpdate = async (cat: ICategoria) => {
        try {
            await categoriaService.update(cat.id!, cat);
            setListaCategorias((lista) => lista.map((c) => (c.id === cat.id ? cat : c)));
            limparFormulario();
        } catch (error) {
            console.error("Erro ao atualizar categoria:", error);
        }
    };

    const handleSave = (cat: ICategoria) => {
        const validada = validarCategoria(cat);
        if (!validada) return;
        if (isEdicao(validada)) handleUpdate(validada);
        else handleCreate(validada);
    };

    const handleCancel = () => limparFormulario();

    const handleEdit = (cat: ICategoria) => {
        setCategoria(cat);
        setErrors({});
    };

    const handleDelete = async (id: string) => {
        try {
            await categoriaService.delete(id);
            setListaCategorias((lista) => lista.filter((c) => c.id !== id));
        } catch (error) {
            console.error("Erro ao excluir categoria:", error);
        }
    };

    return (
        <>
            <div className="row m-4 border-bottom">
                <h4>Categorias</h4>
            </div>
            <div className="container row m-4">
                <div className="col-12 col-md-6">
                    <CategoriaForm
                        key={categoria ? categoria.id : `new-${keyReiniciar}`}
                        categoria={categoria}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        errors={errors}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <hr />
                    <CategoriaTable
                        categorias={listaCategorias}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        categoriaEmEdicao={categoria}
                    />
                </div>
            </div>
        </>
    );
};