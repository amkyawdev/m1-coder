import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

const AI_MODELS = [
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', color: '#ff6b35' },
  { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'OpenAI', color: '#10a37f' },
  { id: 'google/gemini-pro-1.5', name: 'Gemini 1.5 Pro', provider: 'Google', color: '#4285f4' },
  { id: 'deepseek/deepseek-coder', name: 'DeepSeek Coder', provider: 'DeepSeek', color: '#68a063' },
]

export default function ModelSelector({ selected, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentModel = AI_MODELS.find(m => m.id === selected) || AI_MODELS[0]

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 glass rounded-xl text-sm hover:bg-white/10 transition-colors"
      >
        <div 
          className="w-2 h-2 rounded-full" 
          style={{ backgroundColor: currentModel.color }}
        />
        <span>{currentModel.name}</span>
        <ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-64 glass rounded-xl overflow-hidden z-50"
          >
            {AI_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onChange(model.id)
                  setOpen(false)
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors',
                  selected === model.id && 'bg-white/5'
                )}
              >
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: model.color }}
                />
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">{model.name}</div>
                  <div className="text-xs text-gray-500">{model.provider}</div>
                </div>
                {selected === model.id && (
                  <Check className="w-4 h-4 text-accent-primary" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}