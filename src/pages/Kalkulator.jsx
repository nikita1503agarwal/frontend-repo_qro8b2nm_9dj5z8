import { useState } from 'react'

const EXAMPLES = [
  'x**2 + 3*x - 5',
  'sin(x)',
  'ln(x)',
]

export default function Kalkulator() {
  const [expression, setExpression] = useState('x**2 + 3*x - 5')
  const [operation, setOperation] = useState('derivative')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch(`${baseUrl}/api/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression, operation })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Gagal menghitung')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Kalkulator Kalkulus</h2>
      <p className="text-gray-600 mb-6">Masukkan fungsi dan pilih operasi untuk menghitung Turunan atau Integral.</p>

      <div className="mb-4">
        <p className="text-sm text-gray-700">Contoh input:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {EXAMPLES.map((ex) => (
            <button key={ex} onClick={() => setExpression(ex)} className="text-xs bg-gray-100 hover:bg-gray-200 border px-2 py-1 rounded">
              {ex}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit} className="bg-white border rounded-lg p-5 shadow-sm space-y-4">
        <input
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Misal: x**2 + 3*x - 5 atau sin(x)"
          className="w-full border rounded px-3 py-2"
        />

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="op" value="derivative" checked={operation === 'derivative'} onChange={() => setOperation('derivative')} />
            <span>Turunan</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="op" value="integral" checked={operation === 'integral'} onChange={() => setOperation('integral')} />
            <span>Integral</span>
          </label>
        </div>

        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2 rounded">
          {loading ? 'Menghitung...' : 'Hitung'}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-600 bg-red-50 border border-red-200 rounded p-3">{error}</div>
      )}

      {result && (
        <div className="mt-6 bg-white border rounded-lg p-5 shadow-sm">
          <p className="text-gray-700"><span className="font-semibold">Input:</span> {result.input}</p>
          <p className="text-gray-700"><span className="font-semibold">Operasi:</span> {result.operation}</p>
          <p className="text-gray-900 text-lg mt-2"><span className="font-semibold">Hasil:</span> {result.result}</p>
        </div>
      )}
    </section>
  )
}
