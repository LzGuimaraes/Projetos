export const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen w-full px-4" style={{ backgroundColor: 'rgb(34, 43, 122)' }}>
    <div className="text-center">
      <div 
        className="w-16 h-16 sm:w-20 sm:h-20 border-4 rounded-full animate-spin mx-auto mb-4 sm:mb-6"
        style={{ 
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderTopColor: 'rgb(255, 255, 255)'
        }}
      ></div>
      <p className="text-lg sm:text-xl font-semibold" style={{ color: 'rgb(255, 255, 255)' }}>
        Carregando projetos...
      </p>
    </div>
  </div>
);
