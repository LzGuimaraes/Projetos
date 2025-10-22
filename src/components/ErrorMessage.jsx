export const ErrorMessage = ({ message }) => (
  <div className="flex items-center justify-center min-h-[70vh] w-full px-4 sm:px-6 md:px-8 animate-fadeIn">
    <div 
      className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center"
    >
      <div 
        className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full mb-5 bg-red-100 animate-pulse"
      >
        <svg className="w-12 h-12 sm:w-14 sm:h-14 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-red-600 mb-3">
        Ops! Encontramos um problema
      </h3>

      <p className="text-sm sm:text-base text-gray-600 mb-4">
        {message}
      </p>

      <p className="text-xs sm:text-sm text-gray-400">
        Tente novamente mais tarde ou contate o suporte se o problema persistir.
      </p>
    </div>
  </div>
);
