import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import type { IPagamento } from "../../../models/pagamento.model";
import type { IAssinatura } from "../../../models/assinatura.model";

interface PagamentoFormProps {
    pagamento: IPagamento | null;
    assinaturas: IAssinatura[];
    onSave: (pagamento: IPagamento) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

const pagamentoVazio: IPagamento = {
    id: "", assinatura: {} as IAssinatura, valorPago: 0, dataPagamento: "", metodoPagamento: "cartao", idTransacaoGateway: "",
};

export const PagamentoForm = ({ pagamento = null, assinaturas, onSave, onCancel, errors = {} }: PagamentoFormProps) => {
    const [pagamentoState, setPagamentoState] = useState<IPagamento>(pagamento || pagamentoVazio);

    const selecionarAssinatura = (id: string) => {
        const assinatura = assinaturas.find((a) => a.id === id) || ({} as IAssinatura);
        setPagamentoState({ ...pagamentoState, assinatura });
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <h5 className="card-title">Formulário de Pagamento</h5>
                        <hr />
                        <Select label="Assinatura" id="assinatura"
                            value={pagamentoState.assinatura?.id || ""}
                            options={assinaturas.map((a) => ({
                                value: a.id || "",
                                label: `${a.usuario?.nome || ""} / ${a.plano?.nome || ""} (${a.dataInicio})`,
                            }))}
                            onChange={selecionarAssinatura} error={errors.assinatura} />
                        <Input label="Valor Pago" id="valorPago" visible="true" type="number"
                            value={String(pagamentoState.valorPago)} onChange={(v) => setPagamentoState({ ...pagamentoState, valorPago: Number(v) })} error={errors.valorPago} />
                        <Input label="Data do Pagamento" id="dataPagamento" visible="true" type="date"
                            value={pagamentoState.dataPagamento} onChange={(v) => setPagamentoState({ ...pagamentoState, dataPagamento: v })} />
                        <Select label="Método de Pagamento" id="metodoPagamento"
                            value={pagamentoState.metodoPagamento}
                            options={[
                                { value: "cartao", label: "Cartão" },
                                { value: "pix", label: "PIX" },
                                { value: "boleto", label: "Boleto" },
                            ]}
                            onChange={(v) => setPagamentoState({ ...pagamentoState, metodoPagamento: v as IPagamento["metodoPagamento"] })} />
                        <Input label="ID Transação Gateway" id="idTransacaoGateway" visible="true" type="text" placeholder="ID da transação..."
                            value={pagamentoState.idTransacaoGateway} onChange={(v) => setPagamentoState({ ...pagamentoState, idTransacaoGateway: v })} error={errors.idTransacaoGateway} />
                    </div>
                    <div className="card-footer">
                        <div className="row m-2">
                            <div className="col-6"><Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} /></div>
                            <div className="col-6">
                                <Button value={pagamentoState.id ? "Atualizar" : "Salvar"} variant={pagamentoState.id ? "warning" : "primary"} type="button" onClick={() => onSave(pagamentoState)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
