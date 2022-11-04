'use client'

import React, { Fragment, useRef, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { IoMdClose } from 'react-icons/io'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Label from '@/components/common/Label'

const Profile = () => {
  const ref = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openFilePicker = () => {
    ref.current?.click()
  }

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        console.log(reader.result)
        console.log(reader.result)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div className="fixed top-0 right-0 flex py-4 px-8 bg-gray-800 rounded-tl-full rounded-bl-full gap-8">
      <div
        className="flex bg-gray-600 rounded-full px-8 h-10  items-center justify-center cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className=" max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">gonciu</div>
      </div>

      <input ref={ref} type="file" className="hidden" onChange={onPickImage} accept="image/*" />

      <Image
        src="/images/avatar.jpeg"
        alt="Profile"
        width={40}
        height={40}
        className="object-cover rounded-full cursor-pointer"
        onClick={openFilePicker}
      />

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
                  <div className="flex justify-between items-end mb-2">
                    <Label>Zmień swój nick</Label>
                    <IoMdClose
                      color="#ffffff"
                      size={24}
                      className="cursor-pointer"
                      onClick={closeModal}
                    />
                  </div>

                  <Input placeholder="Nickname" className="mt-1" />
                  <Button className="mt-4 w-full">Zapisz</Button>
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Profile
