import React, { FC } from 'react'

type HelloProps = {
  name: string
}

const Hello: FC<HelloProps> = ({ name }) => {
  return <h1 className="text-3xl font-bold underline">Hello {name}!</h1>
}

export default Hello
