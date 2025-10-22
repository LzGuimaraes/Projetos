export const EmptyState = ({ message }) => (
  <div className="flex items-center justify-center min-h-[70vh] w-full px-4 sm:px-6 md:px-8 animate-fadeIn">
    <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center text-center">
      <div 
        className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full mb-5"
        style={{ backgroundColor: 'rgba(34, 43, 122, 0.1)' }}
      >
        <svg className="w-12 h-12 sm:w-14 sm:h-14 text-[rgb(34,43,122)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>

      <h3 className="text-lg sm:text-xl font-semibold text-[rgb(34,43,122)] mb-2">
        {message}
      </h3>

      <p className="text-sm sm:text-base text-gray-500">
        Tente refinar sua busca ou verifique se a API está disponível.
      </p>
    </div>
  </div>
);
