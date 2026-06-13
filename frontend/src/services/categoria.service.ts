import { type ICategoria } from "../models/categoria.model";

// A base vem do .env (VITE_API_URL). RESOURCE é o "endpoint" desta entidade.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE = "/categorias";

export class CategoriaService {

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

    // GET
    findAll(): Promise<ICategoria[]> {
        return this.request<ICategoria[]>("");
    }

    // GET
    findById(id: string): Promise<ICategoria> {
        return this.request<ICategoria>(`/${id}`);
    }

    // POST
    create(categoria: Omit<ICategoria, "id">): Promise<ICategoria> {
        return this.request<ICategoria>("", {
            method: "POST",
            body: JSON.stringify(categoria),
        });
    }

    // PUT
    update(id: string, categoria: Partial<ICategoria>): Promise<ICategoria> {
        const dados = { ...categoria };
        delete dados.id;
        return this.request<ICategoria>(`/${id}`, {
            method: "PUT",
            body: JSON.stringify(dados),
        });
    }

    // DELETE
    delete(id: string): Promise<void> {
        return this.request<void>(`/${id}`, { 
            method: "DELETE" 
        });
    }
}

export const categoriaService = new CategoriaService();