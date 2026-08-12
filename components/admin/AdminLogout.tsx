export default function AdminLogout() {
  return (
    <form
      action="/api/admin/logout"
      method="POST"
    >
      <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
        Déconnexion
      </button>
    </form>
  );
}
