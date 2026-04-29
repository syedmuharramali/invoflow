const ErrorAlert = ({ message }) => (
  message ? (
    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
      {message}
    </div>
  ) : null
);
export default ErrorAlert;