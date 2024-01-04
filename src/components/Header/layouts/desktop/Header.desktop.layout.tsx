import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Actions, Container, Icon, LoginButton, SignUpButton, Title } from './Header.desktop.styles'
import { useContext } from 'react'
import AuthContext from 'contexts/AuthContext'

const DesktopHeader = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <Container data-testid='header'>
      <Title data-testid='app-name'>Bike Rental</Title>

      <Actions>
        <Box display='flex' alignItems='center' data-testid='location-label'>
          <Typography color='white' marginRight={0.75}>
            Manhattan
          </Typography>

          <Icon fontSize='small' />
        </Box>

        {isAuthenticated ? (
          <>
            <Typography>Hello, {user?.name}</Typography>
            <LoginButton onClick={logout}>Logout</LoginButton>
          </>
        ) : (
          <>
            <Link to='/login' data-testid='login-button'>
              <LoginButton>Log in</LoginButton>
            </Link>

            <Link to='/sign-up' data-testid='signup-button'>
              <SignUpButton variant='contained' color='secondary' disableElevation>
                Sign up
              </SignUpButton>
            </Link>
          </>
        )}
      </Actions>
    </Container>
  )
}

export default DesktopHeader
