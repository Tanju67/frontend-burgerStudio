import Button from "../button/Button";

function IsError() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center rounded-2xl border border-red-100 bg-white/50 p-8 text-center shadow-xl backdrop-blur-md">
        <div className="mb-4 text-5xl text-red-500">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800">
          Something went wrong
        </h2>
        <p className="mt-2 max-w-xs text-gray-500">
          We're having trouble connecting to our servers.
        </p>
        <Button
          type="button"
          onClick={() => window.location.reload()}
          className="bg-main-btn mt-6 rounded-full px-8 py-2 shadow-lg transition-transform hover:scale-105"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}

export default IsError;
