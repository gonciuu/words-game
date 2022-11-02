import clsx from 'clsx'
import React, { FC } from 'react'

type LabelProps = {
  children: React.ReactNode
  className?: string
}

const Label: FC<LabelProps> = ({ children, className }) => {
  return <label className={clsx('block text-sm text-white pl-1', className)}>{children}</label>
}

export default Label
