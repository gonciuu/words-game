'use client'
import React, { FC, Fragment, useEffect, useState } from 'react'

import { Transition, Dialog } from '@headlessui/react'

import Button from './Button'
import Input from './Input'
import Label from './Label'

type EnterNicknameModalProps = {
  isOpen: boolean
  saveNickname: (nickname: string) => void
  submitText?: string
}

const EnterNicknameModal: FC<EnterNicknameModalProps> = ({
  isOpen,
  saveNickname,
  submitText = 'Zapisz',
}) => {
  const [nicknameInput, setNicknameInput] = useState<string>('')

  useEffect(() => {
    setNicknameInput(localStorage.getItem('nickname') || '')
  }, [])

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => {
          //close dialog
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-md" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="mx-auto w-[300px] rounded-lg bg-gray-900 p-4">
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    saveNickname(nicknameInput)
                  }}
                >
                  <Label>Podaj swój nick</Label>
                  <Input
                    placeholder="Nickname"
                    className="mt-1"
                    defaultValue={nicknameInput}
                    onChange={setNicknameInput}
                    required
                  />
                  <Button className="mt-4 w-full" type="submit">
                    {submitText}
                  </Button>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default EnterNicknameModal
