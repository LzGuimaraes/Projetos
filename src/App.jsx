import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import { SearchBar } from './components/SearchBar';
import { ProjectCard } from './components/ProjectCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { EmptyState } from './components/EmptyState';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchMode, setSearchMode] = useState(false);

  const fetchAllProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAllProjects();
      setProjects(Array.isArray(data) ? data : [data]);
      setSearchMode(false);
    } catch (err) {
      setError('Não foi possível carregar os projetos. Verifique se a API está rodando.');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectByNumber = async (numeroProjeto) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProjectByNumber(numeroProjeto);
      setProjects([data]);
      setSearchMode(true);
    } catch (err) {
      setError(`Não foi possível encontrar o projeto ${numeroProjeto}.`);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (numeroProjeto) => {
    if (numeroProjeto) {
      fetchProjectByNumber(numeroProjeto);
    } else {
      fetchAllProjects();
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  if (loading && projects.length === 0) {
    return <LoadingSpinner />;
  }

  if (error && projects.length === 0) {
    return <ErrorMessage message={error} />;
  }

  return (
  <div className="min-h-screen w-full flex flex-col overflow-x-hidden" style={{ backgroundColor: 'rgb(34, 43, 122)' }}>
    
    {/* HEADER FIXO */}
    <header className="w-full py-4 fixed top-0 left-0 z-50 backdrop-blur-md bg-[rgba(34,43,122,0.7)] border-b border-[rgba(255,255,255,0.1)]">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-white">
        Gerenciamento de Projetos
      </h1>
    </header>

    {/* CONTEÚDO ROLÁVEL */}
    <main className="flex-1 w-full pt-20 px-4 sm:px-6 md:px-8 pb-10"> {/* pt-20 = altura do header */}
      <div className="w-full max-w-full mx-auto">

        <p className="text-center text-sm sm:text-base md:text-lg mb-6 text-white opacity-90">
          Gerencie e acompanhe seus projetos
        </p>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Loading Inline */}
        {loading && projects.length > 0 && (
          <div className="rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-center bg-white/20 border border-white/30 text-white">
            Carregando...
          </div>
        )}

        {/* Erro Inline */}
        {error && projects.length > 0 && (
          <div className="rounded-lg p-4 sm:p-5 mb-4 sm:mb-6 bg-red-500/10 border border-red-500/30">
            <span className="text-red-600 font-bold">Erro:</span>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* LISTA DE PROJETOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 overflow-x-hidden">
          {projects.length === 0 ? (
            <div className="col-span-full">
              <EmptyState message={searchMode ? "Projeto não encontrado." : "Nenhum projeto encontrado."} />
            </div>
          ) : (
            projects.map((project) => (
              <ProjectCard key={project.numeroProjeto} project={project} />
            ))
          )}
        </div>

      </div>
    </main>
  </div>
);

}

export default App;
