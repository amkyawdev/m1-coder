import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import GetStarted from '@/pages/GetStarted'
import Auth from '@/pages/Auth'
import Chat from '@/pages/Chat'
import ApiKeyInput from '@/pages/ApiKeyInput'
import Docs from '@/pages/Docs'
import About from '@/pages/About'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
  
  return user ? children : <Navigate to="/auth" />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/get-started" />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/settings/keys" element={<ProtectedRoute><ApiKeyInput /></ProtectedRoute>} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}