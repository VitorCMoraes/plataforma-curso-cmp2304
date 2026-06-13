import { type IUsuario } from "../models/usuario.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE = "/usuarios";

export class UsuarioService {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${RESOURCE}${endpoint}`;
        const config: RequestInit = { ...options, headers: { "Content-Type": "application/json", ...options.headers } };
        const response = await fetch(url, config);
        if (!response.ok) throw new Error(`Erro API (${response.status}): ${response.statusText}`);
        if (response.status === 204) return {} as T;
        return await response.json();
    }
    findAll(): Promise<IUsuario[]> { return this.request<IUsuario[]>(""); }

    findById(id: string): Promise<IUsuario> { return this.request<IUsuario>(`/${id}`); }

    create(usuario: IUsuario): Promise<IUsuario> {
        const dados = { ...usuario }; delete dados.id;
        return this.request<IUsuario>("", { method: "POST", body: JSON.stringify(dados) });
    }

    update(id: string, usuario: Partial<IUsuario>): Promise<IUsuario> {
        const dados = { ...usuario }; delete dados.id;
        return this.request<IUsuario>(`/${id}`, { method: "PUT", body: JSON.stringify(dados) });
    }
    
    delete(id: string): Promise<void> { return this.request<void>(`/${id}`, { method: "DELETE" }); }
}
export const usuarioService = new UsuarioService();