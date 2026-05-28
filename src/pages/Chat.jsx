import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Settings, LogOut, Sparkles, Plus, Trash2, Menu, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useAPIKeys } from '@/context/APIKeyContext'
import { ChatBubble, ChatInput, ModelSelector, FileUpload } from '@/components/chat'
import { Button } from '@/components/ui'
import Switch from '@/components/ui/Switch'

const AI_MODELS = [
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
  { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
  { id: 'google/gemini-pro-1.5', name: 'Gemini 1.5 Pro', provider: 'Google' },
]

export default function Chat() {
  const navigate = useNavigate()
  const { user, logout, getIdToken } = useAuth()
  const { getActiveKey } = useAPIKeys()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id)
  const [deepThinking, setDeepThinking] = useState(false)
  const [files, setFiles] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (message) => {
    if (!message.trim()) return

    const userMessage = { id: Date.now(), role: 'user', content: message, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      const idToken = await getIdToken()
      const apiKey = getActiveKey()
      const apiUrl = import.meta.env.VITE_API_URL || ''

      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          message,
          model: selectedModel,
          deep_thinking: deepThinking,
          files: files.map(f => ({ name: f.name, type: f.type })),
        }),
      })

      const data = await response.json().catch(() => ({}))

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.message || data.error || 'Sorry, I could not get a response.',
        model: data.model || selectedModel,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        isError: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    }

    setLoading(false)
    setFiles([])
  }

  const handleLogout = async () => {
    await logout()
    navigate('/auth')
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-dark-800 border-r border-white/10 
        transform transition-transform duration-300 lg:translate-x-0
        ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold gradient-text">AMK AI</span>
          </div>

          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4">
            <Plus className="w-4 h-4" />
            New Chat
          </button>

          <div className="flex-1 overflow-y-auto space-y-2">
            {[1, 2, 3].map((i) => (
              <button key={i} className="w-full text-left p-3 rounded-lg hover:bg-white/5 text-sm text-gray-400 truncate">
                Chat conversation {i}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-white/10">
            <button
              onClick={() => navigate('/settings/keys')}
              className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-white/5 text-sm text-gray-400"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-white/5 text-sm text-gray-400"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg"
            >
              {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <ModelSelector selected={selectedModel} onChange={setSelectedModel} />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Deep Thinking</span>
              <Switch checked={deepThinking} onChange={setDeepThinking} />
            </div>
          </div>
        </header>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Start a conversation</h2>
                <p className="text-gray-400 max-w-md">
                  Ask me anything about coding, or enable Deep Thinking for complex analysis.
                </p>
              </motion.div>
            )}

            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-white/10">
          {files.length > 0 && (
            <FileUpload files={files} setFiles={setFiles} />
          )}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFileUpload(!showFileUpload)}
              className="p-3 glass rounded-xl hover:bg-white/5"
            >
              <Plus className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <ChatInput onSend={handleSend} loading={loading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}