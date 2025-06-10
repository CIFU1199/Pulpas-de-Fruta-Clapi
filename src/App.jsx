// src/App.jsx
import React from 'react';
import { Box } from '@mui/material'; // Solo necesitamos Box aquí para el contenedor principal
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar nuestros componentes de página y navegación
import Navbar from './components/Navbar'; // Importar el componente Navbar
import Footer from './components/Footer'; // Importar el componente Footer
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'; 
import OrderConfirmationPage from './pages/OrderConfirmationPage';

// Creamos un componente placeholder para las páginas que aún no hemos creado
// Esto nos permite tener las rutas y enlaces funcionales


const LoginPage = () => (
  <Box sx={{ p: 4, textAlign: 'center', minHeight: '60vh' }}>
    <Typography variant="h4" color="primary" gutterBottom>Iniciar Sesión / Registrarse</Typography>
    <Typography variant="body1">Accede a tu cuenta o crea una nueva.</Typography>
  </Box>
);


const AboutUsPage = () => (
  <Box sx={{ p: 4, textAlign: 'center', minHeight: '60vh' }}>
    <Typography variant="h4" color="primary" gutterBottom>Sobre Nosotros</Typography>
    <Typography variant="body1">Conoce más sobre la historia y pasión de Clapi.</Typography>
  </Box>
);

const ContactPage = () => (
  <Box sx={{ p: 4, textAlign: 'center', minHeight: '60vh' }}>
    <Typography variant="h4" color="primary" gutterBottom>Contáctanos</Typography>
    <Typography variant="body1">¿Tienes preguntas? ¡Estamos aquí para ayudarte!</Typography>
  </Box>
);


function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> {/* Contenedor principal para footer sticky */}
        <Navbar /> {/* Renderiza la barra de navegación */}

        <Box component="main" sx={{ flexGrow: 1 }}> {/* Contenedor para el contenido principal que empuja el footer */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/nosotros" element={<AboutUsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/confirmacion-pedido" element={<OrderConfirmationPage />} /> 
            {/* Aquí podrías añadir una ruta dinámica para detalles de productos, ej: <Route path="/productos/:id" element={<ProductDetailPage />} /> */}
          </Routes>
        </Box>

        <Footer /> {/* Renderiza el pie de página */}
      </Box>
    </Router>
  );
}

export default App;