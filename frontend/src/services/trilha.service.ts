import { type ITrilha } from "../models/trilha.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE = "/trilhas";

export class TrilhaService {

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

    findAll(): Promise<ITrilha[]> {
        return this.request<ITrilha[]>("");
    }

    findById(id: string): Promise<ITrilha> {
        return this.request<ITrilha>(`/${id}`);
    }

    create(trilha: Omit<ITrilha, "id">): Promise<ITrilha> {
        return this.request<ITrilha>("", {
            method: "POST",
            body: JSON.stringify(trilha),
        });
    }

    update(id: string, trilha: Partial<ITrilha>): Promise<ITrilha> {
        const dados = { ...trilha };
        delete dados.id;
        return this.request<ITrilha>(`/${id}`, {
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

export const trilhaService = new TrilhaService();
