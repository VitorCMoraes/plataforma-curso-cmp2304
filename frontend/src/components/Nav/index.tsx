import { Link } from "react-router-dom";

export const Nav = () => {
    return (
        <div className="d-flex justify-content-center align-items-center bg-dark p-3 mb-3 text-white">
            <ul className="nav flex-wrap justify-content-center">
                <li className="nav-item"><Link className="nav-link text-white" to="/categoria">Categorias</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/curso">Cursos</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/plano">Planos</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/usuario">Usuários</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/aula">Aulas</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/modulo">Módulos</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/trilha">Trilhas</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/matricula">Matrículas</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/avaliacao">Avaliações</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/progresso-aula">Progresso</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/trilha-curso">Trilha-Curso</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/certificado">Certificados</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/assinatura">Assinaturas</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/pagamento">Pagamentos</Link></li>
            </ul>
        </div>
    );
};
