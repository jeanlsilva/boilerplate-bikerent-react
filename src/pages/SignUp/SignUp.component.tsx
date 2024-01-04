import { Typography, Box, TextField, Button } from '@mui/material'
import { Container } from './SignUp.styles'
import { useState } from 'react'
import createUser from 'services/createUser';
import { useNavigate } from 'react-router-dom';
import Header from 'components/Header';
import AuthGuard from 'guards/AuthGuard';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const user = await createUser({ name, email, password });
    if (user) {
      navigate('/login')
    }
  }

  return (
    <AuthGuard>
      <Header />
      <Container data-testid='sign-up-page'>
        <Box display='flex' flexDirection='column' gap={2}>
          <Typography variant='h2'>Create your account</Typography>
          <TextField onChange={(e) => setName(e.target.value)} label='name' />
          <TextField onChange={(e) => setEmail(e.target.value)} label='email' />
          <TextField onChange={(e) => setPassword(e.target.value)} label='password' type='password' />
          <Button variant='contained' sx={{ py: 2 }} onClick={handleSignUp}>Sign Up</Button>
        </Box>
      </Container>
    </AuthGuard>
  )
}

export default SignUp;
