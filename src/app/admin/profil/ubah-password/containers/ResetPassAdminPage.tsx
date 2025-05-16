'use client';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import { Card, CardContent } from '@/components/Card';
import Input from '@/components/forms/Input';
import withAuth from '@/components/hoc/withAuth';
import AdminLayout from '@/components/layouts/admin/AdminLayout';

import useResetPassMutation from '@/app/profil/ubah-password/hooks/useResetPassMutation';

export default withAuth(ResetPassAdminPage, 'admin');
function ResetPassAdminPage() {
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
    <AdminLayout
      breadcrumbs={['/admin', '/admin/profil', '/admin/profil/ubah-password']}
      title='Ubah Password'
      subheading='Ubah Password Admin'
    >
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
    </AdminLayout>
  );
}
