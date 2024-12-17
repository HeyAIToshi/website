import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Admin from './pages/admin/Index'
import CakeDetails from './pages/CakeDetails'
import { Toaster } from "@/components/ui/toaster"
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cake/:id" element={<CakeDetails />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <Toaster />
    </Router>
  )
}

export default App;
