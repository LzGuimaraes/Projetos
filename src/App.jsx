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

  return (
    <div className="min-h-screen w-screen flex flex-col overflow-x-hidden bg-[rgb(34,43,122)]">
      
      {/* HEADER FIXO */}
      <header className="w-full py-4 fixed top-0 left-0 z-50 backdrop-blur-md bg-[rgba(34,43,122,0.8)] border-b border-[rgba(255,255,255,0.1)]">
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-white">
          Gerenciamento de Projetos
        </h1>
      </header>

      {/* CONTEÚDO */}
      <main className="flex-1 w-full pt-20 px-4 sm:px-6 md:px-8 pb-10 flex flex-col items-center">
        <p className="text-center text-sm sm:text-base md:text-lg mb-6 text-white opacity-90">
          Gerencie e acompanhe seus projetos
        </p>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* ESTADOS */}
        {loading && projects.length === 0 ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : projects.length === 0 ? (
          <EmptyState message={searchMode ? 'Projeto não encontrado.' : 'Nenhum projeto encontrado.'} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mt-6 w-full max-w-6xl">
            {projects.map((project) => (
              <ProjectCard key={project.numeroProjeto} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
