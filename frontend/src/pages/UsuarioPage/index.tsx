import { useEffect, useState } from "react";
import type { IUsuario } from "../../models/usuario.model";
import { usuarioService } from "../../services/usuario.service";
import { UsuarioForm } from "./UsuarioForm";
import { UsuarioTable } from "./UsuarioTable";

export const UsuarioPage = () => {
    const [usuario, setUsuario] = useState<IUsuario | null>(null);
    const [listaUsuarios, setListaUsuarios] = useState<IUsuario[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);

    const carregarUsuarios = async () => {
        try {
            const usuarios = await usuarioService.findAll();
            setListaUsuarios(usuarios);
        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
        }
    };

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const validarUsuario = (u: IUsuario): IUsuario | null => {
        const novosErros: Record<string, string> = {};
        if (!u.nome || u.nome.trim() === "") novosErros.nome = "Nome é obrigatório";
        if (!u.email || u.email.trim() === "") novosErros.email = "E-mail é obrigatório";
        if (!u.senhaHash || u.senhaHash.trim() === "") novosErros.senhaHash = "Senha é obrigatória";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0 ? u : null;
    };

    const isEdicao = (u: IUsuario) => Boolean(u.id && u.id.trim() !== "");
    const limparFormulario = () => { setUsuario(null); setErrors({}); setKeyReiniciar((prev) => prev + 1); };

    const handleCreate = async (u: IUsuario) => {
        try {
            const novo = await usuarioService.create(u);
            setListaUsuarios((lista) => [...lista, novo]);
            limparFormulario();
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    };

    const handleUpdate = async (u: IUsuario) => {
        try {
            await usuarioService.update(u.id!, u);
            setListaUsuarios((lista) => lista.map((x) => (x.id === u.id ? u : x)));
            limparFormulario();
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    };

    const handleSave = (u: IUsuario) => {
        const validado = validarUsuario(u);
        if (!validado) return;
        if (isEdicao(validado)) handleUpdate(validado);
        else handleCreate(validado);
    };

    const handleCancel = () => limparFormulario();
    const handleEdit = (u: IUsuario) => { setUsuario(u); setErrors({}); };
    const handleDelete = async (id: string) => {
        try {
            await usuarioService.delete(id);
            setListaUsuarios((lista) => lista.filter((x) => x.id !== id));
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
        }
    };

    return (
        <>
            <div className="row m-4 border-bottom">
                <h4>Usuários</h4>
            </div>
            <div className="container row m-4">
                <div className="col-12 col-md-6">
                    <UsuarioForm
                        key={usuario ? usuario.id : `new-${keyReiniciar}`}
                        usuario={usuario}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        errors={errors}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <hr />
                    <UsuarioTable
                        usuarios={listaUsuarios}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        usuarioEmEdicao={usuario}
                    />
                </div>
            </div>
        </>
    );
};
