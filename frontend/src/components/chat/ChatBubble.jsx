import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function ChatBubble({ message, onCopy }) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'
  const isError = message.isError

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    onCopy?.(message.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex gap-3 p-4 rounded-2xl',
        isUser ? 'bg-accent-primary/10' : 'bg-white/5',
        isError && 'bg-red-500/10 border border-red-500/20'
      )}
    >
      <div className={cn(
        'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium',
        isUser ? 'bg-accent-primary text-white' : 'bg-accent-secondary text-white'
      )}>
        {isUser ? 'U' : 'AI'}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {isUser ? 'You' : message.model || 'AI Assistant'}
          </span>
          <button
            onClick={handleCopy}
            className="text-gray-500 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <p className={cn('text-sm leading-relaxed', isError && 'text-red-400')}>
          {message.content}
        </p>
        {message.timestamp && (
          <span className="text-xs text-gray-600">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>
    </motion.div>
  )
}