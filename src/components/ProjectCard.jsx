import { useState } from 'react';

export const ProjectCard = ({ project }) => {
  const [expandedFields, setExpandedFields] = useState({});
  const MAX_TEXT_LENGTH = 150;

  const statusConfig = {
    'Em Andamento': { bg: 'rgba(251, 191, 36, 0.2)', text: 'rgb(217, 119, 6)', border: 'rgba(251, 191, 36, 0.4)' },
    'Concluído': { bg: 'rgba(74, 222, 128, 0.2)', text: 'rgb(22, 163, 74)', border: 'rgba(74, 222, 128, 0.4)' },
    'Pausado': { bg: 'rgba(248, 113, 113, 0.2)', text: 'rgb(220, 38, 38)', border: 'rgba(248, 113, 113, 0.4)' },
    'Ativo': { bg: 'rgba(74, 222, 128, 0.2)', text: 'rgb(22, 163, 74)', border: 'rgba(74, 222, 128, 0.4)' },
    'Paralisado': { bg: 'rgba(148, 163, 184, 0.2)', text: 'rgb(71, 85, 105)', border: 'rgba(148, 163, 184, 0.4)' },
    'Entrega': { bg: 'rgba(96, 165, 250, 0.2)', text: 'rgb(37, 99, 235)', border: 'rgba(96, 165, 250, 0.4)' },
  };

  const status = statusConfig[project.status || project.fase] || statusConfig['Em Andamento'];

  const extractLinks = (text) => {
    if (!text || typeof text !== 'string') return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex);
    return urls;
  };

  const formatFieldName = (key) => {
    const fieldNames = {
      'numeroProjeto': 'Número do Projeto',
      'nomeProjeto': 'Nome do Projeto',
      'gerente': 'Gerente',
      'cliente': 'Cliente',
      'fase': 'Fase',
      'estado': 'Estado',
      'porcentagemConclusao': 'Conclusão',
      'dataInicio': 'Data de Início',
      'dataTerminoAprovada': 'Término Previsto',
      'statusReport': 'Status Report'
    };
    return fieldNames[key] || key.replace(/([A-Z])/g, ' $1').trim();
  };

  const formatValue = (key, value) => {
    if (value === null || value === undefined) return 'N/A';
    
    if (key === 'porcentagemConclusao') {
      return `${value}%`;
    }
    
    if (key === 'dataInicio' || key === 'dataTerminoAprovada') {
      return new Date(value).toLocaleDateString('pt-BR');
    }
    
    return value;
  };

  const toggleExpand = (key) => {
    setExpandedFields(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderTextWithLinks = (text, key) => {
    if (!text || typeof text !== 'string') return <span>N/A</span>;
    
    const links = extractLinks(text);
    const textWithoutLinks = links ? text.replace(/(https?:\/\/[^\s]+)/g, '').trim() : text;
    const isLong = textWithoutLinks.length > MAX_TEXT_LENGTH;
    const isExpanded = expandedFields[key];
    const displayText = isLong && !isExpanded 
      ? textWithoutLinks.substring(0, MAX_TEXT_LENGTH) + '...' 
      : textWithoutLinks;

    return (
      <div className="space-y-2">
        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgb(71, 85, 105)' }}>
          {displayText}
        </p>
        {isLong && (
          <button
            onClick={() => toggleExpand(key)}
            className="text-xs font-semibold hover:underline transition-all"
            style={{ color: 'rgb(37, 99, 235)' }}
          >
            {isExpanded ? '← Ver menos' : 'Ver mais →'}
          </button>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                style={{ 
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  color: 'rgb(37, 99, 235)',
                  border: '1px solid rgba(37, 99, 235, 0.3)'
                }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Link {idx + 1}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderProjectDetails = () => {
    const excludeKeys = ['numeroProjeto', 'nome', 'status', 'descricao', 'nomeProjeto'];
    const details = Object.entries(project).filter(([key]) => !excludeKeys.includes(key));
    
    if (details.length === 0) return null;

    return (
      <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(34, 43, 122, 0.1)' }}>
        <div className="space-y-4">
          {details.map(([key, value]) => (
            <div key={key} className="break-words">
              <p className="text-xs font-bold uppercase mb-2 flex items-center gap-2" style={{ color: 'rgb(34, 43, 122)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgb(34, 43, 122)' }}></span>
                {formatFieldName(key)}
              </p>
              {key === 'statusReport' ? (
                renderTextWithLinks(value, key)
              ) : (
                <p className="text-sm font-medium pl-3.5" style={{ color: 'rgb(71, 85, 105)' }}>
                  {formatValue(key, value)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="rounded-xl p-5 sm:p-6 transition-all w-full h-full flex flex-col"
      style={{ 
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 break-words" style={{ color: 'rgb(34, 43, 122)' }}>
            {project.nome || project.nomeProjeto || 'Sem nome'}
          </h3>
          <p className="text-xs sm:text-sm font-medium opacity-60 break-all" style={{ color: 'rgb(34, 43, 122)' }}>
            {project.numeroProjeto}
          </p>
        </div>
        <span 
          className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap self-start sm:self-auto"
          style={{ 
            backgroundColor: status.bg,
            color: status.text,
            border: `2px solid ${status.border}`
          }}
        >
          {project.status || project.fase || 'N/A'}
        </span>
      </div>
      
      {project.descricao && (
        <p className="text-sm sm:text-base leading-relaxed mb-4 break-words" style={{ color: 'rgb(71, 85, 105)' }}>
          {project.descricao}
        </p>
      )}

      {renderProjectDetails()}
    </div>
  );
};