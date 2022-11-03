'use client'

import React, { FC } from 'react'
import { forwardRef } from 'react'
import { HTMLInputTypeAttribute } from 'react'

import clsx from 'clsx'

type InputProps = {
  className?: string
  placeholder?: string

  required?: boolean

  type?: HTMLInputTypeAttribute | undefined
  onEnter?: (message: string) => void
}

const Input: FC<InputProps> = forwardRef(
  ({ className, onEnter, placeholder, required, type }, ref?: any) => (
    <input
      ref={ref}
      type={type}
      className={clsx(
        'border text-sm rounded-lg block w-full py-2.5 px-4 bg-gray-700 border-gray-600 placeholder-gray-300 text-white focus:ring-primary-500 focus:border-primary-500 outline-none',
        className
      )}
      placeholder={placeholder}
      required={required}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          onEnter && onEnter(e.currentTarget.value)
        }
      }}
    />
  )
)

export default Input
