import React, { useState } from 'react';

export const SearchBar = ({ onSearch, loading }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue.trim());
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <div className="mb-6 sm:mb-8 w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Buscar por número do projeto..."
          className="w-full sm:flex-1 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg focus:outline-none focus:ring-4 transition-all text-base sm:text-lg"
          style={{ 
            backgroundColor: 'rgb(255, 255, 255)',
            color: 'rgb(34, 43, 122)',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          disabled={loading}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
        />
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 sm:flex-none px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
            style={{ 
              backgroundColor: 'rgb(255, 255, 255)',
              color: 'rgb(34, 43, 122)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
          <button
            onClick={handleClear}
            disabled={loading}
            className="flex-1 sm:flex-none px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'rgb(255, 255, 255)',
              border: '2px solid rgba(255, 255, 255, 0.4)'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
};
