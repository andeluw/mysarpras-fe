'use client'

import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";
import Typography from "@/components/Typography";
import { FormProvider, useForm } from "react-hook-form";
import PrimaryLink from "@/components/links/PrimaryLink";

type LoginRequest = {
  email: string;
  password: string;
};

export default function Login() {
  const methods = useForm<LoginRequest>({
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
          Login
        </Typography>
        <FormProvider {...methods}>              
          <form className='mt-4 space-y-6 w-full max-w-lg'> 
            <Input 
              type='email'
              label='Email'
              id='email'      
              validation={{ required: true }}
              placeholder='Masukkan email anda'
              className='w-full'
            />
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
              Login
            </Button>
          </form>
        </FormProvider>

        <div className='mt-4 text-sm text-gray-600'>
          <PrimaryLink href="/register" className="ml-2">
            Belum punya akun?
          </PrimaryLink>
        </div>
      </div>
    </div>
  );
}
