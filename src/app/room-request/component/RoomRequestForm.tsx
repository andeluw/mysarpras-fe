'use client';

import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/components/buttons/Button';

import DateSelector from '@/app/room-request/component/DateSelector';
import KegiatanSelector from '@/app/room-request/component/KegiatanSelector';
import RoomSelector from '@/app/room-request/component/RoomSelector';
import TimeSelector from '@/app/room-request/component/TimeSelector';
import {
  jenisKegiatanOptions,
  ruanganOptions,
  timeSlotsOptions,
} from '@/constant/selectoption';

import { Peminjaman } from '@/types/test/mock';
import { getPeminjamanByRuanganId } from '@/types/test/mock';

export default function RoomRequestForm() {
  const methods = useForm({
    mode: 'onChange',
  });
  const { setValue, watch } = methods;
  const selectedDate = watch('dateField');
  const selectedTime = watch('jamAwalSelect');
  const [bookings, setBookings] = useState<Peminjaman[]>([]);

  const normalizeTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.getUTCHours();
  };

  const fetchBookings = useCallback(async () => {
    if (!selectedDate) return;

    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const promises = ruanganOptions.map((room) =>
        getPeminjamanByRuanganId(parseInt(room.value), formattedDate)
      );
      const responses = await Promise.all(promises);
      const allBookings = responses.flatMap((response) => response.data);
      setBookings(allBookings);
    } catch (error) {
      toast.error(String(error));
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const getAvailableTimeSlots = () => {
    const bookedSlots = bookings.map((booking) => ({
      roomId: booking.Ruangan_idRuangan,
      start: normalizeTime(booking.jamAwal),
      end: normalizeTime(booking.jamAkhir),
    }));

    return timeSlotsOptions.filter((slot) => {
      const hour = parseInt(slot.value);
      return !bookedSlots.some(
        (booking) => hour >= booking.start && hour < booking.end
      );
    });
  };

  const getAvailableRooms = () => {
    if (!selectedTime) return ruanganOptions;

    const hour = parseInt(selectedTime);
    const bookedRoomIds = bookings
      .filter((booking) => {
        const start = normalizeTime(booking.jamAwal);
        const end = normalizeTime(booking.jamAkhir);
        return hour >= start && hour < end;
      })
      .map((booking) => booking.Ruangan_idRuangan.toString());

    return ruanganOptions.filter((room) => !bookedRoomIds.includes(room.value));
  };

  const availableTimeSlots = selectedDate
    ? getAvailableTimeSlots()
    : timeSlotsOptions;
  const availableRooms = selectedDate ? getAvailableRooms() : ruanganOptions;

  const handleDateChange = (date: Date) => {
    setValue('dateField', date);
  };

  return (
    <FormProvider {...methods}>
      <form className='flex gap-y-8 flex-col p-8'>
        <h1 className='text-2xl'>Reservasi Ruangan</h1>

        <DateSelector
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />

        <TimeSelector options={availableTimeSlots} disabled={!selectedDate} />

        <RoomSelector options={availableRooms} selectedDate={selectedDate} />

        <KegiatanSelector options={jenisKegiatanOptions} />

        <Button type='submit'>Submit</Button>
      </form>
    </FormProvider>
  );
}
