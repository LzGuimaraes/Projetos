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
      console.log('Dados recebidos:', data);
      setProjects(Array.isArray(data) ? data : [data]);
      setSearchMode(false);
    } catch (err) {
      console.error('Erro ao buscar projetos:', err);
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
      console.log('Projeto encontrado:', data);
      setProjects([data]);
      setSearchMode(true);
    } catch (err) {
      console.error('Erro ao buscar projeto:', err);
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
    <div className="min-h-screen w-full py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8" style={{ backgroundColor: 'rgb(34, 43, 122)' }}>
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3" style={{ color: 'rgb(255, 255, 255)' }}>
            Gerenciamento de Projetos
          </h1>
          <p className="text-sm sm:text-base md:text-lg opacity-90" style={{ color: 'rgb(255, 255, 255)' }}>
            Gerencie e acompanhe seus projetos
          </p>
        </div>
        
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        {/* Loading Inline */}
        {loading && projects.length > 0 && (
          <div className="rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-center" style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <span className="font-medium text-sm sm:text-base" style={{ color: 'rgb(255, 255, 255)' }}>
              Carregando...
            </span>
          </div>
        )}
        
        {/* Error Inline */}
        {error && projects.length > 0 && (
          <div className="rounded-lg p-4 sm:p-5 mb-4 sm:mb-6" style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '2px solid rgba(239, 68, 68, 0.3)'
          }}>
            <div className="flex items-start sm:items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0" style={{ color: 'rgb(239, 68, 68)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="font-bold mb-1 text-sm sm:text-base" style={{ color: 'rgb(220, 38, 38)' }}>Erro</div>
                <div className="text-xs sm:text-sm" style={{ color: 'rgb(185, 28, 28)' }}>{error}</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Projects List - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
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
    </div>
  );
}

export default App;