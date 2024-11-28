'use client'

import { addUserEmailToProduct } from '@/lib/actions'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Image from 'next/image'
import { FormEvent, useState } from 'react'

interface Props {
  productId: string
}

const Modal = ({ productId }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    await addUserEmailToProduct(productId, email)

    setIsSubmitting(false)
    setEmail('')
    setIsOpen(false)
  }

  return (
    <>
      <button type='button' className='btn' onClick={() => setIsOpen(true)}>
        Track
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='dialog-container'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
          <DialogPanel className='dialog-content'>
            <div className='flex flex-col'>
              <div className='flex justify-between'>
                <div className='rounded-10 border border-gray-200 p-3'>
                  <Image src='/assets/icons/logo.svg' alt='logo' width={28} height={28} />
                </div>

                <Image
                  src='/assets/icons/x-close.svg'
                  alt='close'
                  width={24}
                  height={24}
                  className='cursor-pointer'
                  onClick={() => setIsOpen(false)}
                />
              </div>

              <DialogTitle className='dialog-head_text'>
                Stay updated with product pricing alerts right in your inbox!
              </DialogTitle>

              <p className='mt-2 text-sm text-gray-600'>Never miss a bargain again with our timely alerts!</p>
            </div>

            <form className='mt-5 flex flex-col' onSubmit={handleSubmit}>
              <label htmlFor='email' className='text-sm font-medium text-gray-700'>
                Email address
              </label>
              <div className='dialog-input_container'>
                <Image src='/assets/icons/mail.svg' alt='mail' width={18} height={18} />

                <input
                  required
                  type='email'
                  id='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='Enter your email address'
                  className='dialog-input'
                />
              </div>

              <button type='submit' className='dialog-btn' disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Track'}
              </button>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default Modal
