import { motion } from 'framer-motion'
import { Sparkles, Heart, Code } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-3xl font-bold gradient-text mb-4">AMK AI</h1>
        
        <p className="text-gray-400 mb-6">
          A modern AI-powered coding assistant built with precision and care.
          Helping developers build faster, think deeper, and ship better code.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Code className="w-4 h-4" />
          <span>Built with React, Firebase, and OpenRouter</span>
        </div>

        <div className="mt-8 flex items-center justify-center gap-1 text-gray-400">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500" />
          <span>for developers</span>
        </div>
      </motion.div>
    </div>
  )
}