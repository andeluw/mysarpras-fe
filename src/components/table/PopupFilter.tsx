import { ChevronDown, Filter, X } from 'lucide-react';
import * as React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Checkbox from '@/components/forms/Checkbox';
import Radio from '@/components/forms/Radio';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/Popover';
import Typography from '@/components/Typography';

export type PopupFilterProps<T extends Record<string, string[]>> = {
  allowMultiple?: boolean;
  filterOption: {
    id: Extract<keyof T, string>;
    name: string;
    options: {
      id: string;
      name: string;
    }[];
  }[];
  setFilterQuery: React.Dispatch<React.SetStateAction<T>>;
  title?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const PopupFilter = <T extends Record<string, string[]>>({
  allowMultiple = false,
  filterOption,
  setFilterQuery,
  title = 'Filter',
}: PopupFilterProps<T>) => {
  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
  });
  const { control, setValue } = methods;

  const filter: string[] | string = useWatch({
    control,
    name: 'filter[]',
  });
  //#endregion  //*======== Form ===========

  const getParsedFilter = React.useCallback(() => {
    const defaultFilter = filterOption.reduce((acc, curr) => {
      return { ...acc, [curr.id]: [] };
    }, {} as T);

    if (allowMultiple && typeof filter !== 'string') {
      return (
        filter?.reduce((acc, curr) => {
          const [key, value] = curr.split('.');
          acc[key].push(value);
          return acc;
        }, defaultFilter) ?? defaultFilter
      );
    }

    if (typeof filter === 'string') {
      const [key, value] = filter.split('.');
      return { ...defaultFilter, [key]: [value] };
    }

    return defaultFilter;
  }, [allowMultiple, filter, filterOption]);

  React.useEffect(() => {
    const parsedFilter = getParsedFilter();
    setFilterQuery(parsedFilter);
  }, [getParsedFilter, setFilterQuery]);

  const resetFilter = () => setValue('filter[]', []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className='bg-primary-100'
          leftIcon={Filter}
          rightIcon={ChevronDown}
          size='sm'
          variant='ghost'
        >
          {title}{' '}
          {filter?.length > 0 && (allowMultiple ? `(${filter.length})` : '(1)')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-md p-6' side='bottom'>
        <FormProvider {...methods}>
          <div className='flex items-center justify-between'>
            <Typography variant='h5'>Filter</Typography>
            <div className='flex items-center gap-3'>
              <Typography
                as='button'
                className='cursor-pointer font-semibold text-primary-500 underline'
                onClick={resetFilter}
                variant='c1'
              >
                Reset Filter
              </Typography>
              <PopoverClose>
                <IconButton icon={X} size='sm' variant='ghost' />
              </PopoverClose>
            </div>
          </div>
          {filterOption.map((item) => {
            if ((item.options || []).length === 0) return null;
            return (
              <div key={item.id}>
                <Typography className='mt-4' color='secondary' variant='s3'>
                  {item.name}
                </Typography>
                <div className='mt-2'>
                  {item.options.map((option) =>
                    allowMultiple ? (
                      <Checkbox
                        key={`${item.id}.${option.id}`}
                        label={option.name}
                        name='filter'
                        size='sm'
                        value={`${item.id}.${option.id}`}
                      />
                    ) : (
                      <Radio
                        key={`${item.id}.${option.id}`}
                        label={option.name}
                        name='filter'
                        size='sm'
                        value={`${item.id}.${option.id}`}
                      />
                    )
                  )}
                </div>
              </div>
            );
          })}
        </FormProvider>
      </PopoverContent>
    </Popover>
  );
};
PopupFilter.displayName = 'PopupFilter';

export { PopupFilter };
