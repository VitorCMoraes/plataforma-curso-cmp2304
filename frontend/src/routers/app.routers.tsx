import { Route, Routes } from "react-router-dom";
import { CategoriaPage } from "../pages/CategoriaPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoriaPage />} />
      <Route path="/categoria" element={<CategoriaPage />} />
    </Routes>
  );
};