import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">KalkulusWeb</h1>
            <p className="mt-4 text-gray-600">Belajar kalkulus lebih mudah melalui materi ringkas, kalkulator turunan & integral, serta visualisasi grafik interaktif.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/materi" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md">Lihat Materi</Link>
              <Link to="/kalkulator" className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-md">Coba Kalkulator</Link>
            </div>
          </div>
          <div className="bg-white/70 border rounded-xl p-6 shadow-sm">
            <ul className="space-y-3 text-gray-700">
              <li>• Arsitektur multi-halaman: Home, Materi, Kalkulator, Visualisasi</li>
              <li>• Materi 9 topik: Limit, Turunan, Integral, Logaritma, Aplikasi Turunan, Aplikasi Integral, Deret Tak Hingga, Fungsi Multivariat, Parsial</li>
              <li>• Kalkulator: pilih Turunan atau Integral</li>
              <li>• Visualisasi 2D: fungsi kustom atau preset</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
