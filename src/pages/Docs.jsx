import { motion } from 'framer-motion'
import { BookOpen, Zap, Code, Key } from 'lucide-react'

export default function Docs() {
  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Documentation</h1>
            <p className="text-gray-400 text-sm">Learn how to use AMK AI</p>
          </div>
        </div>

        <div className="space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 rounded-2xl"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-accent-primary" />
              Getting Started
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>1. Sign up or log in to your account using email or Google.</p>
              <p>2. Navigate to Settings to add your API keys.</p>
              <p>3. Start chatting with the AI from the Chat page.</p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-6 rounded-2xl"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-accent-primary" />
              API Keys
            </h2>
            <p className="text-gray-300 mb-4">
              To use the AI features, you need to provide an API key from one of the supported providers:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li><strong className="text-white">OpenRouter</strong> - Recommended, supports multiple models</li>
              <li><strong className="text-white">OpenAI</strong> - GPT-4 and GPT-3.5 models</li>
              <li><strong className="text-white">Anthropic</strong> - Claude models</li>
              <li><strong className="text-white">Google AI</strong> - Gemini models</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-2xl"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent-primary" />
              Deep Thinking Mode
            </h2>
            <p className="text-gray-300">
              Enable Deep Thinking mode for complex tasks that require detailed reasoning. 
              This uses more advanced reasoning capabilities of the AI model, providing 
              more thorough and analytical responses.
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  )
}