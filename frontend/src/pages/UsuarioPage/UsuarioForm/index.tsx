import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import type { IUsuario } from "../../../models/usuario.model";

interface UsuarioFormProps {
    usuario: IUsuario | null;
    onSave: (usuario: IUsuario) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

const usuarioVazio: IUsuario = {
    id: "", nome: "", email: "", perfil: "aluno", senhaHash: "", dataCriacao: "", dataAlteracao: "",
};

export const UsuarioForm = ({ usuario = null, onSave, onCancel, errors = {} }: UsuarioFormProps) => {
    const [usuarioState, setUsuarioState] = useState<IUsuario>(usuario || usuarioVazio);

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <h5 className="card-title">Formulário de Usuário</h5>
                        <hr />
                        <div className="container">
                            <Input
                                label="Nome"
                                id="nome"
                                visible="true"
                                type="text"
                                placeholder="Digite o nome..."
                                value={usuarioState.nome}
                                onChange={(value) => setUsuarioState({ ...usuarioState, nome: value })}
                                error={errors.nome}
                            />
                            <Input
                                label="E-mail"
                                id="email"
                                visible="true"
                                type="email"
                                placeholder="Digite o e-mail..."
                                value={usuarioState.email}
                                onChange={(value) => setUsuarioState({ ...usuarioState, email: value })}
                                error={errors.email}
                            />
                            <Select
                                label="Perfil"
                                id="perfil"
                                value={usuarioState.perfil}
                                options={[
                                    { value: "administrador", label: "Administrador" },
                                    { value: "instrutor", label: "Instrutor" },
                                    { value: "aluno", label: "Aluno" },
                                ]}
                                onChange={(value) => setUsuarioState({ ...usuarioState, perfil: value as IUsuario["perfil"] })}
                                error={errors.perfil}
                            />
                            <Input
                                label="Senha"
                                id="senhaHash"
                                visible="true"
                                type="password"
                                placeholder="Digite a senha..."
                                value={usuarioState.senhaHash}
                                onChange={(value) => setUsuarioState({ ...usuarioState, senhaHash: value })}
                                error={errors.senhaHash}
                            />
                            <Input
                                label="Data de Criação"
                                id="dataCriacao"
                                visible="true"
                                type="date"
                                value={usuarioState.dataCriacao}
                                onChange={(value) => setUsuarioState({ ...usuarioState, dataCriacao: value })}
                            />
                            <Input
                                label="Data de Alteração"
                                id="dataAlteracao"
                                visible="true"
                                type="date"
                                value={usuarioState.dataAlteracao}
                                onChange={(value) => setUsuarioState({ ...usuarioState, dataAlteracao: value })}
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="row m-2">
                            <div className="col-6">
                                <Button value="Cancelar" variant="secondary" type="button" onClick={() => onCancel()} />
                            </div>
                            <div className="col-6">
                                <Button
                                    value={usuarioState.id ? "Atualizar" : "Salvar"}
                                    variant={usuarioState.id ? "warning" : "primary"}
                                    type="button"
                                    onClick={() => onSave(usuarioState)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
