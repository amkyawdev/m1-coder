import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Button = forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'default', 
  disabled,
  children,
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white hover:shadow-lg hover:shadow-accent-primary/30',
    outline: 'bg-white/5 border border-white/10 text-white hover:bg-white/10',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
  }

  const sizes = {
    default: 'px-6 py-3',
    sm: 'px-4 py-2 text-sm',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        'rounded-xl font-medium transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button