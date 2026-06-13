import { type ITrilhaCurso } from "../models/trilha_curso.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE = "/trilhas_cursos";

export class TrilhaCursoService {

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

    findAll(): Promise<ITrilhaCurso[]> {
        return this.request<ITrilhaCurso[]>("");
    }

    findById(id: string): Promise<ITrilhaCurso> {
        return this.request<ITrilhaCurso>(`/${id}`);
    }

    create(trilhaCurso: Omit<ITrilhaCurso, "id">): Promise<ITrilhaCurso> {
        return this.request<ITrilhaCurso>("", {
            method: "POST",
            body: JSON.stringify(trilhaCurso),
        });
    }

    update(id: string, trilhaCurso: Partial<ITrilhaCurso>): Promise<ITrilhaCurso> {
        const dados = { ...trilhaCurso };
        delete dados.id;
        return this.request<ITrilhaCurso>(`/${id}`, {
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

export const trilhaCursoService = new TrilhaCursoService();
