'use client'

import React, { FC } from 'react'

import clsx from 'clsx'

type ButtonProps = {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  onClick,
  type = 'button',
}) => {
  if (variant === 'primary') {
    return (
      <button
        onClick={onClick}
        type={type}
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
        onClick={onClick}
        type={type}
        className={clsx(
          'px-4 py-2 bg-transparent outline-none rounded-lg text-white active:shadow-none  focus:ring-2 focus:ring-primary-400  disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-300 border border-primary-500',
          className
        )}
      >
        {children}
      </button>
    )
  }
}

export default Button
