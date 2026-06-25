import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import NotFound from './pages/NotFound'
import PontoTuristico from './components/pontoTuristico/PontoTuristico'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro/:id" element={<Cadastro />} />
        <Route path="/detalhe/:id" element={<PontoTuristico />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App