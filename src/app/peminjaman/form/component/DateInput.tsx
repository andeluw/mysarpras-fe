import { Calendar } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';

import 'react-day-picker/dist/style.css';

interface CalendarIconProps {
  onDateSelect: (date: Date) => void;
  selected?: Date;
}

export const DateInput: React.FC<CalendarIconProps> = ({
  onDateSelect,
  selected,
}) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleDaySelect = (date: Date | undefined) => {
    if (date) {
      onDateSelect(date);
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type='button'
        onClick={() => setShowCalendar((prev) => !prev)}
        style={{
          padding: '8px 12px',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Calendar />
      </button>

      {showCalendar && (
        <div
          ref={pickerRef}
          style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            background: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1000,
            padding: '12px',
          }}
        >
          <DayPicker
            mode='single'
            selected={selected}
            onSelect={handleDaySelect}
            disabled={{ before: new Date() }}
            styles={{
              caption: { padding: '13px' },
            }}
          />
        </div>
      )}
    </div>
  );
};
