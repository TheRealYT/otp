'use client';

import {format} from 'date-fns';
import {CalendarIcon} from 'lucide-react';
import {useRef, useState} from 'react';
import {DateRange} from 'react-day-picker';

import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

export function DatePicker({date, onChange, disabled}: {
    date: DateRange,
    onChange?: (from: Date, to?: Date) => void
    disabled?: boolean
}) {
    const [range, setRange] = useState<DateRange>(date);

    const initDate = useRef(range);

    const updateDate = (dateRange?: DateRange) => {
        if (!dateRange)
            return setRange({
                from: range?.to,
            });

        if (dateRange.from && dateRange.to) {
            if (dateRange.from.getTime() == dateRange.to.getTime())
                return;

            if (dateRange.from > dateRange.to) {
                return setRange({
                    from: dateRange.to,
                    to: dateRange.from,
                });
            }
        } else if (!dateRange.to) {
            return setRange({
                from: range?.from,
            });
        }

        setRange(dateRange);
    };

    const onDateChanged = () => {
        if (!onChange)
            return;

        if (initDate.current.from?.getTime() === range.from?.getTime() && initDate.current.to?.getTime() === range.to?.getTime())
            return;

        initDate.current = range;
        onChange(range.from as Date, range.to);
    };

    return (
        <Popover onOpenChange={(open) => !open && onDateChanged()}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon/>
                    <span>{range?.from && format(range.from, 'PP')}</span>
                    <span>{range?.to && '- ' + format(range.to, 'PP')}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                    mode="range"
                    selected={range}
                    onSelect={updateDate}
                    disabled={disabled || ((date) => date.getTime() >= new Date().getTime() || date < new Date('01-01-2025'))}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
