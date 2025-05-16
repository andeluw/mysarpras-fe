'use client';

import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import withAuth from '@/components/hoc/withAuth';
import PrimaryLink from '@/components/links/PrimaryLink';
import Typography from '@/components/Typography';

import { useLoginMutation } from '@/app/(auth)/login/hooks/useLoginMutation';

export type LoginRequest = {
  email: string;
  password: string;
};

export default withAuth(LoginPage, 'public');
// export default LoginPage;
function LoginPage() {
  const methods = useForm<LoginRequest>({
    mode: 'onTouched',
  });

  const { handleSubmit } = methods;
  const { loginMutate, isPending } = useLoginMutation();
  const onSubmit = async (data: LoginRequest) => {
    loginMutate(data);
  };

  return (
    <div className='flex min-h-screen flex-col lg:flex-row'>
      {/* Left Section */}
      <div className='h-[35vh] md:h-[30vh] lg:h-screen w-full lg:w-1/2 bg-gradient-to-r from-primary-500 to-primary-700 flex flex-col items-center justify-center'>
        <div className='flex items-center justify-center mb-4 md:mb-8 rounded-lg bg-white p-4'>
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

      {/* Right Section */}
      <div className='w-full lg:w-1/2 flex flex-col items-center justify-center bg-white p-10'>
        <Typography variant='j2' className='text-primary-800 font-bold'>
          Login
        </Typography>
        <FormProvider {...methods}>
          <form
            className='mt-4 space-y-8 w-full max-w-lg'
            onSubmit={handleSubmit(onSubmit)}
          >
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
              type='password'
              label='Password'
              id='password'
              validation={{
                required: 'Password wajib diisi',
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
              Login
            </Button>
          </form>
        </FormProvider>

        <Typography variant='b3' className='text-muted-foreground mt-4'>
          Belum punya akun? <PrimaryLink href='/register'>Register</PrimaryLink>
        </Typography>
      </div>
    </div>
  );
}
