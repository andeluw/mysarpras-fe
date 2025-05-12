'use client'

import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";
import Typography from "@/components/Typography";
import {
  FormProvider,
  useForm
} from "react-hook-form";
import PrimaryLink from "@/components/links/PrimaryLink";
import HelperText from "@/components/forms/HelperText";

type RegisterRequest = {
  name: string;
  email: string;
  phone: string;
  card: FileList;
  password: string;
  role: string;
};

export default function Register() {
  const methods = useForm<RegisterRequest>({
    mode: "onChange",
  });

  return (
    <div className='flex min-h-screen'>
      
      <div className='w-1/2 flex flex-col items-center justify-center bg-white p-10'>
        <Typography variant='h5' className='text-gray-800 font-bold'>
          Register
        </Typography>

        <FormProvider {...methods}>
          <form className='mt-4 space-y-6 w-full max-w-lg'>

            <div>
              <label className="block text-gray-800 font-medium mb-2">Daftar sebagai:</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input type="radio" value="mahasiswa" {...methods.register("role", { required: "Pilih peran anda" })}
                    className="form-radio" />
                  Mahasiswa
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" value="dosen" {...methods.register("role", { required: "Pilih peran anda" })}
                    className="form-radio" />
                  Dosen
                </label>
              </div>
              {methods.formState.errors.role && (
              <p className="mt-1 text-sm text-red-600">{methods.formState.errors.role.message}</p>
              )}
            </div>

            <Input type='text' label=' Nama Lengkap' id='name' validation={{ 
                required: "Nama lengkap wajib diisi",
              }} placeholder='Masukkan nama lengkap anda' className='w-full' />

            <Input type='email' label='Email' id='email' validation={{ 
                required: "Email wajib diisi",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Gunakan format email yang valid"
                }
              }} placeholder='Masukkan email anda' className='w-full' />

            <Input type='tel' label='No Telepon' id='phone' validation={{ 
                required: "Nomor telepon wajib diisi",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Hanya boleh berisi angka"
                },
                maxLength: {
                  value: 13,
                  message: "Masukkan nomor telopon yang valid"
                }
              }} placeholder='Masukkan nomor telepon anda' className='w-full' inputMode="numeric" onKeyDown={(e)=> {
            const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
            if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
            }
            }}
            />

            <div className='w-full'>
              <label htmlFor='card' className='block text-gray-800 font-medium'>
                Kartu Tanda Pengenal <span className="text-red-500">*</span>
              </label>

              <input type='file' id='card' accept='.pdf' {...methods.register("card", { validate: (files)=> (files &&
              files.length > 0) || "Kartu tanda pengenal wajib diunggah"
              })}
              className='mt-2 w-full border border-gray-300 rounded-md p-2'
              />

              <HelperText helperTextClassName="text-gray-500 mt-1">
                Format file harus PDF
              </HelperText>

              {methods.formState.errors.card && (
              <p className="mt-1 text-sm text-red-600">{methods.formState.errors.card.message}</p>
              )}
            </div>

            <Input type='password' label='Password' id='password' validation={{ 
                required: "Password wajib diisi",
                minLength: {
                  value: 8,
                  message: "Password minimal 8 karakter"
                },
                validate: {
                  hasNumber: value => /[0-9]/.test(value) || "Password harus mengandung angka",
                  hasLetter: value => /[a-zA-Z]/.test(value) || "Password harus mengandung huruf"
                }
              }} placeholder='Masukkan password anda' className='w-full' />
              

            <Button size="lg" variant="primary" className='w-full mt-6'>
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

      {/* Right Section */}
      <div className='w-1/2 bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center'>
        <Typography variant='h1' className='text-white' weight='bold'>
          mySarpras
        </Typography>
      </div>
    </div>
    );
}