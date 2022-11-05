'use client'

import React, { FC } from 'react'

import clsx from 'clsx'

type LabelProps = {
  children: React.ReactNode
  className?: string
}

const Label: FC<LabelProps> = ({ children, className }) => {
  return <label className={clsx('block text-sm text-white pl-1', className)}>{children}</label>
}

export default Label
