import { Route, Routes } from "react-router-dom";
import { CategoriaPage } from "../pages/CategoriaPage";
import { CursoPage } from "../pages/CursoPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoriaPage />} />
      <Route path="/categoria" element={<CategoriaPage />} />
      <Route path="/curso" element={<CursoPage />} />
    </Routes>
  );
};