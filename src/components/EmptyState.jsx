export const EmptyState = ({ message }) => (
  <div 
    className="rounded-xl p-10 sm:p-12 md:p-16 text-center w-full"
    style={{ 
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}
  >
    <div 
      className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center"
      style={{ backgroundColor: 'rgba(34, 43, 122, 0.1)' }}
    >
      <svg className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: 'rgb(34, 43, 122)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    </div>
    <p className="text-xl sm:text-2xl font-semibold break-words" style={{ color: 'rgb(34, 43, 122)' }}>
      {message}
    </p>
  </div>
);