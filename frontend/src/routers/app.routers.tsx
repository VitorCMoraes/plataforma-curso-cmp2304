import { Route, Routes } from "react-router-dom";
import { CategoriaPage } from "../pages/CategoriaPage";
import { CursoPage } from "../pages/CursoPage";
import { PlanoPage } from "../pages/PlanoPage";
import { UsuarioPage } from "../pages/UsuarioPage";
import { AulaPage } from "../pages/AulaPage";
import { ModuloPage } from "../pages/ModuloPage";
import { TrilhaPage } from "../pages/TrilhaPage";
import { MatriculaPage } from "../pages/MatriculaPage";
import { AvaliacaoPage } from "../pages/AvaliacaoPage";
import { ProgressoAulaPage } from "../pages/ProgressoAulaPage";
import { TrilhaCursoPage } from "../pages/TrilhaCursoPage";
import { CertificadoPage } from "../pages/CertificadoPage";
import { AssinaturaPage } from "../pages/AssinaturaPage";
import { PagamentoPage } from "../pages/PagamentoPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoriaPage />} />
      <Route path="/categoria" element={<CategoriaPage />} />
      <Route path="/curso" element={<CursoPage />} />
      <Route path="/plano" element={<PlanoPage />} />
      <Route path="/usuario" element={<UsuarioPage />} />
      <Route path="/aula" element={<AulaPage />} />
      <Route path="/modulo" element={<ModuloPage />} />
      <Route path="/trilha" element={<TrilhaPage />} />
      <Route path="/matricula" element={<MatriculaPage />} />
      <Route path="/avaliacao" element={<AvaliacaoPage />} />
      <Route path="/progresso-aula" element={<ProgressoAulaPage />} />
      <Route path="/trilha-curso" element={<TrilhaCursoPage />} />
      <Route path="/certificado" element={<CertificadoPage />} />
      <Route path="/assinatura" element={<AssinaturaPage />} />
      <Route path="/pagamento" element={<PagamentoPage />} />
    </Routes>
  );
};
