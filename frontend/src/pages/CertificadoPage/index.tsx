import { useEffect, useState } from "react";
import type { ICertificado } from "../../models/certificado.model";
import type { IUsuario } from "../../models/usuario.model";
import type { ICurso } from "../../models/curso.model";
import type { ITrilha } from "../../models/trilha.model";
import { certificadoService } from "../../services/certificado.service";
import { usuarioService } from "../../services/usuario.service";
import { cursoService } from "../../services/curso.service";
import { trilhaService } from "../../services/trilha.service";
import { CertificadoForm } from "./CertificadoForm";
import { CertificadoTable } from "./CertificadoTable";

export const CertificadoPage = () => {
    const [certificado, setCertificado] = useState<ICertificado | null>(null);
    const [listaCertificados, setListaCertificados] = useState<ICertificado[]>([]);
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [trilhas, setTrilhas] = useState<ITrilha[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);

    const carregarDados = async () => {
        try {
            const [certs, users, cs, ts] = await Promise.all([
                certificadoService.findAll(),
                usuarioService.findAll(),
                cursoService.findAll(),
                trilhaService.findAll(),
            ]);
            setListaCertificados(certs);
            setUsuarios(users);
            setCursos(cs);
            setTrilhas(ts);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    useEffect(() => { carregarDados(); }, []);

    const validarCertificado = (c: ICertificado): ICertificado | null => {
        const novosErros: Record<string, string> = {};
        if (!c.usuario?.id) novosErros.usuario = "Selecione um usuário";
        if (!c.curso?.id) novosErros.curso = "Selecione um curso";
        if (!c.codigoVerificacao || c.codigoVerificacao.trim() === "") novosErros.codigoVerificacao = "Código de verificação é obrigatório";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0 ? c : null;
    };

    const isEdicao = (c: ICertificado) => Boolean(c.id && c.id.trim() !== "");
    const limparFormulario = () => { setCertificado(null); setErrors({}); setKeyReiniciar((k) => k + 1); };

    const handleCreate = async (c: ICertificado) => {
        try { const novo = await certificadoService.create(c); setListaCertificados((l) => [...l, novo]); limparFormulario(); }
        catch (error) { console.error("Erro ao criar certificado:", error); }
    };
    const handleUpdate = async (c: ICertificado) => {
        try { await certificadoService.update(c.id!, c); setListaCertificados((l) => l.map((x) => (x.id === c.id ? c : x))); limparFormulario(); }
        catch (error) { console.error("Erro ao atualizar certificado:", error); }
    };
    const handleSave = (c: ICertificado) => {
        const v = validarCertificado(c);
        if (!v) return;
        if (isEdicao(v)) handleUpdate(v); else handleCreate(v);
    };
    const handleCancel = () => limparFormulario();
    const handleEdit = (c: ICertificado) => { setCertificado(c); setErrors({}); };
    const handleDelete = async (id: string) => {
        try { await certificadoService.delete(id); setListaCertificados((l) => l.filter((x) => x.id !== id)); }
        catch (error) { console.error("Erro ao excluir certificado:", error); }
    };

    return (
        <>
            <div className="row m-4 border-bottom"><h4>Certificados</h4></div>
            <div className="container row m-4">
                <div className="col-12 col-md-6">
                    <CertificadoForm
                        key={certificado ? certificado.id : `new-${keyReiniciar}`}
                        certificado={certificado}
                        usuarios={usuarios}
                        cursos={cursos}
                        trilhas={trilhas}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        errors={errors}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <hr />
                    <CertificadoTable certificados={listaCertificados} onEdit={handleEdit} onDelete={handleDelete} certificadoEmEdicao={certificado} />
                </div>
            </div>
        </>
    );
};
