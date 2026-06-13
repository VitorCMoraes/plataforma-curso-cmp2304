import { type IPlano } from "../models/plano.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE = "/planos";

export class PlanoService {

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

    findAll(): Promise<IPlano[]> {
        return this.request<IPlano[]>("");
    }

    findById(id: string): Promise<IPlano> {
        return this.request<IPlano>(`/${id}`);
    }

    create(plano: Omit<IPlano, "id">): Promise<IPlano> {
        return this.request<IPlano>("", {
            method: "POST",
            body: JSON.stringify(plano),
        });
    }

    update(id: string, plano: Partial<IPlano>): Promise<IPlano> {
        const dados = { ...plano };
        delete dados.id;
        return this.request<IPlano>(`/${id}`, {
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

export const planoService = new PlanoService();
