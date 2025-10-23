import { useState } from 'react';

export const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);

  // 🎨 Cores por status
  const statusConfig = {
    'Trabalho Em Andamento': { bg: 'rgba(251, 191, 36, 0.2)', text: 'rgb(217, 119, 6)', border: 'rgba(251, 191, 36, 0.4)' },
    'Concluído': { bg: 'rgba(74, 222, 128, 0.2)', text: 'rgb(22, 163, 74)', border: 'rgba(74, 222, 128, 0.4)' },
    'Cancelado': { bg: 'rgba(248, 113, 113, 0.2)', text: 'rgb(220, 38, 38)', border: 'rgba(248, 113, 113, 0.4)' },
    'Aberto': { bg: 'rgba(74, 222, 128, 0.2)', text: 'rgb(22, 163, 74)', border: 'rgba(74, 222, 128, 0.4)' },
    'Paralisado': { bg: 'rgba(148, 163, 184, 0.2)', text: 'rgb(71, 85, 105)', border: 'rgba(148, 163, 184, 0.4)' },
    'Pendente': { bg: 'rgba(96, 165, 250, 0.2)', text: 'rgb(37, 99, 235)', border: 'rgba(96, 165, 250, 0.4)' },
  };

  const status = statusConfig[project.status || project.fase] || statusConfig['Trabalho Em Andamento'];

  // 🧩 Nomes legíveis
  const fieldNames = {
    gerente: 'Gerente',
    cliente: 'Cliente',
    fase: 'Fase',
    estado: 'Estado',
    porcentagemConclusao: 'Conclusão',
    dataInicio: 'Data de Início',
    dataTerminoAprovada: 'Término Previsto',
    statusReport: 'Status Report',
  };

  // 🧠 Formatação de valores
  const formatValue = (key, value) => {
    if (value === null || value === undefined) return 'N/A';
    if (key === 'porcentagemConclusao') return `${value}%`;
    if (key === 'dataInicio' || key === 'dataTerminoAprovada') {
      try {
        return new Date(value).toLocaleDateString('pt-BR');
      } catch {
        return value;
      }
    }
    return value;
  };

  // 🧩 Lista de detalhes (exclui nome e cliente que já aparecem)
  const details = Object.entries(project).filter(([key]) =>
    ['gerente', 'fase', 'estado', 'porcentagemConclusao', 'dataInicio', 'dataTerminoAprovada', 'statusReport'].includes(key)
  );

  return (
    <div className="rounded-xl p-5 sm:p-6 transition-all w-full flex flex-col bg-white shadow-md hover:shadow-xl hover:-translate-y-1 duration-300 overflow-hidden">
      {/* Cabeçalho */}
      <div className="flex justify-between items-start mb-3 gap-3">
        <div className="flex flex-col min-w-0 flex-1">
          <h3 className="text-xl sm:text-2xl font-bold text-[rgb(34,43,122)] break-words">
            {project.nome || project.nomeProjeto || 'Sem nome'}
          </h3>
          <p className="text-sm text-gray-600 mt-1 break-words">
            <span className="font-semibold">Cliente:</span> {project.cliente || 'Não informado'}
          </p>
        </div>

        <span
          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap flex-shrink-0"
          style={{
            backgroundColor: status.bg,
            color: status.text,
            border: `2px solid ${status.border}`,
          }}
        >
          {project.status || project.fase || 'N/A'}
        </span>
      </div>

      {/* Ver mais */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-sm font-semibold text-[rgb(37,99,235)] hover:underline self-start transition-colors"
      >
        {expanded ? '▲ Ver menos' : '▼ Ver mais'}
      </button>

      {/* Detalhes expansíveis com animação */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-4 pt-4 border-t border-[rgba(34,43,122,0.1)] space-y-3">
          {details.map(([key, value]) => (
            <div key={key} className="min-w-0">
              <p className="text-xs font-bold uppercase mb-1 text-[rgb(34,43,122)]">
                {fieldNames[key] || key}
              </p>
              <p className="text-sm text-gray-700 pl-2 break-words">{formatValue(key, value)}</p>
            </div>
          ))}

          {project.descricao && (
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase mb-1 text-[rgb(34,43,122)]">Descrição</p>
              <p className="text-sm text-gray-700 pl-2 whitespace-pre-line break-words">{project.descricao}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};