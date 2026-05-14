import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Innovation from './pages/Innovation'
import Games from './pages/Games'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProjects from './pages/admin/Projects'
import AdminMessages from './pages/admin/Messages'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" /></div>
  return user ? children : <Navigate to="/admin/login" replace />
}

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/servicios" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
        <Route path="/innovacion" element={<PublicLayout><Innovation /></PublicLayout>} />
        <Route path="/videojuegos" element={<PublicLayout><Games /></PublicLayout>} />
        <Route path="/contacto" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/privacidad" element={<PublicLayout><Privacy /></PublicLayout>} />
        <Route path="/terminos" element={<PublicLayout><Terms /></PublicLayout>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/proyectos" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
        <Route path="/admin/mensajes" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
