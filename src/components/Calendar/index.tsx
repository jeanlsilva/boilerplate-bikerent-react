import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Typography, Box, Dialog, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

interface CalendarProps {
    dialogIsOpen: boolean;
    setDialogIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function Calendar({ dialogIsOpen, setDialogIsOpen }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const goToNextMonth = () => {
    console.log('go to next month')
  };

  const goToPreviousMonth = () => {
    console.log('go to previous month')
  };

  const RenderCalendar = () => {
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#1F49D1',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        boxShadow: 'none',
        color: 'white'
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
        dividedCalendarDays.push(<Grid container spacing={1.5}>
            <Grid item xs={12/7} mb={1.5}>{calendarDays[i]}</Grid>
            <Grid item xs={12/7} mb={1.5}>{calendarDays[i + 1]}</Grid>
            <Grid item xs={12/7} mb={1.5}>{calendarDays[i + 2]}</Grid>
            <Grid item xs={12/7} mb={1.5}>{calendarDays[i + 3]}</Grid>
            <Grid item xs={12/7} mb={1.5}>{calendarDays[i + 4]}</Grid>
            <Grid item xs={12/7} mb={1.5}>{calendarDays[i + 5]}</Grid>
            <Grid item xs={12/7}>{calendarDays[i + 6]}</Grid>
        </Grid>)
    }

    return (
      <Box>
        <Box display='flex' alignItems='center' justifyContent='space-between' mb={2}>
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

  return (
    <Dialog 
        open={dialogIsOpen} 
        onClose={() => setDialogIsOpen(false)} 
        maxWidth={false} 
        PaperProps={{ style: { borderRadius: '1rem', padding: '1rem', backgroundColor: '#1F49D1', color: '#fff' } }} 
        sx={{ width: '40%', mx: 'auto', left: '14vw' }}
    >
        <RenderCalendar />
    </Dialog>
  );
}
