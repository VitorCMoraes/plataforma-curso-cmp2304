import { type IModulo } from "../models/modulo.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE = "/modulos";

export class ModuloService {

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

    findAll(): Promise<IModulo[]> {
        return this.request<IModulo[]>("");
    }

    findById(id: string): Promise<IModulo> {
        return this.request<IModulo>(`/${id}`);
    }

    create(modulo: Omit<IModulo, "id">): Promise<IModulo> {
        return this.request<IModulo>("", {
            method: "POST",
            body: JSON.stringify(modulo),
        });
    }

    update(id: string, modulo: Partial<IModulo>): Promise<IModulo> {
        const dados = { ...modulo };
        delete dados.id;
        return this.request<IModulo>(`/${id}`, {
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

export const moduloService = new ModuloService();
