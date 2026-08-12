export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Administration CNI FIND
        </h1>

        <form
          action="/api/admin/login"
          method="POST"
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg"
          >
            Se connecter
          </button>
        </form>

      </div>

    </div>
  );
}
