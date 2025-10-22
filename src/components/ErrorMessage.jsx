export const ErrorMessage = ({ message }) => (
  <div className="flex items-center justify-center min-h-screen w-full px-4" style={{ backgroundColor: 'rgb(34, 43, 122)' }}>
    <div 
      className="rounded-xl p-6 sm:p-8 max-w-md w-full"
      style={{ 
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
      }}
    >
      <div className="flex items-center mb-4">
        <div 
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0"
          style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: 'rgb(220, 38, 38)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'rgb(220, 38, 38)' }}>
          Erro
        </h3>
      </div>
      <p className="text-base sm:text-lg leading-relaxed break-words" style={{ color: 'rgb(71, 85, 105)' }}>
        {message}
      </p>
    </div>
  </div>
);