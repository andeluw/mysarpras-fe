'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Textarea from '@/components/forms/Textarea';
import UnderlineLink from '@/components/links/UnderlineLink';
import Typography from '@/components/Typography';

interface FormValues {
  basic: string;
  readOnly: string;
  prefix: string;
  suffix: string;
  leftIcon: string;
  rightIcon: string;
  helper: string;
  validation: string;
  helperValidation: string;
  password: string;
}

export default function InputSandbox() {
  const methods = useForm<FormValues>({
    defaultValues: {
      readOnly: 'Hello',
    },
  });
  const { handleSubmit } = methods;
  const [formOutput, setFormOutput] = useState<FormValues | null>(null);

  const onSubmit = (data: FormValues) => {
    setFormOutput(data);
  };

  return (
    <div className='min-h-screen bg-white py-20 layout'>
      <Typography as='h1' variant='h5' weight='bold'>
        Form Sandbox
      </Typography>

      <UnderlineLink href='/sandbox' className='mt-2'>
        Back to Sandbox
      </UnderlineLink>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 mt-12'>
          <Input id='basic' label='Basic Input' placeholder='Type here...' />
          <Input id='readOnly' label='Read Only' readOnly />
          <Input
            id='prefix'
            label='With Prefix'
            prefix='Rp'
            placeholder='10000'
          />
          <Input
            id='suffix'
            label='With Suffix'
            suffix='IDR'
            placeholder='Amount'
          />
          <Input
            id='leftIcon'
            label='With Left Icon'
            leftIcon={HiMagnifyingGlass}
            placeholder='Search...'
          />
          <Input
            id='rightIcon'
            label='With Right Icon'
            rightIcon={HiMagnifyingGlass}
            placeholder='Search...'
          />
          <Input
            id='helper'
            label='With Helper'
            helperText='This is some helper text'
          />
          <Input
            id='validation'
            label='With Validation'
            validation={{ required: 'Required field' }}
          />
          <Input
            id='helperValidation'
            label='With Helper + Validation'
            validation={{ required: 'Required field' }}
            helperText='Helper text here'
          />
          <Input
            id='password'
            label='Password'
            type='password'
            placeholder='Enter your password'
            validation={{ required: 'Password is required' }}
          />

          <Textarea
            id='textarea'
            label='Textarea'
            placeholder='Type here...'
            rows={5}
            validation={{ required: 'Textarea is required' }}
          />

          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </FormProvider>

      {formOutput && (
        <div className='rounded-lg bg-white p-4 shadow mt-8'>
          <Typography as='h2' variant='h6' weight='semibold' className='mb-2'>
            Submitted Data
          </Typography>
          <pre className='whitespace-pre-wrap text-sm text-gray-800'>
            {JSON.stringify(formOutput, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
