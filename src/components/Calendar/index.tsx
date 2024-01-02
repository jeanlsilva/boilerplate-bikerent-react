import { useState } from 'react';
import { Button, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export function Calendar() {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(undefined);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(undefined);

  const handleDateClick = (date: Date) => {
    // if no start date or end date selected, set start date
    // if start date selected and end date not selected and selected date is after start date, set end date
    // if start date selected and end date not selected and selected date is before start date, set start date
    // if start date selected and end date selected and selected date is before start date, set start date
        // if start date selected and end date selected and selected date is after start date, set end date
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
    console.log('go to next month')
  };

  const goToPreviousMonth = () => {
    console.log('go to previous month')
  };

  const RenderCalendar = () => {
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const previousDay = new Date(year, month, 0).getDate();
    const monthAsText = new Date(year, month, 1).toLocaleString('default', { month: 'long' });

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
      const date = new Date(year, month, i);

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

    const isInsideRange = (day: number) => {
        const date = new Date(year, month, day);
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

    const dividedCalendarDays: JSX.Element[] = []
    for (let i = 0; i <= calendarDays.length; i += 7) {
        dividedCalendarDays.push(<Grid container spacing={0}>
            <Grid item xs={12/7} sx={() => isInsideRange(i)}>{calendarDays[i]}</Grid>
            <Grid item xs={12/7} sx={() => isInsideRange(i + 1)}>{calendarDays[i + 1]}</Grid>
            <Grid item xs={12/7} sx={() => isInsideRange(i + 2)}>{calendarDays[i + 2]}</Grid>
            <Grid item xs={12/7} sx={() => isInsideRange(i + 3)}>{calendarDays[i + 3]}</Grid>
            <Grid item xs={12/7} sx={() => isInsideRange(i + 4)}>{calendarDays[i + 4]}</Grid>
            <Grid item xs={12/7} sx={() => isInsideRange(i + 5)}>{calendarDays[i + 5]}</Grid>
            <Grid item xs={12/7} sx={() => isInsideRange(i + 6)}>{calendarDays[i + 6]}</Grid>
        </Grid>)
    }

    return (
      <Box borderRadius={1} p={2} mb={4} bgcolor='#1F49D1' color='#fff'>
        <Box display='flex' alignItems='center' justifyContent='space-between' gap={2} mb={2}>
        <Typography variant='h6'sx={{ fontSize: '1.25rem', fontWeight: 500 }}>
            {monthAsText} {year}
        </Typography>
          {goToPreviousMonth ? (
            <Button
                variant='outlined' 
                sx={{ 
                    border: '1px solid #fff',
                    ...(month === new Date().getMonth() && year === new Date().getFullYear() && { pointerEvents: 'none' }), // example inline style
                }}
              onClick={goToPreviousMonth}
            >
              <Typography color='white'>{'<'}</Typography>
            </Button>
          ) : (
            <Box visibility='hidden'></Box>
          )}
          {goToNextMonth ? (
            <Button variant='outlined' sx={{ border: '1px solid #fff' }} onClick={goToNextMonth}>
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

  return <RenderCalendar />
}
