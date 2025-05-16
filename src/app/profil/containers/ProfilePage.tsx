'use client';

import { ArrowLeft, LockKeyhole, LogOut, Pencil } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { imageUrl } from '@/lib/api';

import Button from '@/components/buttons/Button';
import { Card } from '@/components/Card';
import Input from '@/components/forms/Input';
import withAuth from '@/components/hoc/withAuth';
import UserLayout from '@/components/layouts/user/UserLayout';
import ButtonLink from '@/components/links/ButtonLink';
import IconLink from '@/components/links/IconLink';
import Typography from '@/components/Typography';

import useAuthStore from '@/stores/useAuthStore';

import useUpdateProfileMutation from '@/app/profil/hooks/useUpdateProfileMutation';

import { User } from '@/types/user';

export default withAuth(ProfilePage, 'user');
function ProfilePage() {
  const user = useAuthStore.useUser();
  const logout = useAuthStore.useLogout();
  const [isEditMode, setIsEditMode] = useState(false);

  const methods = useForm<User>({
    mode: 'onTouched',
  });

  const { setValue } = methods;
  useEffect(() => {
    if (user) {
      setValue('namaUser', user.namaUser);
      setValue('email', user.email);
      setValue('noTelp', user.noTelp);
      setValue('role', user.role);
    }
  }, [user, setValue]);

  const { mutate: updateProfile, isPending } = useUpdateProfileMutation();

  const { handleSubmit } = methods;
  const onSubmit = (data: Partial<User>) => {
    updateProfile({
      email: data.email,
      noTelp: data.noTelp,
    });
    setIsEditMode(false);
  };

  return (
    <UserLayout>
      <div className='flex flex-col gap-2 mb-8'>
        <Typography variant='j2' className='text-primary-800'>
          Profil Pengguna
        </Typography>
      </div>
      <Card className='w-full p-8'>
        <IconLink icon={ArrowLeft} href='/' variant='light' />

        {/* Header */}
        <div className='flex flex-col items-center gap-3 mb-8'>
          <div className='w-24 h-24 rounded-full overflow-hidden border-4 border-muted'>
            <Image
              src={
                user?.kartuTandaPengenal
                  ? imageUrl(user.kartuTandaPengenal)
                  : '/images/user.png'
              }
              alt='Foto Profil'
              width={96}
              height={96}
              className='object-cover w-full h-full'
            />
          </div>
          <Typography variant='h3' className='font-bold text-center'>
            {user?.namaUser}
          </Typography>
          <p className='text-muted-foreground capitalize text-lg'>
            {(user?.role ?? '').toUpperCase()[0] + (user?.role ?? '').slice(1)}
          </p>

          <div className='flex gap-4 items-center'>
            {!isEditMode && (
              <Button
                className='flex items-center gap-2'
                onClick={() => setIsEditMode(true)}
                rightIcon={Pencil}
                iconSize={16}
              >
                Edit Profil
              </Button>
            )}

            <ButtonLink
              href='/profil/ubah-password'
              variant='outline'
              className='flex items-center gap-2'
              rightIcon={LockKeyhole}
              iconSize={16}
            >
              Ubah Password
            </ButtonLink>

            <Button
              variant='destructive'
              onClick={() => logout()}
              className='flex items-center gap-2'
              rightIcon={LogOut}
              iconSize={16}
            >
              Logout
            </Button>
          </div>
        </div>

        <hr className='mb-10 border-gray-200' />

        {/* Form */}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='grid grid-cols-1 sm:grid-cols-2 gap-6'
          >
            <Input
              id='namaUser'
              label='Nama lengkap'
              disabled={true}
              validation={{ required: 'Nama wajib diisi' }}
            />

            <Input id='role' label='Role' disabled />

            <Input
              id='email'
              label='Email'
              type='email'
              disabled={!isEditMode}
              validation={{ required: 'Email wajib diisi' }}
            />
            <Input
              id='noTelp'
              label='No Telepon'
              disabled={!isEditMode}
              validation={{ required: 'Nomor wajib diisi' }}
            />

            {isEditMode && (
              <div className='col-span-full flex gap-4 mt-2'>
                <Button
                  type='submit'
                  variant='primary'
                  className='transition-all hover:shadow-md'
                  isLoading={isPending}
                >
                  Simpan
                </Button>
                <Button
                  type='button'
                  variant='light'
                  onClick={() => setIsEditMode(false)}
                >
                  Batal
                </Button>
              </div>
            )}
          </form>
        </FormProvider>
      </Card>
    </UserLayout>
  );
}
