import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Materi from './pages/Materi'
import Kalkulator from './pages/Kalkulator'
import Visualisasi from './pages/Visualisasi'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materi" element={<Materi />} />
        <Route path="/kalkulator" element={<Kalkulator />} />
        <Route path="/visualisasi" element={<Visualisasi />} />
      </Routes>
    </Layout>
  )
}

export default App
