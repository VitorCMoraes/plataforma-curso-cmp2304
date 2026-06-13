import { type IPagamento } from "../models/pagamento.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE = "/pagamentos";

export class PagamentoService {

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${RESOURCE}${endpoint}`;

        const config: RequestInit = {
            ...options,
            headers: { "Content-Type": "application/json", ...options.headers },
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`Erro API (${response.status}): ${response.statusText}`);
            }

            if (response.status === 204) {
                return {} as T;
            }

            return await response.json();
        } catch (error) {
            console.error("Erro na requisição:", error);
            throw error;
        }
    }

    findAll(): Promise<IPagamento[]> {
        return this.request<IPagamento[]>("");
    }

    findById(id: string): Promise<IPagamento> {
        return this.request<IPagamento>(`/${id}`);
    }

    create(pagamento: Omit<IPagamento, "id">): Promise<IPagamento> {
        return this.request<IPagamento>("", {
            method: "POST",
            body: JSON.stringify(pagamento),
        });
    }

    update(id: string, pagamento: Partial<IPagamento>): Promise<IPagamento> {
        const dados = { ...pagamento };
        delete dados.id;
        return this.request<IPagamento>(`/${id}`, {
            method: "PUT",
            body: JSON.stringify(dados),
        });
    }

    delete(id: string): Promise<void> {
        return this.request<void>(`/${id}`, {
            method: "DELETE",
        });
    }
}

export const pagamentoService = new PagamentoService();
