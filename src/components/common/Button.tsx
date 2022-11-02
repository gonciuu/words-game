import clsx from 'clsx'
import React, { FC } from 'react'

type ButtonProps = {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
}

const Button: FC<ButtonProps> = ({ children, className, variant = 'primary' }) => {
  if (variant === 'primary') {
    return (
      <button
        className={clsx(
          'px-4 py-2 bg-primary-500 outline-none rounded-lg text-white active:shadow-none hover:bg-primary-600 focus:bg-primary-600 focus:ring-2 focus:ring-primary-400  disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-300',
          className
        )}
      >
        {children}
      </button>
    )
  } else {
    return (
      <button
        className={clsx(
          'px-4 py-2 bg-gray-800 outline-none rounded-lg text-white active:shadow-none hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:ring-primary-400  disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-300 border border-primary-500',
          className
        )}
      >
        {children}
      </button>
    )
  }
}

export default Button
