import { type IAssinatura } from "../models/assinatura.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE = "/assinaturas";

export class AssinaturaService {

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

    findAll(): Promise<IAssinatura[]> {
        return this.request<IAssinatura[]>("");
    }

    findById(id: string): Promise<IAssinatura> {
        return this.request<IAssinatura>(`/${id}`);
    }

    create(assinatura: Omit<IAssinatura, "id">): Promise<IAssinatura> {
        return this.request<IAssinatura>("", {
            method: "POST",
            body: JSON.stringify(assinatura),
        });
    }

    update(id: string, assinatura: Partial<IAssinatura>): Promise<IAssinatura> {
        const dados = { ...assinatura };
        delete dados.id;
        return this.request<IAssinatura>(`/${id}`, {
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

export const assinaturaService = new AssinaturaService();
