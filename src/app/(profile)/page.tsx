'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Input from '@/components/forms/Input'
import Typography from '@/components/Typography'
import Button from '@/components/buttons/Button'
import Image from 'next/image'
import { ArrowLeft, LogOut, Pencil } from 'lucide-react'

type ProfileData = {
  name: string
  email: string
  phone: string
  role: string
}

export default function ProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false)

  const methods = useForm<ProfileData>({
    defaultValues: {
      name: 'Budi Gunawan',
      email: 'budigunawan@gmail.com',
      phone: '081234567890',
      role: 'Mahasiswa',
    },
  })

  const { handleSubmit, watch } = methods
  const onSubmit = (data: ProfileData) => {
    console.log('Updated Profile:', data)
    setIsEditMode(false)
  }

  const handleLogout = () => {
    console.log('Logged out')
  }

  return (
    <main className='min-h-screen bg-[#f4f6f8] p-4 md:p-8'>
      <div className='w-full max-w-4xl mx-auto bg-white shadow-md rounded-2xl px-6 md:px-12 py-10'>

        <ArrowLeft
          className='mb-6 cursor-pointer text-gray-500 hover:text-black'
          onClick={() => window.history.back()}
        />

        {/* Header */}
        <div className='flex flex-col items-center gap-3 mb-8'>
          <div className='w-24 h-24 rounded-full overflow-hidden border-4 border-muted'>
            <Image
              src='/images/logo.png'
              alt='Foto Profil'
              width={96}
              height={96}
              className='object-cover w-full h-full'
            />
          </div>
          <Typography variant='h3' className='font-bold text-center'>
            {watch('name')}
          </Typography>
          <p className='text-muted-foreground capitalize text-lg'>{watch('role')}</p>
         

          {!isEditMode && (
            <Button variant='outline' className='flex items-center gap-2' onClick={() => setIsEditMode(true)}>
              <Pencil size={16} /> Edit Profil
            </Button>
          )}
        </div>

        <hr className='mb-10 border-gray-200' />

        {/* Form */}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='grid grid-cols-1 sm:grid-cols-2 gap-6'
          >
            <Input
              id='name'
              label='Nama lengkap'
              disabled={!isEditMode}
              validation={{ required: 'Nama wajib diisi' }}
            />
            <Input
              id='email'
              label='Email'
              type='email'
              disabled={!isEditMode}
              validation={{ required: 'Email wajib diisi' }}
            />
            <Input
              id='phone'
              label='No Telepon'
              disabled={!isEditMode}
              validation={{ required: 'Nomor wajib diisi' }}
            />
            <Input
              id='role'
              label='Role'
              disabled
            />

            {isEditMode && (
              <div className='col-span-full flex gap-4 mt-2'>
                <Button type='submit' variant='primary' className='transition-all hover:shadow-md'>
                  Simpan
                </Button>
                <Button type='button' variant='outline' onClick={() => setIsEditMode(false)}>
                  Batal
                </Button>
              </div>
            )}
          </form>
        </FormProvider>

        <div className='mt-12 flex justify-start'>
          <Button variant='destructive' onClick={handleLogout} className='flex items-center gap-2'>
            <LogOut size={16} /> Logout
          </Button>
        </div>
      </div>
    </main>
  )
}

