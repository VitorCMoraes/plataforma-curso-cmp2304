import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import type { IAssinatura } from "../../../models/assinatura.model";
import type { IUsuario } from "../../../models/usuario.model";
import type { IPlano } from "../../../models/plano.model";

interface AssinaturaFormProps {
    assinatura: IAssinatura | null;
    usuarios: IUsuario[];
    planos: IPlano[];
    onSave: (assinatura: IAssinatura) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

const assinaturaVazia: IAssinatura = {
    id: "", usuario: {} as IUsuario, plano: {} as IPlano, dataInicio: "", dataFim: "",
};

export const AssinaturaForm = ({ assinatura = null, usuarios, planos, onSave, onCancel, errors = {} }: AssinaturaFormProps) => {
    const [assinaturaState, setAssinaturaState] = useState<IAssinatura>(assinatura || assinaturaVazia);

    const selecionarUsuario = (id: string) => {
        const usuario = usuarios.find((u) => u.id === id) || ({} as IUsuario);
        setAssinaturaState({ ...assinaturaState, usuario });
    };
    const selecionarPlano = (id: string) => {
        const plano = planos.find((p) => p.id === id) || ({} as IPlano);
        setAssinaturaState({ ...assinaturaState, plano });
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <h5 className="card-title">Formulário de Assinatura</h5>
                        <hr />
                        <Select label="Usuário" id="usuario"
                            value={assinaturaState.usuario?.id || ""}
                            options={usuarios.map((u) => ({ value: u.id || "", label: u.nome }))}
                            onChange={selecionarUsuario} error={errors.usuario} />
                        <Select label="Plano" id="plano"
                            value={assinaturaState.plano?.id || ""}
                            options={planos.map((p) => ({ value: p.id || "", label: p.nome }))}
                            onChange={selecionarPlano} error={errors.plano} />
                        <Input label="Data de Início" id="dataInicio" visible="true" type="date"
                            value={assinaturaState.dataInicio} onChange={(v) => setAssinaturaState({ ...assinaturaState, dataInicio: v })} />
                        <Input label="Data de Fim" id="dataFim" visible="true" type="date"
                            value={assinaturaState.dataFim} onChange={(v) => setAssinaturaState({ ...assinaturaState, dataFim: v })} />
                    </div>
                    <div className="card-footer">
                        <div className="row m-2">
                            <div className="col-6"><Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} /></div>
                            <div className="col-6">
                                <Button value={assinaturaState.id ? "Atualizar" : "Salvar"} variant={assinaturaState.id ? "warning" : "primary"} type="button" onClick={() => onSave(assinaturaState)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
