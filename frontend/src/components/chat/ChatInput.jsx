import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ChatInput({ onSend, loading }) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px'
    }
  }, [message])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim() || loading) return
    onSend(message)
    setMessage('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="glass rounded-2xl p-4">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={loading}
          rows={1}
          className={cn(
            'w-full bg-transparent text-white placeholder-gray-500 resize-none',
            'focus:outline-none text-sm',
            'disabled:opacity-50'
          )}
        />
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <span className="text-xs text-gray-600">Enter to send, Shift+Enter for new line</span>
          <button
            type="submit"
            disabled={!message.trim() || loading}
            className={cn(
              'p-2 rounded-xl transition-all duration-200',
              message.trim() && !loading
                ? 'bg-accent-primary text-white hover:bg-accent-secondary'
                : 'bg-white/5 text-gray-500 cursor-not-allowed'
            )}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </form>
  )
}