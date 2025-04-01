export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Unauthorized Access</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Please make sure you are logged in.</p>
        </div>
      </div>
    </div>
  );
}
