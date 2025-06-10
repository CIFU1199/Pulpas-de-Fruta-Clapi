// src/theme/customTheme.js
import { createTheme } from '@mui/material';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Verde vibrante (similar a la cáscara de algunas frutas tropicales)
      light: '#81C784', // Verde más claro
      dark: '#388E3C',  // Verde más oscuro
    },
    secondary: {
      main: '#FFC107', // Amarillo/Naranja tropical (mango, maracuyá)
      light: '#FFD54F', // Amarillo más claro
      dark: '#FFA000',  // Naranja más oscuro
    },
    error: {
      main: '#EF5350', // Rojo para errores
    },
    warning: {
      main: '#FF9800', // Naranja para advertencias
    },
    info: {
      main: '#2196F3', // Azul para información
    },
    success: {
      main: '#4CAF50', // Verde para éxito
    },
    background: {
      default: '#F5F5DC', // Un beige suave para el fondo general, que evoca naturalidad
      paper: '#FFFFFF', // Blanco puro para superficies de componentes (tarjetas, modales)
    },
    text: {
      primary: '#212121', // Texto oscuro para buena legibilidad
      secondary: '#757575', // Texto secundario un poco más claro
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','), // Fuente base legible
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      fontFamily: ['Montserrat', 'sans-serif'].join(','), // Títulos grandes con Montserrat
    },
    h4: {
      fontSize: '1.8rem',
      fontWeight: 700,
      fontFamily: ['Montserrat', 'sans-serif'].join(','),
    },
    h6: {
      fontSize: '1.2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none', // Quita la transformación a mayúsculas por defecto en los botones
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Bordes ligeramente redondeados para un toque más suave y moderno
          padding: '10px 20px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#388E3C', // Efecto hover para el botón primario
          },
        },
      },
      defaultProps: {
        disableElevation: true, // Quita la sombra por defecto de los botones contained
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#4CAF50', // Asegura que el AppBar use el color primario
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Tarjetas con bordes más redondeados
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)', // Sombra suave para un efecto flotante
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8, // Bordes redondeados para campos de texto
          },
        },
      },
    },
  },
});

export default customTheme;