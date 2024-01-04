import { Box, Button, TextField, Typography } from '@mui/material'
import { Container } from './Login.styles'
import Header from 'components/Header'
import { useContext, useState } from 'react';
import authenticate from 'services/authenticate';
import { useNavigate } from 'react-router-dom';
import AuthContext from 'contexts/AuthContext';
import AuthGuard from 'guards/AuthGuard';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  
  const handleSignIn = async () => {
    const session = await authenticate({ email, password });

    if (session) {
      login(session.token);
    }
  }

  return (
        <AuthGuard>
          <Header />
          <Container data-testid='login-page'>
            <Box display='flex' flexDirection='column' gap={2}>
              <Typography variant='h2'>Create your account</Typography>
              <TextField onChange={(e) => setEmail(e.target.value)} label='email' />
              <TextField onChange={(e) => setPassword(e.target.value)} label='password' type='password' />
              <Button variant='contained' sx={{ py: 2 }} onClick={handleSignIn}>Sign In</Button>
            </Box>
          </Container>
        </AuthGuard>
  )
}

export default Login
