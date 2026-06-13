import { Route, Routes } from "react-router-dom";
import { CategoriaPage } from "../pages/CategoriaPage";
import { CursoPage } from "../pages/CursoPage";
import { PlanoPage } from "../pages/PlanoPage";
import { UsuarioPage } from "../pages/UsuarioPage";
import { AulaPage } from "../pages/AulaPage";
import { ModuloPage } from "../pages/ModuloPage";

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
    </Routes>
  );
};
