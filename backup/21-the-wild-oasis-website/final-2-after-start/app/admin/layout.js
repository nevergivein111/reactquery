// app/admin/layout.js
export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gray-800 text-white p-4">Admin Panel</header>
        <div className="flex">
          <aside className="w-64 bg-gray-100 p-4">Sidebar</aside>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
