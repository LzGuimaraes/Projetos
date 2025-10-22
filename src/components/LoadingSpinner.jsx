export const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4 animate-fadeIn text-center">
    <div className="relative mb-6">
      <div 
        className="w-16 h-16 sm:w-20 sm:h-20 border-4 rounded-full animate-spin mx-auto"
        style={{ 
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderTopColor: 'white'
        }}
      ></div>
      <div 
        className="w-8 h-8 sm:w-10 sm:h-10 border-3 rounded-full animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          borderColor: 'rgba(255, 255, 255, 0.25)',
          borderBottomColor: 'white',
          animationDirection: 'reverse',
          animationDuration: '0.8s'
        }}
      ></div>
    </div>

    <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
      Carregando projetos...
    </h3>

    <p className="text-xs sm:text-sm text-white/70">
      Isso pode levar alguns instantes
    </p>
  </div>
);
