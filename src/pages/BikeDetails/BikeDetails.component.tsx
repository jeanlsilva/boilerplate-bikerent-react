import { AlertColor, Box, Breadcrumbs, Divider, Link, Typography } from '@mui/material'
import BikeImageSelector from 'components/BikeImageSelector'
import BikeSpecs from 'components/BikeSpecs'
import BikeType from 'components/BikeType'
import BookingAddressMap from 'components/BookingAddressMap'
import Header from 'components/Header'
import Bike from 'models/Bike'
import { getServicesFee } from './BikeDetails.utils'
import {
  BookingButton,
  BreadcrumbContainer,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Content,
  DetailsContainer,
  FavoriteIcon,
  InfoIcon,
  LikeButton,
  OverviewContainer,
  PriceRow,
} from './BikeDetails.styles'
import { Calendar } from 'components/Calendar'
import { useContext, useState } from 'react'
import rentBike from 'services/rentBike'
import AuthContext from 'contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import CustomSnackbar from 'components/Snackbar'
import { BikeImage, ImageContainer, Name } from 'components/BikeCard/BikeCard.styles'

interface BikeDetailsProps {
  bike?: Bike
}

const BikeDetails = ({ bike }: BikeDetailsProps) => {
  const rateByDay = bike?.rate || 0
  const rateByWeek = rateByDay * 7
  const [numberOfDays, setNumberOfDays] = useState(0)
  const servicesFee = getServicesFee((rateByDay * numberOfDays))
  const total = (rateByDay * numberOfDays) + servicesFee
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('error');
  const [message, setMessage] = useState('');
  const [rentCompleted, setRentCompleted] = useState(false)

  const handleAddToBooking = async () => {
    if (user && bike?.id) {
      await rentBike({
        bikeId: bike?.id,
        userId: user.id,
        subtotal: (rateByDay * numberOfDays),
        feeAmount: servicesFee,
        total
      })

      setSeverity('success');
      setMessage('Bike successfully rent!');
      setRentCompleted(true)
    } else {
      navigate('/login');
      setMessage('Something went wrong when trying to rent the bike');
    }
    setOpen(true);
  }

  return (
    <div data-testid='bike-details-page'>
      <Header />

      <BreadcrumbContainer data-testid='bike-details-breadcrumbs'>
        <Breadcrumbs separator={<BreadcrumbSeparator />}>
          <Link underline='hover' display='flex' alignItems='center' color='white' href='/'>
            <BreadcrumbHome />
          </Link>

          <Typography fontWeight={800} letterSpacing={1} color='white'>
            {bike?.name}
          </Typography>
        </Breadcrumbs>
      </BreadcrumbContainer>

      <Content>
        <DetailsContainer variant='outlined' data-testid='bike-details-container'>
          {!!bike?.imageUrls && <BikeImageSelector imageUrls={bike.imageUrls} />}

          <BikeSpecs bodySize={bike?.bodySize} maxLoad={bike?.maxLoad} ratings={bike?.ratings} />

          <Divider />

          <Box marginY={2.25}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <div>
                <Typography
                  variant='h1'
                  fontSize={38}
                  fontWeight={800}
                  marginBottom={0.5}
                  data-testid='bike-name-details'
                >
                  {bike?.name}
                </Typography>

                <BikeType type={bike?.type} />
              </div>

              <LikeButton>
                <FavoriteIcon />
              </LikeButton>
            </Box>

            <Typography marginTop={1.5} fontSize={14}>
              {bike?.description}
            </Typography>
          </Box>

          <Divider />

          <Box marginY={2.25} data-testid='bike-prices-details'>
            <PriceRow>
              <Typography>Day</Typography>
              <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
                {rateByDay} €
              </Typography>
            </PriceRow>

            <PriceRow>
              <Typography>Week</Typography>
              <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
                {rateByWeek} €
              </Typography>
            </PriceRow>
          </Box>

          <Divider />

          <Box marginTop={3.25}>
            <Typography variant='h1' fontSize={24} fontWeight={800}>
              Full adress after booking
            </Typography>

            <BookingAddressMap />
          </Box>
        </DetailsContainer>
        
        <OverviewContainer variant='outlined' data-testid='bike-overview-container'>
          {rentCompleted ? (
            <Box display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='h4'>Thank you!</Typography>
              <Typography>Your bike is booked</Typography>
              <ImageContainer>
                <BikeImage
                  src={bike?.imageUrls[0]}
                  isLoaded={true}
                  width='100%'
                  alt='Bike Image'
                  data-testid='bike-image'
                />
              </ImageContainer>

              <Name data-testid='bike-name'>{bike?.name}</Name>  
              <BikeType type={bike?.type} />          
            </Box>
          ) : (
            <>
              <Typography variant="h1" fontSize={24} mb={1.25}>Select date and time</Typography>
              <Calendar setNumberOfDays={setNumberOfDays} />
              <Typography variant='h2' fontSize={16} marginBottom={1.25}>
                Booking Overview
              </Typography>

              <Divider />

              <PriceRow marginTop={1.75} data-testid='bike-overview-single-price'>
                <Box display='flex' alignItems='center'>
                  <Typography marginRight={1}>Subtotal</Typography>
                  <InfoIcon fontSize='small' />
                </Box>
                <Typography>{rateByDay * numberOfDays} €</Typography>
              </PriceRow>

              <PriceRow marginTop={1.5} data-testid='bike-overview-single-price'>
                <Box display='flex' alignItems='center'>
                  <Typography marginRight={1}>Service Fee</Typography>
                  <InfoIcon fontSize='small' />
                </Box>

                <Typography>{servicesFee} €</Typography>
              </PriceRow>

              <PriceRow marginTop={1.75} data-testid='bike-overview-total'>
                <Typography fontWeight={800} fontSize={16}>
                  Total
                </Typography>
                <Typography variant='h2' fontSize={24} letterSpacing={1}>
                  {total} €
                </Typography>
              </PriceRow>

              <BookingButton
                fullWidth
                disableElevation
                variant='contained'
                data-testid='bike-booking-button'
                onClick={handleAddToBooking}
              >
                Add to booking
              </BookingButton>
            </>
          )}
        </OverviewContainer>
      </Content>
      <CustomSnackbar open={open} setOpen={setOpen} severity={severity} message={message} />
    </div>
  )
}

export default BikeDetails
