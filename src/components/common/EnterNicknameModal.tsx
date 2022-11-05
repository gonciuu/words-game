import React, { FC, Fragment, useState } from 'react'

import { Transition, Dialog } from '@headlessui/react'
import { IoMdClose } from 'react-icons/io'

import Button from './Button'
import Input from './Input'
import Label from './Label'

type EnterNicknameModalProps = {
  isOpen: boolean
  closeModal: () => void
  saveNickname: (nickname: string) => void
  submitText?: string
}

const EnterNicknameModal: FC<EnterNicknameModalProps> = ({
  closeModal,
  isOpen,
  saveNickname,
  submitText = 'Zapisz',
}) => {
  const [nicknameInput, setNicknameInput] = useState<string>('')
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={closeModal}>
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
                  <div className="flex justify-between items-end mb-2">
                    <Label>Podaj swój nick</Label>
                    <IoMdClose
                      color="#ffffff"
                      size={24}
                      className="cursor-pointer"
                      onClick={closeModal}
                    />
                  </div>
                  <Input
                    placeholder="Nickname"
                    className="mt-1"
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
