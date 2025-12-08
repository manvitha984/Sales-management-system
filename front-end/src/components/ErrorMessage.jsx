
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="card">
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Error Loading Data
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {message || "Something went wrong. Please try again."}
        </p>
        {onRetry && (
          <div className="mt-6">
            <button onClick={onRetry} className="btn-primary">
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;