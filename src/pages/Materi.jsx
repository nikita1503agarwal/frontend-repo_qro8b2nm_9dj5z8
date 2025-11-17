const topics = [
  {
    title: 'Limit',
    body: 'Limit mempelajari perilaku fungsi ketika variabel mendekati suatu nilai tertentu. Rumus penting: limit x→a f(x). Contoh: limit x->0 sin x / x = 1.'
  },
  {
    title: 'Turunan',
    body: 'Turunan menyatakan laju perubahan sesaat. Notasi: f\' (x) = df/dx. Aturan umum: turunan x^n = n x^{n-1}, turunan sin x = cos x.'
  },
  {
    title: 'Integral',
    body: 'Integral sebagai luas daerah di bawah kurva atau antiturunan. ∫ x^n dx = x^{n+1}/(n+1) + C, ∫ sin x dx = -cos x + C.'
  },
  {
    title: 'Logaritma',
    body: 'Logaritma adalah invers dari eksponensial. Aturan: log(ab)=log a + log b, log(a^b)=b log a. ln x adalah log natural.'
  },
  {
    title: 'Aplikasi Turunan',
    body: 'Mencakup optimasi, kecepatan sesaat, kemiringan garis singgung, uji maksimum/minimum memakai turunan pertama dan kedua.'
  },
  {
    title: 'Aplikasi Integral',
    body: 'Mencakup luas, volume dengan metode cakram/cincin, panjang lengkung, kerja usaha. Gunakan integral tentu.'
  },
  {
    title: 'Deret Tak Hingga',
    body: 'Deret dan konvergensi. Uji konvergensi: perbandingan, rasio, integral. Representasi fungsi dengan deret Taylor/Maclaurin.'
  },
  {
    title: 'Fungsi Multivariat',
    body: 'Fungsi banyak variabel, gradien, level curve, ekstrem lokal, dan Lagrange multiplier.'
  },
  {
    title: 'Parsial',
    body: 'Turunan parsial ∂f/∂x, ∂f/∂y, integral lipat dua/tiga, dan perubahan variabel.'
  },
]

export default function Materi() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Materi Kalkulus</h2>
      <p className="text-gray-600 mb-8">Ringkasan 9 topik utama, lengkap dengan penjelasan singkat dan contoh rumus.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {topics.map((t) => (
          <div key={t.title} className="bg-white rounded-lg border p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">{t.title}</h3>
            <p className="mt-2 text-gray-700 whitespace-pre-line">{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
