import { type IAula } from "../models/aula.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE = "/aulas";

export class AulaService {

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

    findAll(): Promise<IAula[]> {
        return this.request<IAula[]>("");
    }

    findById(id: string): Promise<IAula> {
        return this.request<IAula>(`/${id}`);
    }

    create(aula: Omit<IAula, "id">): Promise<IAula> {
        return this.request<IAula>("", {
            method: "POST",
            body: JSON.stringify(aula),
        });
    }

    update(id: string, aula: Partial<IAula>): Promise<IAula> {
        const dados = { ...aula };
        delete dados.id;
        return this.request<IAula>(`/${id}`, {
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

export const aulaService = new AulaService();
