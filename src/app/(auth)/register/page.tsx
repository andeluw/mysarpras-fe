'use client';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Typography from '@/components/Typography';
import { FormProvider, useForm } from 'react-hook-form';
import PrimaryLink from '@/components/links/PrimaryLink';
import Radio from '@/components/forms/Radio';
import DropzoneInput from '@/components/forms/DropzoneInput';
import Image from 'next/image';
import { Label } from '@/components/forms/Label';

type RegisterRequest = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
};

export default function Register() {
  const methods = useForm<RegisterRequest>({
    mode: 'onChange',
  });

  return (
    <div className='flex min-h-screen'>
      <div className='w-1/2 flex flex-col items-center justify-center bg-white p-10 gap-4'>
        <Typography variant='h1' className='text-gray-800 font-bold'>
          Register
        </Typography>

        <FormProvider {...methods}>
          <form className='mt-4 space-y-6 w-full max-w-lg'>
            <div className='space-y-4'>
              <Input
                type='text'
                label='Nama Lengkap'
                id='name'
                validation={{
                  required: 'Nama lengkap wajib diisi',
                }}
                placeholder='Masukkan nama lengkap anda'
                className='w-full'
              />

              <div>
                <Label className='block text-gray-800 font-medium mb-2'>
                  Daftar sebagai:
                </Label>
                <div className='flex gap-6'>
                  <Radio
                    label='Mahasiswa'
                    name='role'
                    value='mahasiswa'
                    validation={{ required: 'Peran wajib dipilih' }}
                    helperText='Pilih peran anda'
                    className='form-radio'
                  />
                  <Radio
                    label='Dosen'
                    name='role'
                    value='dosen'
                    validation={{ required: 'Peran wajib dipilih' }}
                    className='form-radio'
                  />
                </div>
                {methods.formState.errors.role && (
                  <p className='mt-1 text-sm text-red-600'>
                    {methods.formState.errors.role.message}
                  </p>
                )}
              </div>
            </div>

            <Input
              type='email'
              label='Email'
              id='email'
              validation={{
                required: 'Email wajib diisi',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Gunakan format email yang valid',
                },
              }}
              placeholder='Masukkan email anda'
              className='w-full'
            />

            <Input
              type='tel'
              label='No Telepon'
              id='phone'
              validation={{
                required: 'Nomor telepon wajib diisi',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Hanya boleh berisi angka',
                },
                maxLength: {
                  value: 13,
                  message: 'Masukkan nomor telopon yang valid',
                },
              }}
              placeholder='Masukkan nomor telepon anda'
              className='w-full'
              inputMode='numeric'
              onKeyDown={(e) => {
                const allowedKeys = [
                  'Backspace',
                  'ArrowLeft',
                  'ArrowRight',
                  'Tab',
                ];
                if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />

            <DropzoneInput
              id='card'
              label='Kartu Tanda Pengenal'
              accept={{
                'application/pdf': ['.pdf'],
              }}
              maxFiles={1}
              helperText='Format file harus PDF'
              validation={{
                validate: (files: File[]) =>
                  (files && files.length > 0) ||
                  'Kartu tanda pengenal wajib diunggah',
              }}
              containerClassName='w-full'
              labelTextClassName='block text-gray-800 font-medium'
              helperTextClassName='text-gray-500 mt-1'
            />

            <Input
              type='password'
              label='Password'
              id='password'
              validation={{
                required: 'Password wajib diisi',
                minLength: {
                  value: 8,
                  message: 'Password minimal 8 karakter',
                },
                validate: {
                  hasNumber: (value) =>
                    /[0-9]/.test(value) || 'Password harus mengandung angka',
                  hasLetter: (value) =>
                    /[a-zA-Z]/.test(value) || 'Password harus mengandung huruf',
                },
              }}
              placeholder='Masukkan password anda'
              className='w-full'
            />

            <Button size='lg' variant='primary' className='w-full mt-6'>
              Register
            </Button>
          </form>
        </FormProvider>

        <div className='mt-4 text-sm text-gray-600'>
          <PrimaryLink href='/login' className='ml-2'>
            Sudah punya akun?
          </PrimaryLink>
        </div>
      </div>

      {/* Right Section */}
      <div className='w-1/2 bg-gradient-to-r from-primary-500 to-primary-700 flex flex-col items-center justify-center'>
        <Image src={'/images/logo.png'} alt='Logo' width={200} height={200} className='mb-4' />
        <Typography variant='j1' className='text-white text-6xl' weight='bold'>
          mySarpras
        </Typography>
      </div>
    </div>
  );
}
