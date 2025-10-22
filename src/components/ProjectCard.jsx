export const ProjectCard = ({ project }) => {
  const statusConfig = {
    'Em Andamento': { bg: 'rgba(251, 191, 36, 0.2)', text: 'rgb(217, 119, 6)', border: 'rgba(251, 191, 36, 0.4)' },
    'Concluído': { bg: 'rgba(74, 222, 128, 0.2)', text: 'rgb(22, 163, 74)', border: 'rgba(74, 222, 128, 0.4)' },
    'Pausado': { bg: 'rgba(248, 113, 113, 0.2)', text: 'rgb(220, 38, 38)', border: 'rgba(248, 113, 113, 0.4)' },
    'Ativo': { bg: 'rgba(74, 222, 128, 0.2)', text: 'rgb(22, 163, 74)', border: 'rgba(74, 222, 128, 0.4)' },
  };

  const status = statusConfig[project.status] || statusConfig['Em Andamento'];

  const renderProjectDetails = () => {
    const excludeKeys = ['numeroProjeto', 'nome', 'status', 'descricao'];
    const details = Object.entries(project).filter(([key]) => !excludeKeys.includes(key));
    
    if (details.length === 0) return null;

    return (
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4" style={{ borderTop: '1px solid rgba(34, 43, 122, 0.1)' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {details.map(([key, value]) => (
            <div key={key} className="break-words">
              <p className="text-xs font-semibold uppercase opacity-60 mb-1" style={{ color: 'rgb(34, 43, 122)' }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className="text-xs sm:text-sm font-medium" style={{ color: 'rgb(71, 85, 105)' }}>
                {value || 'N/A'}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="rounded-xl p-4 sm:p-5 md:p-6 transition-all cursor-pointer w-full"
      style={{ 
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        height: 'fit-content'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold mb-1 break-words" style={{ color: 'rgb(34, 43, 122)' }}>
            {project.nome || 'Sem nome'}
          </h3>
          <p className="text-xs sm:text-sm font-medium opacity-60 break-all" style={{ color: 'rgb(34, 43, 122)' }}>
            Projeto #{project.numeroProjeto}
          </p>
        </div>
        <span 
          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap self-start sm:self-auto"
          style={{ 
            backgroundColor: status.bg,
            color: status.text,
            border: `2px solid ${status.border}`
          }}
        >
          {project.status || 'N/A'}
        </span>
      </div>
      
      {project.descricao && (
        <p className="text-sm sm:text-base leading-relaxed mb-2 break-words" style={{ color: 'rgb(71, 85, 105)' }}>
          {project.descricao}
        </p>
      )}

      {renderProjectDetails()}
    </div>
  );
};