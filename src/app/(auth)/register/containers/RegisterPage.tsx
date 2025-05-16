'use client';

import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/forms/DropzoneInput';
import ErrorMessage from '@/components/forms/ErrorMessage';
import Input from '@/components/forms/Input';
import { Label } from '@/components/forms/Label';
import Radio from '@/components/forms/Radio';
import PrimaryLink from '@/components/links/PrimaryLink';
import { ScrollArea } from '@/components/ScrollArea';
import Typography from '@/components/Typography';

import useRegisterMutation from '@/app/(auth)/register/hooks/useRegisterMutation';

import { FileWithPreview } from '@/types/dropzone';

export type RegisterRequest = {
  namaUser: string;
  email: string;
  password: string;
  role: string;
  noTelp: string;
  gambar: FileWithPreview[];
};

export default function RegisterPage() {
  const methods = useForm<RegisterRequest>({
    mode: 'onTouched',
  });

  const { handleSubmit } = methods;

  const { registerMutate, isPending } = useRegisterMutation();

  const onSubmit = async (data: RegisterRequest) => {
    registerMutate(data);
  };

  return (
    <div className='flex min-h-screen flex-col-reverse lg:flex-row lg:h-screen'>
      <ScrollArea className='w-full lg:w-1/2 h-full'>
        <div className=' flex flex-col items-center justify-center bg-white px-10 py-12 lg:py-20 gap-4'>
          <Typography variant='j2' className='text-primary-800 font-bold'>
            Register
          </Typography>

          <FormProvider {...methods}>
            <form
              className='mt-8 space-y-8 w-full max-w-lg'
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                type='text'
                label='Nama Lengkap'
                id='namaUser'
                validation={{
                  required: 'Nama lengkap wajib diisi',
                }}
                placeholder='Masukkan nama lengkap anda'
                className='w-full'
              />

              <div>
                <Label required>Daftar sebagai</Label>
                <div className='flex gap-6 mt-1.5'>
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
                {methods.formState.errors.role?.message && (
                  <ErrorMessage>
                    {methods.formState.errors.role.message}
                  </ErrorMessage>
                )}
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
                type='text'
                label='Nomor Telepon'
                id='noTelp'
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
                id='gambar'
                label='Kartu Tanda Pengenal'
                accept={{
                  'image/*': ['.png', '.jpg', '.jpeg'],
                  'application/pdf': ['.pdf'],
                }}
                maxFiles={1}
                helperText='Format file yang diterima: .png, .jpg, .jpeg, .pdf'
                validation={{
                  required: 'Kartu tanda pengenal wajib diisi',
                }}
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
                      /[a-zA-Z]/.test(value) ||
                      'Password harus mengandung huruf',
                  },
                }}
                placeholder='Masukkan password anda'
                className='w-full'
              />

              <Button
                size='lg'
                variant='primary'
                className='w-full mt-6'
                type='submit'
                isLoading={isPending}
              >
                Register
              </Button>
            </form>
          </FormProvider>

          <Typography variant='b3' className='text-muted-foreground'>
            Sudah punya akun? <PrimaryLink href='/login'>Login</PrimaryLink>
          </Typography>
        </div>
      </ScrollArea>

      {/* Right Section */}
      <div className='h-[40vh] md:h-[30vh] lg:h-full w-full lg:w-1/2 bg-gradient-to-r from-primary-500 to-primary-700 flex flex-col items-center justify-center'>
        <div className='flex items-center justify-center mb-8 rounded-lg bg-white p-4'>
          <Image
            src='/images/logo.png'
            alt='Logo'
            width={80}
            height={80}
            className='w-[40px] lg:w-[80px]'
          />
        </div>
        <Typography variant='j1' className='text-white'>
          mySarpras
        </Typography>
      </div>
    </div>
  );
}
