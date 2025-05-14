'use client';

import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import { Calendar, CalendarProps } from '@/components/Calendar';
import ErrorMessage from '@/components/forms/ErrorMessage';
import HelperText from '@/components/forms/HelperText';
import { Label } from '@/components/forms/Label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';

type DatePickerProps = {
  range?: boolean;
  name?: string;
  label?: string;
  validation?: RegisterOptions;
  value?: Date | DateRange;
  onChange?: (date: Date | DateRange | undefined) => void;
  className?: string;
  hideError?: boolean;
  helperText?: string;
  placeholder?: string;
} & Omit<CalendarProps, 'mode' | 'selected' | 'onSelect' | 'defaultMonth'>;

/* eslint-disable @typescript-eslint/no-non-null-assertion */

export function DatePicker({
  range = false,
  name,
  label,
  validation,
  value,
  onChange,
  className,
  hideError = false,
  helperText,
  placeholder,
  ...calendarProps
}: DatePickerProps) {
  const form = useFormContext();
  const isUsingRHF = !!form && !!name;

  const error = isUsingRHF ? get(form.formState.errors, name!) : undefined;
  const fieldValue = isUsingRHF ? form.watch(name!) : value;

  const [internalDate, setInternalDate] = React.useState<
    Date | DateRange | undefined
  >(undefined);

  const dateValue = React.useMemo(() => {
    if (isUsingRHF && fieldValue !== undefined) return fieldValue;
    if (!isUsingRHF && value !== undefined) return value;
    return internalDate;
  }, [isUsingRHF, fieldValue, value, internalDate]);

  const handleChange = (date: Date | DateRange | undefined) => {
    if (isUsingRHF) {
      form.setValue(name!, date, { shouldValidate: true, shouldDirty: true });
    } else if (onChange) {
      onChange(date);
    } else {
      setInternalDate(date);
    }
  };

  React.useEffect(() => {
    if (isUsingRHF) {
      form.register(name!, {
        ...validation,
        validate: (val) => {
          if (range) {
            const v = val as DateRange;
            if (!v?.from || !v?.to) return 'Pilih rentang tanggal lengkap';
          }
          return true;
        },
      });
    }
  }, [form, name, validation, range, isUsingRHF]);

  const renderLabel = () => {
    if (range && (dateValue as DateRange)?.from) {
      const { from, to } = dateValue as DateRange;
      if (from && to) {
        return `${format(from, 'PPP', { locale: id })} - ${format(to, 'PPP', {
          locale: id,
        })}`;
      }
      return from
        ? format(from, 'PPP', { locale: id })
        : placeholder
        ? placeholder
        : 'Pilih tanggal';
    }

    if (!range && dateValue instanceof Date) {
      return format(dateValue, 'PPP', { locale: id });
    }

    return placeholder ? placeholder : 'Pilih tanggal';
  };

  return (
    <div className={cn('grid gap-2', className)}>
      {label && <Label required={!!validation?.required}>{label}</Label>}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='light'
            className={cn(
              'justify-start text-left font-normal',
              !dateValue && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {renderLabel()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          {range ? (
            <Calendar
              mode='range'
              selected={dateValue as DateRange}
              onSelect={handleChange as (date: DateRange | undefined) => void}
              numberOfMonths={2}
              defaultMonth={(dateValue as DateRange)?.from ?? undefined}
              initialFocus
              {...calendarProps}
            />
          ) : (
            <Calendar
              mode='single'
              selected={dateValue as Date}
              onSelect={handleChange as (date: Date | undefined) => void}
              numberOfMonths={1}
              initialFocus
              {...calendarProps}
            />
          )}
        </PopoverContent>
      </Popover>

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
}
