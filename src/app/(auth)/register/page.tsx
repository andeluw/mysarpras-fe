'use client'

import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";
import Typography from "@/components/Typography";
import { FormProvider, useForm } from "react-hook-form";
import PrimaryLink from "@/components/links/PrimaryLink";

type RegisterRequest = {
  name: string;
  email: string;
  phone: string;
  studentCard: FileList;
  password: string;
};

export default function Register() {
  const methods = useForm<RegisterRequest>({
    mode: "onChange",
  });

  return (
    <div className='flex min-h-screen'>
      {/* Left Section */}
      <div className='w-1/2 bg-blue-600 flex items-center justify-center'>
        <Typography variant='h1' className='text-white' weight='bold'>
          mySarpras
        </Typography>
      </div>
      
      {/* Right Section */}
      <div className='w-1/2 flex flex-col items-center justify-center bg-white p-10'>
        <Typography variant='h5' className='text-gray-800 font-bold'>
          Register
        </Typography>
        <FormProvider {...methods}>              
          <form className='mt-4 space-y-6 w-full max-w-lg'>
            {/* Name */}
            <Input 
              type='text'
              label='Nama'
              id='name'
              validation={{ required: true }}
              placeholder='Masukkan nama lengkap anda'
              className='w-full'
            />
            <Input 
              type='email'
              label='Email'
              id='email'      
              validation={{ required: true }}
              placeholder='Masukkan email anda'
              className='w-full'
            />
            <Input
              type='tel'
              label='No Telepon'
              id='phone'
              validation={{ required: true }}
              placeholder='Masukkan nomor telepon anda'
              className='w-full'
            />
            <div className='w-full'>
              <label htmlFor='studentCard' className='block text-gray-800 font-medium'>
                Kartu Tanda Mahasiswa
              </label>
              <input
                type='file'
                id='studentCard'
                accept='.pdf'
                className='mt-2 w-full border border-gray-300 rounded-md p-2'
                required
              />
            </div>
            <Input
              type='password'
              label='Password'
              id='password'
              validation={{ required: true }}
              placeholder='Masukkan password anda'
              className='w-full'
            />
            <Button
              size="lg" 
              variant="primary" 
              className='w-full mt-6'>
              Register
            </Button>
          </form>
        </FormProvider>

        <div className='mt-4 text-sm text-gray-600'>
          <PrimaryLink href="/login" className="ml-2">
            Sudah punya akun?
          </PrimaryLink>
        </div>
      </div>
    </div>
  );
}
