import { useState } from 'react'
import { motion } from 'framer-motion'
import { Key, Eye, EyeOff, Save, Check } from 'lucide-react'
import { useAPIKeys } from '@/context/APIKeyContext'
import { Button, Input } from '@/components/ui'

const PROVIDERS = [
  { id: 'openrouter', name: 'OpenRouter', placeholder: 'sk-or-v1-...' },
  { id: 'openai', name: 'OpenAI', placeholder: 'sk-...' },
  { id: 'anthropic', name: 'Anthropic', placeholder: 'sk-ant-...' },
  { id: 'google', name: 'Google AI', placeholder: 'AIza...' },
]

export default function ApiKeyInput() {
  const { apiKeys, updateKey } = useAPIKeys()
  const [showKey, setShowKey] = useState({})
  const [saved, setSaved] = useState({})

  const toggleShow = (provider) => {
    setShowKey(prev => ({ ...prev, [provider]: !prev[provider] }))
  }

  const handleSave = (provider) => {
    setSaved(prev => ({ ...prev, [provider]: true }))
    setTimeout(() => {
      setSaved(prev => ({ ...prev, [provider]: false }))
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center">
            <Key className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">API Keys</h1>
            <p className="text-gray-400 text-sm">Configure your AI provider keys</p>
          </div>
        </div>

        <div className="space-y-4">
          {PROVIDERS.map((provider) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-medium">{provider.name}</label>
                {saved[provider.id] && (
                  <span className="flex items-center gap-1 text-green-400 text-sm">
                    <Check className="w-4 h-4" />
                    Saved
                  </span>
                )}
              </div>

              <div className="relative">
                <Input
                  type={showKey[provider.id] ? 'text' : 'password'}
                  placeholder={provider.placeholder}
                  value={apiKeys[provider.id] || ''}
                  onChange={(e) => updateKey(provider.id, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => toggleShow(provider.id)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showKey[provider.id] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="mt-4 flex justify-end">
                <Button size="sm" onClick={() => handleSave(provider.id)}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-accent-primary/10 border border-accent-primary/20 rounded-xl">
          <p className="text-sm text-gray-300">
            <strong className="text-accent-primary">Note:</strong> API keys are stored locally in your browser. 
            They are never sent to our servers. Make sure to use valid keys from each provider.
          </p>
        </div>
      </div>
    </div>
  )
}