export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 grid md:grid-cols-2 gap-4">
        <p>© {new Date().getFullYear()} KalkulusWeb. Semua hak cipta dilindungi.</p>
        <div className="md:text-right">
          <p className="font-semibold">Tentang Penulis</p>
          <p>Nama: Tim KalkulusWeb</p>
          <p>Jenjang: S1 Teknik Informatika</p>
          <p>Email: dev@kalkulusweb.app</p>
        </div>
      </div>
    </footer>
  )
}
