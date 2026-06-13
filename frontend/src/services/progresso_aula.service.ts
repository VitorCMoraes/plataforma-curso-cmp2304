import { type IProgressoAula } from "../models/progresso_aula.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE = "/progresso_aulas";

export class ProgressoAulaService {

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

    findAll(): Promise<IProgressoAula[]> {
        return this.request<IProgressoAula[]>("");
    }

    findById(id: string): Promise<IProgressoAula> {
        return this.request<IProgressoAula>(`/${id}`);
    }

    create(progresso: Omit<IProgressoAula, "id">): Promise<IProgressoAula> {
        return this.request<IProgressoAula>("", {
            method: "POST",
            body: JSON.stringify(progresso),
        });
    }

    update(id: string, progresso: Partial<IProgressoAula>): Promise<IProgressoAula> {
        const dados = { ...progresso };
        delete dados.id;
        return this.request<IProgressoAula>(`/${id}`, {
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

export const progressoAulaService = new ProgressoAulaService();
