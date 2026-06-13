import { type IAvaliacao } from "../models/avaliacao.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE = "/avaliacoes";

export class AvaliacaoService {

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

    findAll(): Promise<IAvaliacao[]> {
        return this.request<IAvaliacao[]>("");
    }

    findById(id: string): Promise<IAvaliacao> {
        return this.request<IAvaliacao>(`/${id}`);
    }

    create(avaliacao: Omit<IAvaliacao, "id">): Promise<IAvaliacao> {
        return this.request<IAvaliacao>("", {
            method: "POST",
            body: JSON.stringify(avaliacao),
        });
    }

    update(id: string, avaliacao: Partial<IAvaliacao>): Promise<IAvaliacao> {
        const dados = { ...avaliacao };
        delete dados.id;
        return this.request<IAvaliacao>(`/${id}`, {
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

export const avaliacaoService = new AvaliacaoService();
