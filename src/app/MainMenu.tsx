import React from 'react'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Label from '@/components/common/Label'
const MainMenu = () => {
  return (
    <div>
      <h1 className="text-5xl font-semibold">Gra słowna</h1>
      <h4 className="text-xl mt-4">Wymyśl słowo zawierające podane litery i wygrywaj</h4>
      <div className="mt-16 border rounded-lg p-6 border-gray-400">
        <Label>Dołącz do pokoju</Label>
        <Input type="text" placeholder="Id pokoju" className="mt-1" />
        <Button className="mt-4 w-full">Dołącz do gry</Button>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">Lub</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <Button className="w-full" variant="secondary">
          Stwórz pokój
        </Button>
      </div>
    </div>
  )
}

export default MainMenu
