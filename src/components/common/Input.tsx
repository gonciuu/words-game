import clsx from 'clsx'
import { type } from 'os'
import React, { FC } from 'react'
import { HTMLInputTypeAttribute } from 'react'

type InputProps = {
  className?: string
  placeholder?: string
  required?: boolean
  type?: HTMLInputTypeAttribute | undefined
}

const Input: FC<InputProps> = ({ className, placeholder, required, type }) => {
  return (
    <input
      type={type}
      className={clsx(
        'border text-sm rounded-lg block w-full py-2.5 px-4 bg-gray-700 border-gray-600 placeholder-gray-300 text-white focus:ring-primary-500 focus:border-primary-500 outline-none',
        className
      )}
      placeholder={placeholder}
      required={required}
    />
  )
}

export default Input
