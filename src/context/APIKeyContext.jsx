import { createContext, useContext, useState, useEffect } from 'react'

const APIKeyContext = createContext(null)

const DEFAULT_KEYS = {
  openrouter: '',
  openai: '',
  anthropic: '',
  google: '',
}

export function APIKeyProvider({ children }) {
  const [apiKeys, setApiKeys] = useState(DEFAULT_KEYS)
  const [activeProvider, setActiveProvider] = useState('openrouter')

  useEffect(() => {
    const saved = localStorage.getItem('api_keys')
    if (saved) {
      try {
        setApiKeys(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse API keys:', e)
      }
    }
  }, [])

  const updateKey = (provider, key) => {
    const updated = { ...apiKeys, [provider]: key }
    setApiKeys(updated)
    localStorage.setItem('api_keys', JSON.stringify(updated))
  }

  const getActiveKey = () => {
    return apiKeys[activeProvider] || ''
  }

  const hasAnyKey = () => {
    return Object.values(apiKeys).some(key => key && key.trim() !== '')
  }

  return (
    <APIKeyContext.Provider value={{
      apiKeys,
      activeProvider,
      setActiveProvider,
      updateKey,
      getActiveKey,
      hasAnyKey,
    }}>
      {children}
    </APIKeyContext.Provider>
  )
}

export function useAPIKeys() {
  const context = useContext(APIKeyContext)
  if (!context) {
    throw new Error('useAPIKeys must be used within an APIKeyProvider')
  }
  return context
}