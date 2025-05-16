'use client';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import { Card, CardContent } from '@/components/Card';
import Input from '@/components/forms/Input';
import withAuth from '@/components/hoc/withAuth';
import UserLayout from '@/components/layouts/user/UserLayout';
import Typography from '@/components/Typography';

import useResetPassMutation from '@/app/profil/ubah-password/hooks/useResetPassMutation';

export default withAuth(ResetPasswordPage, 'user');
function ResetPasswordPage() {
  const methods = useForm<{ password: string }>({
    mode: 'onTouched',
  });
  const { handleSubmit, watch } = methods;
  const password = watch('password');
  const { mutate, isPending } = useResetPassMutation();
  const onSubmit = async (data: { password: string }) => {
    mutate({ password: data.password });
  };
  return (
    <UserLayout>
      <div className='flex flex-col gap-2 mb-8'>
        <Typography variant='j2' className='text-primary-800'>
          Ubah Password
        </Typography>
        <Typography variant='s2' className='text-muted-foreground'>
          Silakan masukkan password baru Anda. Pastikan password baru Anda
          berbeda dari yang sebelumnya.
        </Typography>
      </div>
      <Card className='w-full px-6 py-10'>
        <CardContent>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-8'
            >
              <Input
                id='password'
                label='Password Baru'
                type='password'
                placeholder='Masukkan password baru'
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
              />

              <Input
                id='confirmPassword'
                label='Konfirmasi Password Baru'
                type='password'
                placeholder='Masukkan konfirmasi password baru'
                validation={{
                  required: 'Konfirmasi password wajib diisi',
                  validate: {
                    matchesPreviousPassword: (value) => {
                      if (value !== password) {
                        return 'Konfirmasi password tidak sesuai';
                      }
                    },
                  },
                }}
              />

              <Button type='submit' className='w-full' isLoading={isPending}>
                Submit
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </UserLayout>
  );
}
