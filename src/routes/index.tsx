import { ThemeProvider } from '@mui/system'
import { BrowserRouter } from 'react-router-dom'
import theme from 'styles/theme'
import AppRoutes from './app.routes'
import { AuthProvider } from 'contexts/AuthContext'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
