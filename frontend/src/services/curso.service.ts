import { type ICurso } from "../models/curso.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE = "/cursos";

export class CursoService {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${RESOURCE}${endpoint}`;
        const config: RequestInit = { ...options, headers: { "Content-Type": "application/json", ...options.headers } };
        const response = await fetch(url, config);
        if (!response.ok) throw new Error(`Erro API (${response.status}): ${response.statusText}`);
        if (response.status === 204) return {} as T;
        return await response.json();
    }
    findAll(): Promise<ICurso[]> { return this.request<ICurso[]>(""); }

    findById(id: string): Promise<ICurso> { return this.request<ICurso>(`/${id}`); }

    create(curso: ICurso): Promise<ICurso> {
        const dados = { ...curso }; delete dados.id;
        return this.request<ICurso>("", { method: "POST", body: JSON.stringify(dados) });
    }

    update(id: string, curso: Partial<ICurso>): Promise<ICurso> {
        const dados = { ...curso }; delete dados.id;
        return this.request<ICurso>(`/${id}`, { method: "PUT", body: JSON.stringify(dados) });
    }
    
    delete(id: string): Promise<void> { return this.request<void>(`/${id}`, { method: "DELETE" }); }
}
export const cursoService = new CursoService();