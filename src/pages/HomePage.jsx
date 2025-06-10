// src/pages/HomePage.jsx
import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useNavigate } from "react-router-dom";

import productsData from '../data/productsData';
import { useCart } from '../context/CartContext'; // <--- Importa useCart

// --- Animaciones y Componentes Estilizados (sin cambios) ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '70vh',
  minHeight: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: theme.palette.common.white,
  overflow: 'hidden',
  backgroundImage: 'url("https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  },
  [theme.breakpoints.down('md')]: {
    height: '60vh',
    minHeight: '400px',
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  animation: `${fadeIn} 1.5s ease-out forwards`,
  maxWidth: '800px',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    maxWidth: '90%',
  },
}));

const HeroButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1.5, 5),
  fontSize: '1.2rem',
  fontWeight: 700,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  animation: `${scaleIn} 1.2s ease-out forwards`,
  animationDelay: '0.8s',
  opacity: 0,
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  fontWeight: 700,
  color: theme.palette.primary.dark,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    bottom: -theme.spacing(1.5),
    transform: 'translateX(-50%)',
    width: '60px',
    height: '4px',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '2px',
  },
}));

const AdvantageCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 12,
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '3.5rem',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
  },
  '& img': {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
}));


  



function HomePage() {
  const { addToCart } = useCart(); // <--- Obtén la función addToCart del contexto

  const advantages = [
    {
      icon: <CheckCircleOutlineIcon />,
      title: "100% Natural",
      description: "Pulpas puras, sin aditivos, conservantes ni azúcares añadidos. ¡Solo lo mejor de la fruta!",
    },
    {
      icon: <FavoriteBorderIcon />,
      title: "Sabor Inigualable",
      description: "Experimenta la frescura y el auténtico sabor tropical como si acabara de ser cosechado.",
    },
    {
      icon: <EmojiEventsIcon />,
      title: "Calidad Premium",
      description: "Seleccionamos las mejores frutas para garantizar la máxima calidad en cada envase.",
    },
  ];

  const featuredProducts = productsData.slice(0, 3); // Mantiene solo los 3 destacados

  // Función para manejar el clic en "Agregar al Carrito"
  const handleAddToCart = (productId) => {
    addToCart(productId);
    alert(`Producto agregado al carrito!`); // Puedes cambiar esto por un Toast o Snackbar de Material UI
  };

  const navigate = useNavigate();

  const verTodosProductos =() =>{
    navigate('/productos');
  }

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <HeroContent>
            <Typography variant="h1" component="h1" gutterBottom sx={{ animation: `${fadeIn} 1.5s ease-out forwards` }}>
              Clapi: La Esencia Fresca de la Fruta en Cada Sorbo.
            </Typography>
            <Typography variant="h6" component="p" sx={{ animation: `${fadeIn} 1.5s ease-out forwards`, animationDelay: '0.5s', opacity: 0 }}>
              Descubre nuestras pulpas 100% naturales, llenas de sabor tropical y sin conservantes.
            </Typography>
            <HeroButton variant="contained" href="/productos">
              Explora Nuestras Pulpas
            </HeroButton>
          </HeroContent>
        </Container>
      </HeroSection>

      {/* Sección "Nuestras Ventajas" */}
      <SectionContainer sx={{ backgroundColor: 'white' }}>
        <Container maxWidth="md">
          <SectionTitle variant="h4" component="h2">
            ¿Por qué elegir Clapi?
          </SectionTitle>
          <Grid container spacing={4}>
            {advantages.map((advantage, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <AdvantageCard sx={{ animation: `${fadeIn} 1s ease-out forwards`, animationDelay: `${0.2 * index}s`, opacity: 0 }}>
                  <CardContent>
                    {advantage.icon}
                    <Typography variant="h6" component="h3" gutterBottom>
                      {advantage.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {advantage.description}
                    </Typography>
                  </CardContent>
                </AdvantageCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionContainer>

      {/* Sección "Nuestros Productos Destacados" */}
      <SectionContainer>
        <Container maxWidth="lg">
          <SectionTitle variant="h4" component="h2">
            Nuestros Productos Destacados
          </SectionTitle>
          <Grid container spacing={4}>
            {featuredProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard sx={{ animation: `${fadeIn} 1s ease-out forwards`, animationDelay: `${0.2 * index}s`, opacity: 0 }}>
                  <img src={product.image} alt={product.name} />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                      {product.description}
                    </Typography>
                    <Typography variant="h5" color="primary" sx={{ marginTop: 2, fontWeight: 700 }}>
                      {product.price}
                    </Typography>
                    {/* CAMBIO AQUÍ: Botón "Agregar al Carrito" */}
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 2 }}
                      onClick={() => handleAddToCart(product.id)} // Llama a la función addToCart con el ID del producto
                    >
                      Agregar al Carrito
                    </Button>
                  </CardContent>
                </ProductCard>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ marginTop: 6, display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" color="primary" size="large" onClick={verTodosProductos}>
              Ver Todos los Productos
            </Button>
          </Box>
        </Container>
      </SectionContainer>
    </Box>
  );
}

export default HomePage;