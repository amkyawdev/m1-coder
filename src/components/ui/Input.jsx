import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Input = forwardRef(({ 
  className, 
  type = 'text', 
  icon: Icon,
  disabled,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        type={type}
        disabled={disabled}
        ref={ref}
        className={cn(
          'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3',
          'text-white placeholder-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-all duration-200',
          Icon && 'pl-10',
          className
        )}
        {...props}
      />
    </div>
  )
})

Input.displayName = 'Input'

export default Input