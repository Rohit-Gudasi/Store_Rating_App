import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4a90e2' },
    secondary: { main: '#f50057' },
    background: { default: '#f9f9f9', paper: '#fff' }
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600
        }
      }
    }
  }
});

export default theme;
