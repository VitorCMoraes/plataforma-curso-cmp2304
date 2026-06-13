import type { IAssinatura } from "./assinatura.model";
import type { IPlano } from "./plano.model";

export interface IPagamento {
  id?: string;
  assinatura: IAssinatura;   
  valorPago: IPlano["preco"];         
  dataPagamento: string;
  metodoPagamento: string;   
  idTransacaoGateway: string;
}