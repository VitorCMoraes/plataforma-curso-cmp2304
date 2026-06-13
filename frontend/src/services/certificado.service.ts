import { type ICertificado } from "../models/certificado.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RESOURCE = "/certificados";

export class CertificadoService {

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

    findAll(): Promise<ICertificado[]> {
        return this.request<ICertificado[]>("");
    }

    findById(id: string): Promise<ICertificado> {
        return this.request<ICertificado>(`/${id}`);
    }

    create(certificado: Omit<ICertificado, "id">): Promise<ICertificado> {
        return this.request<ICertificado>("", {
            method: "POST",
            body: JSON.stringify(certificado),
        });
    }

    update(id: string, certificado: Partial<ICertificado>): Promise<ICertificado> {
        const dados = { ...certificado };
        delete dados.id;
        return this.request<ICertificado>(`/${id}`, {
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

export const certificadoService = new CertificadoService();
