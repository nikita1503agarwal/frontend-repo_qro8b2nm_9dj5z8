import { useMemo, useState } from 'react'

const PRESETS = [
  { key: 'sin', label: 'Gelombang Sinus (sin x)' },
  { key: 'parabola', label: 'Parabola (x^2)' },
  { key: 'line', label: 'Garis Lurus (x)' },
  { key: 'sqrt', label: 'Akar Kuadrat (sqrt x)' },
  { key: 'exp', label: 'Eksponensial (e^x)' },
]

export default function Visualisasi() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [mode, setMode] = useState('preset')
  const [expression, setExpression] = useState('sin(x)')
  const [preset, setPreset] = useState('sin')
  const [points, setPoints] = useState([])
  const [range, setRange] = useState({ min: -10, max: 10 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const width = 700
  const height = 400
  const padding = 40

  const fetchPoints = async () => {
    setLoading(true)
    setError(null)
    setPoints([])
    try {
      const payload = mode === 'custom'
        ? { mode: 'custom', expression, x_min: range.min, x_max: range.max, points: 400 }
        : { mode: 'preset', preset, x_min: range.min, x_max: range.max, points: 400 }
      const res = await fetch(`${baseUrl}/api/plot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Gagal membuat plot')
      setPoints(data.points)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  // compute scales
  const xVals = useMemo(() => points.map((p) => p[0]), [points])
  const yVals = useMemo(() => points.map((p) => p[1]), [points])
  const yMin = yVals.length ? Math.min(...yVals) : -1
  const yMax = yVals.length ? Math.max(...yVals) : 1

  const xScale = (x) => padding + ((x - range.min) / (range.max - range.min)) * (width - 2 * padding)
  const yScale = (y) => height - padding - ((y - yMin) / (yMax - yMin || 1)) * (height - 2 * padding)

  const pathD = useMemo(() => {
    if (!points.length) return ''
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p[0])} ${yScale(p[1])}`).join(' ')
  }, [points, yMin, yMax, range])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Visualisasi Grafik 2D</h2>
      <p className="text-gray-600 mb-6">Plot fungsi dalam mode kustom atau pilih preset fungsi, lalu tekan "Plot Fungsi".</p>

      <div className="bg-white border rounded-lg p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <label className="flex items-center gap-2">
            <input type="radio" name="mode" value="preset" checked={mode==='preset'} onChange={() => setMode('preset')} />
            <span>Preset</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="mode" value="custom" checked={mode==='custom'} onChange={() => setMode('custom')} />
            <span>Fungsi Kustom</span>
          </label>

          {mode === 'preset' ? (
            <select value={preset} onChange={(e) => setPreset(e.target.value)} className="border rounded px-3 py-2">
              {PRESETS.map((p) => (
                <option key={p.key} value={p.key}>{p.label}</option>
              ))}
            </select>
          ) : (
            <input value={expression} onChange={(e) => setExpression(e.target.value)} className="border rounded px-3 py-2 w-80" placeholder="Misal: sin(x) atau x**2" />
          )}

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rentang x:</span>
            <input type="number" step="1" value={range.min} onChange={(e)=>setRange(r=>({...r, min: Number(e.target.value)}))} className="w-24 border rounded px-2 py-1" />
            <span>-</span>
            <input type="number" step="1" value={range.max} onChange={(e)=>setRange(r=>({...r, max: Number(e.target.value)}))} className="w-24 border rounded px-2 py-1" />
          </div>

          <button onClick={fetchPoints} disabled={loading} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2 rounded">
            {loading ? 'Memproses...' : 'Plot Fungsi'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <svg width={width} height={height} className="bg-gray-50 border rounded">
            {/* axes */}
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#94a3b8" />
            <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#94a3b8" />

            {/* ticks */}
            {[...Array(11)].map((_, i) => {
              const x = range.min + (i/10) * (range.max - range.min)
              const xx = xScale(x)
              return (
                <g key={i}>
                  <line x1={xx} y1={height - padding} x2={xx} y2={height - padding + 6} stroke="#94a3b8" />
                  <text x={xx} y={height - padding + 18} textAnchor="middle" fontSize="10" fill="#64748b">{x.toFixed(1)}</text>
                </g>
              )
            })}

            {yVals.length > 0 && [...Array(6)].map((_, i) => {
              const y = yMin + (i/5) * (yMax - yMin)
              const yy = yScale(y)
              return (
                <g key={i}>
                  <line x1={padding-6} y1={yy} x2={padding} y2={yy} stroke="#94a3b8" />
                  <text x={padding-8} y={yy+3} textAnchor="end" fontSize="10" fill="#64748b">{y.toFixed(1)}</text>
                </g>
              )
            })}

            {/* curve */}
            {points.length > 0 && (
              <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2" />
            )}

            {/* origin cross */}
            {(0>=range.min && 0<=range.max && yMin<0 && yMax>0) && (
              <>
                <line x1={xScale(0)} y1={padding} x2={xScale(0)} y2={height - padding} stroke="#cbd5e1" strokeDasharray="4 4" />
                <line x1={padding} y1={yScale(0)} x2={width - padding} y2={yScale(0)} stroke="#cbd5e1" strokeDasharray="4 4" />
              </>
            )}
          </svg>
        </div>

        {error && <div className="text-red-600 bg-red-50 border border-red-200 rounded p-3">{error}</div>}
        {!error && points.length === 0 && <p className="text-sm text-gray-600">Contoh grafik: pilih preset Gelombang Sinus dan klik Plot Fungsi.</p>}
      </div>
    </section>
  )
}
