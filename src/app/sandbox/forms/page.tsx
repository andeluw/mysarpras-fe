'use client';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { FormProvider, useForm } from 'react-hook-form';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import Button from '@/components/buttons/Button';
import { DatePicker } from '@/components/DatePicker';
import Checkbox from '@/components/forms/Checkbox';
import DropzoneInput from '@/components/forms/DropzoneInput';
import HelperText from '@/components/forms/HelperText';
import Input from '@/components/forms/Input';
import { Label } from '@/components/forms/Label';
import Radio from '@/components/forms/Radio';
import Select from '@/components/forms/Select';
import Textarea from '@/components/forms/Textarea';
import UnderlineLink from '@/components/links/UnderlineLink';
import Typography from '@/components/Typography';

import { FileWithPreview } from '@/types/dropzone';

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
  select: string;
  selectReadOnly: string;
  requiredSelect: string;
  multiSelect: string[];
  textarea: string;
  checkbox: boolean;
  pilihan: string;
  dropzone: FileWithPreview[];
  dropzoneReadOnly: FileWithPreview[];
  dateSingle: Date;
  dateRange: DateRange;
  dateWithProps: DateRange;
}

const options = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const multiOptions = [
  { label: 'Teater A', value: 'teatera' },
  { label: 'Aula Handayani', value: 'aulahandayani' },
  { label: 'Fasor', value: 'fasor' },
];

export default function InputSandbox() {
  const [baseSingleDate, setBaseSingleDate] = useState<Date | undefined>(
    undefined
  );
  const [baseRangeDate, setBaseRangeDate] = useState<DateRange | undefined>(
    undefined
  );
  const [baseWithPropsDate, setBaseWithPropsDate] = useState<
    DateRange | undefined
  >(undefined);

  const fileWithPreviewDemoList: FileWithPreview[] = Array.from(
    { length: 3 },
    (_, i) => {
      const file = new File(['dummy content'], `test-${i}.jpg`, {
        type: 'image/jpeg',
      });

      return Object.assign(file, {
        preview: `https://picsum.photos/1200/800`,
      });
    }
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      readOnly: 'Hello',
      dropzoneReadOnly: fileWithPreviewDemoList,
      dateSingle: new Date(),
    },
  });

  const { handleSubmit } = methods;
  const [formOutput, setFormOutput] = useState<FormValues | null>(null);

  const onSubmit = (data: FormValues) => {
    setFormOutput(data);
  };

  return (
    <div className='min-h-screen bg-white py-20 layout'>
      <Typography as='h1' variant='h1'>
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

          <Select
            id='select'
            label='Normal Select'
            options={options}
            placeholder='Select gender'
            helperText='This is some helper text'
          />

          <Select
            id='selectReadOnly'
            label='Read Only Select'
            options={options}
            readOnly
            helperText='This is some helper text'
          />

          <Select
            id='requiredSelect'
            label='Required Select'
            options={options}
            placeholder='Select something'
            helperText='This is some helper text'
            validation={{ required: 'This field is required' }}
          />

          <Select
            id='multiSelect'
            label='Multi Select'
            isMulti
            options={multiOptions}
            helperText='This is some helper text'
            placeholder='Pilih ruangan'
          />

          <div>
            <Label required>Radio Button</Label>
            <div className='flex gap-10 mt-1'>
              <Radio
                label='Pilihan 1'
                name='pilihan'
                value='1'
                validation={{ required: 'Field must be filled' }}
              />
              <Radio label='Pilihan 2' name='pilihan' value='2' />
            </div>
            <HelperText helperTextClassName='mt-2'>
              This is some helper text
            </HelperText>
          </div>

          <DropzoneInput
            id='dropzone'
            label='Dropzone Input'
            helperText='File harus berformat .jpg, .jpeg, .png dan maksimal 2MB'
            validation={{ required: 'This field is required' }}
            maxFiles={3}
            maxSize={2 * 1024 * 1024} // 2MB
          />

          <DropzoneInput
            id='dropzoneReadOnly'
            label='Dropzone Input (Read Only)'
            maxFiles={3}
            helperText='File harus berformat .jpg, .jpeg, .png dan maksimal 2MB'
            validation={{ required: 'This field is required' }}
            readOnly
          />

          <Checkbox
            label='Checkbox'
            name='checkbox'
            size='base'
            value='checkbox'
            validation={{ required: 'This field is required' }}
          />

          <DatePicker
            name='dateSingle'
            label='RHF (Single)'
            validation={{ required: 'This field is required' }}
          />

          <DatePicker name='dateRange' label='RHF (Range)' range />

          <DatePicker
            name='dateWithProps'
            label='RHF (With Calendar Props)'
            range
            numberOfMonths={2}
            disabled={(date) => date.getDay() === 0}
          />

          <DatePicker
            label='Base (Single)'
            value={baseSingleDate}
            onChange={(d) => setBaseSingleDate(d as Date)}
          />

          <DatePicker
            label='Base (Range)'
            range
            value={baseRangeDate}
            onChange={(d) => setBaseRangeDate(d as DateRange)}
          />

          <DatePicker
            label='Base (With Calendar Props)'
            range
            numberOfMonths={2}
            disabled={(date) => date.getDay() === 6}
            value={baseWithPropsDate}
            onChange={(d) => setBaseWithPropsDate(d as DateRange)}
          />

          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </FormProvider>

      {formOutput && (
        <div className='rounded-lg bg-white p-4 shadow mt-8'>
          <Typography as='h2' variant='h3' className='mb-2'>
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
