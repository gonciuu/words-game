/* eslint-disable react/display-name */
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
  onChange?: (message: string) => void
  defaultValue?: string
}

const Input: FC<InputProps> = forwardRef(
  ({ className, onEnter, placeholder, required, type, onChange, defaultValue }, ref?: any) => (
    <input
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ref={ref}
      type={type}
      className={clsx(
        'border text-sm rounded-lg block w-full py-2.5 px-4 bg-gray-650 border-gray-600 placeholder-gray-200 text-white focus:ring-primary-500 focus:border-primary-500 outline-none',
        className
      )}
      defaultValue={defaultValue}
      placeholder={placeholder}
      required={required}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          onEnter && onEnter(e.currentTarget.value)
        }
      }}
      onChange={e => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onChange && onChange(e.currentTarget.value)
      }}
    />
  )
)

export default Input
