import { type IMatricula } from "../models/matricula.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE = "/matriculas";

export class MatriculaService {

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

    findAll(): Promise<IMatricula[]> {
        return this.request<IMatricula[]>("");
    }

    findById(id: string): Promise<IMatricula> {
        return this.request<IMatricula>(`/${id}`);
    }

    create(matricula: Omit<IMatricula, "id">): Promise<IMatricula> {
        return this.request<IMatricula>("", {
            method: "POST",
            body: JSON.stringify(matricula),
        });
    }

    update(id: string, matricula: Partial<IMatricula>): Promise<IMatricula> {
        const dados = { ...matricula };
        delete dados.id;
        return this.request<IMatricula>(`/${id}`, {
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

export const matriculaService = new MatriculaService();
