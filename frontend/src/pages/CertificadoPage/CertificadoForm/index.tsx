import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import type { ICertificado } from "../../../models/certificado.model";
import type { IUsuario } from "../../../models/usuario.model";
import type { ICurso } from "../../../models/curso.model";
import type { ITrilha } from "../../../models/trilha.model";

interface CertificadoFormProps {
    certificado: ICertificado | null;
    usuarios: IUsuario[];
    cursos: ICurso[];
    trilhas: ITrilha[];
    onSave: (certificado: ICertificado) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

const certificadoVazio: ICertificado = {
    id: "", usuario: {} as IUsuario, curso: {} as ICurso, trilha: undefined, codigoVerificacao: "", dataEmissao: "",
};

export const CertificadoForm = ({ certificado = null, usuarios, cursos, trilhas, onSave, onCancel, errors = {} }: CertificadoFormProps) => {
    const [certState, setCertState] = useState<ICertificado>(certificado || certificadoVazio);

    const selecionarUsuario = (id: string) => {
        const usuario = usuarios.find((u) => u.id === id) || ({} as IUsuario);
        setCertState({ ...certState, usuario });
    };
    const selecionarCurso = (id: string) => {
        const curso = cursos.find((c) => c.id === id) || ({} as ICurso);
        setCertState({ ...certState, curso });
    };
    const selecionarTrilha = (id: string) => {
        const trilha = id ? trilhas.find((t) => t.id === id) : undefined;
        setCertState({ ...certState, trilha });
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <h5 className="card-title">Formulário de Certificado</h5>
                        <hr />
                        <Select label="Usuário" id="usuario"
                            value={certState.usuario?.id || ""}
                            options={usuarios.map((u) => ({ value: u.id || "", label: u.nome }))}
                            onChange={selecionarUsuario} error={errors.usuario} />
                        <Select label="Curso" id="curso"
                            value={certState.curso?.id || ""}
                            options={cursos.map((c) => ({ value: c.id || "", label: c.titulo }))}
                            onChange={selecionarCurso} error={errors.curso} />
                        <Select label="Trilha (opcional)" id="trilha"
                            value={certState.trilha?.id || ""}
                            options={trilhas.map((t) => ({ value: t.id || "", label: t.titulo }))}
                            onChange={selecionarTrilha} />
                        <Input label="Código de Verificação" id="codigoVerificacao" visible="true" type="text" placeholder="Código único..."
                            value={certState.codigoVerificacao} onChange={(v) => setCertState({ ...certState, codigoVerificacao: v })} error={errors.codigoVerificacao} />
                        <Input label="Data de Emissão" id="dataEmissao" visible="true" type="date"
                            value={certState.dataEmissao} onChange={(v) => setCertState({ ...certState, dataEmissao: v })} />
                    </div>
                    <div className="card-footer">
                        <div className="row m-2">
                            <div className="col-6"><Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} /></div>
                            <div className="col-6">
                                <Button value={certState.id ? "Atualizar" : "Salvar"} variant={certState.id ? "warning" : "primary"} type="button" onClick={() => onSave(certState)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
