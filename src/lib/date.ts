import { LOCALE } from '@/constant/common';

export function formatDateToLocalYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const formatTimeUTC = (date: Date) => {
  const time = new Date(date);
  const hours = String(time.getUTCHours()).padStart(2, '0');
  const minutes = String(time.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatTimeRangeUTC = (jamAwal: Date, jamAkhir: Date) => {
  const start = formatTimeUTC(jamAwal);
  const end = formatTimeUTC(jamAkhir);

  return `${start} - ${end}`;
};

export const formatDateUTC = (date: Date, utc = true) => {
  if (!date) return '-';

  return new Intl.DateTimeFormat(LOCALE, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: utc ? 'UTC' : undefined,
  }).format(new Date(date));
};
