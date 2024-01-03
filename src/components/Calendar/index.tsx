import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

interface CalendarProps {
  setNumberOfDays: Dispatch<SetStateAction<number>>
}

export function Calendar({ setNumberOfDays }: CalendarProps) {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(undefined);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const handleDateClick = (date: Date) => {
    if (!selectedStartDate && !selectedEndDate) {
        setSelectedStartDate(date);
    }
    if (selectedStartDate && !selectedEndDate) {
        if (date.getTime() > selectedStartDate.getTime()) {
            setSelectedEndDate(date);
        } else {
            setSelectedStartDate(date);
        }
    }
    if (selectedStartDate && selectedEndDate) {
        if (date.getTime() < selectedStartDate.getTime()) {
            setSelectedStartDate(date);
        } else {
            setSelectedEndDate(date);
        }
    }
    if (selectedStartDate && selectedEndDate && date.getTime() > selectedEndDate.getTime()) {
        setSelectedStartDate(date)
        setSelectedEndDate(undefined)
    }
  };

  const goToNextMonth = () => {
    setSelectedMonth(selectedMonth + 1)
  };

  const goToPreviousMonth = () => {
    setSelectedMonth(selectedMonth - 1)
  };

  const isInsideRange = (day: number) => {
    const date = new Date(selectedYear, selectedMonth, day);
    return selectedStartDate && !selectedEndDate ? 
            (date.getTime() === selectedStartDate.getTime() ? { background: '#C1CFF2', color: '#1F49D1', borderRadius: '50%' } : {})
        : selectedStartDate && selectedEndDate ? 
            (
                date.getTime() === selectedStartDate.getTime()
                ? { background: '#C1CFF2', color: '#1F49D1', borderTopLeftRadius: '50%', borderBottomLeftRadius: '50%' }
                : date.getTime() === selectedEndDate.getTime()
                ? { background: '#C1CFF2', color: '#1F49D1', borderTopRightRadius: '50%', borderBottomRightRadius: '50%' }
                : date.getTime() > selectedStartDate.getTime() && date.getTime() < selectedEndDate.getTime()
                ? { background: '#C1CFF2', borderRadius: 0 } : {}
            ) : { background: '#1F49D1', color: '#fff' }
}

  const RenderCalendar = () => {
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const year = new Date().getFullYear();

    const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();
    const firstDay = new Date(year, selectedMonth, 1).getDay();
    const previousDay = new Date(year, selectedMonth, 0).getDate();
    const monthAsText = new Date(year, selectedMonth, 1).toLocaleString('en-US', { month: 'long' });

    const weekHeader = weekdays.map((day, index) => (
      <Box key={index} borderBottom={0}>
        {day}
      </Box>
    ));

    const calendarDays: JSX.Element[] = [];

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        boxShadow: 'none',
        background: 'inherit',
        color: 'inherit'
      }));

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(
        <Item key={`previous-${i}`}>
            <Typography sx={{ opacity: 0.6 }}>
                {previousDay - firstDay + i + 1}
            </Typography>
        </Item>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, selectedMonth, i);

      calendarDays.push(
        <Item
          key={i}
          onClick={() => handleDateClick(date)}
          sx={
            (selectedStartDate && 
                date.getTime() === selectedStartDate.getTime() || 
                selectedEndDate && date.getTime() === selectedEndDate.getTime()
            ) ? { borderRadius: '50%', background: '#fff', color: '#1F49D1' } : {}
        }
        >
          <Typography>{i}</Typography>
        </Item>
      );
    }

    let daysLeft = 7 - (calendarDays.length % 7);
    if (daysLeft < 5) daysLeft += 7;
    for (let i = 1; i <= daysLeft; i++) {
      calendarDays.push(
        <Item key={`next-${i}`}>
            <Typography sx={{ opacity: 0.6 }}>
                {i}
            </Typography>
        </Item>
      );
    }

    const dividedCalendarDays: JSX.Element[] = []
    for (let i = 0; i <= calendarDays.length; i += 7) {
        dividedCalendarDays.push(<Grid container spacing={0}>
            <Grid item xs={12/7} sx={() => isInsideRange((i - firstDay + 1))}>{calendarDays[i]}</Grid>
            <Grid item xs={12/7} sx={() => isInsideRange((i - firstDay + 1) + 1)}>{calendarDays[i + 1]}</Grid>
            <Grid item xs={12/7} sx={() => isInsideRange((i - firstDay + 1) + 2)}>{calendarDays[i + 2]}</Grid>
            <Grid item xs={12/7} sx={() => isInsideRange((i - firstDay + 1) + 3)}>{calendarDays[i + 3]}</Grid>
            <Grid item xs={12/7} sx={() => isInsideRange((i - firstDay + 1) + 4)}>{calendarDays[i + 4]}</Grid>
            <Grid item xs={12/7} sx={() => isInsideRange((i - firstDay + 1) + 5)}>{calendarDays[i + 5]}</Grid>
            <Grid item xs={12/7} sx={() => isInsideRange((i - firstDay + 1) + 6)}>{calendarDays[i + 6]}</Grid>
        </Grid>)
    }

    return (
      <Box borderRadius={1} p={2} mb={4} bgcolor='#1F49D1' color='#fff'>
        <Box display='flex' alignItems='center' justifyContent='space-between' gap={2} mb={2}>
          <Box>
          <Typography variant='h6'sx={{ fontSize: '1.625rem', fontWeight: 700 }}>
              {monthAsText}
          </Typography>
          <Typography>{year}</Typography>
        </Box>
          {goToPreviousMonth ? (
            <Button
                variant='outlined' 
                sx={{ 
                  border: '1px solid #fff', width: 52, height: 52, borderRadius: '10px',
                    ...(selectedMonth === new Date().getMonth() && year === new Date().getFullYear() && { pointerEvents: 'none' }), // example inline style
                }}
              onClick={goToPreviousMonth}
            >
              <Typography color='white' display='block'>{'<'}</Typography>
            </Button>
          ) : (
            <Box visibility='hidden'></Box>
          )}
          {goToNextMonth ? (
            <Button variant='outlined' sx={{ border: '1px solid #fff', width: 52, height: 52, borderRadius: '10px' }} onClick={goToNextMonth}>
              <Typography color='white'>{'>'}</Typography>
            </Button>
          ) : (
            <Box visibility='hidden'></Box>
          )}
        </Box>
        <Box>
          <Box display="flex" justifyContent='space-around' height={50}>{weekHeader}</Box>
          <Box>{dividedCalendarDays}</Box>
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    if (!selectedEndDate) setNumberOfDays(1)
    else setNumberOfDays(Math.ceil(Math.abs((selectedEndDate?.getTime() || 0) - (selectedStartDate?.getTime() || 0)) / (1000 * 60 * 60 * 24)))
  }, [selectedStartDate, selectedEndDate])

  return <RenderCalendar />
}
