import { Link } from "react-router-dom";

export const HomePage = () => {
    return (
        <div className="container my-4">
            {/* Cabeçalho de apresentação */}
            <div className="p-5 mb-4 bg-light rounded-3 shadow-sm text-center">
                <h1 className="display-5 fw-bold">Plataforma de Cursos Online</h1>
                <p className="lead text-muted mb-0">
                    Gestão acadêmica, de usuários e financeira — selecione um módulo abaixo.
                </p>
            </div>

            <div className="row g-4">
                {/* Módulo Acadêmico e de Conteúdo */}
                <div className="col-12 col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="bi bi-journal-bookmark me-2"></i>Acadêmico
                            </h5>
                            <p className="card-text text-muted">Conteúdo e estrutura dos cursos.</p>
                            <div className="d-grid gap-2">
                                <Link className="btn btn-outline-primary" to="/categoria">Categorias</Link>
                                <Link className="btn btn-outline-primary" to="/curso">Cursos</Link>
                                <Link className="btn btn-outline-primary" to="/trilha">Trilhas</Link>
                                <Link className="btn btn-outline-primary" to="/modulo">Módulos</Link>
                                <Link className="btn btn-outline-primary" to="/aula">Aulas</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Módulo de Usuário e Progresso */}
                <div className="col-12 col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="bi bi-people me-2"></i>Usuários e Progresso
                            </h5>
                            <p className="card-text text-muted">Pessoas, matrículas e conclusão.</p>
                            <div className="d-grid gap-2">
                                <Link className="btn btn-outline-success" to="/usuario">Usuários</Link>
                                <Link className="btn btn-outline-success" to="/matricula">Matrículas</Link>
                                <Link className="btn btn-outline-success" to="/progresso-aula">Progresso</Link>
                                <Link className="btn btn-outline-success" to="/avaliacao">Avaliações</Link>
                                <Link className="btn btn-outline-success" to="/certificado">Certificados</Link>
                                <Link className="btn btn-outline-success" to="/trilha-curso">Trilhas-Cursos</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Módulo Financeiro */}
                <div className="col-12 col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="bi bi-cash-coin me-2"></i>Financeiro
                            </h5>
                            <p className="card-text text-muted">Planos, assinaturas e pagamentos.</p>
                            <div className="d-grid gap-2">
                                <Link className="btn btn-outline-dark" to="/plano">Planos</Link>
                                <Link className="btn btn-outline-dark" to="/assinatura">Assinaturas</Link>
                                <Link className="btn btn-outline-dark" to="/pagamento">Pagamentos</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};