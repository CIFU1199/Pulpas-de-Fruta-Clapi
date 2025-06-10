// src/pages/ProductsPage.jsx
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/system';
import productsData from '../data/productsData';
import { useCart } from '../context/CartContext'; // <--- Importa useCart

// Componente estilizado para la tarjeta de producto (sin cambios)
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
    height: 200, // Altura fija para las imágenes
    objectFit: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
}));

function ProductsPage() {
  const { addToCart } = useCart(); // <--- Obtén la función addToCart del contexto

  // Función para manejar el clic en "Agregar al Carrito"
  const handleAddToCart = (productId) => {
    addToCart(productId);
    alert(`Producto agregado al carrito!`); // Puedes cambiar esto por un Toast o Snackbar
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: 'center' }}>
        Nuestras Deliciosas Pulpas
      </Typography>
      <Grid container spacing={4}>
        {productsData.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard>
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
    </Box>
  );
}

export default ProductsPage;