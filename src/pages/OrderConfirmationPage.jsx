// src/pages/OrderConfirmationPage.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, List, ListItem, ListItemText, Divider, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { getItem, ORDERS_STORE_NAME } from '../services/indexedDBService'; // Para intentar recuperar el pedido si no se pasó

function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para formatear el número a moneda colombiana
  const formatCurrency = (value) => {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  useEffect(() => {
    const fetchOrder = async () => {
      // Intenta obtener el pedido de la navegación (preferido)
      if (location.state && location.state.order) {
        setOrder(location.state.order);
      } else {
        // Si no se pasó por la navegación, intenta recuperarlo de IndexedDB
        // Esto sería más robusto si pasáramos solo el orderId y lo buscáramos,
        // pero por simplicidad, si no hay 'state', asumimos que no hay un pedido reciente válido
        // y podrías redirigir o mostrar un mensaje de error.
        // Para una implementación real, aquí buscarías el ID de la última orden o un ID específico.
        console.warn('No se pasó el pedido a la página de confirmación. Intenta buscar el último pedido en IndexedDB (no implementado en este ejemplo por simplicidad).');
        // Redirige al inicio si no hay datos de pedido
        navigate('/');
      }
      setLoading(false);
    };

    fetchOrder();
  }, [location.state, navigate]); // Dependencias del useEffect

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', mt: 10 }}>
        <Typography variant="h5">Cargando confirmación de pedido...</Typography>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', mt: 10 }}>
        <Typography variant="h5" color="error">
          No se encontró información del pedido.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')} sx={{ mt: 3 }}>
          Volver al Inicio
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: '800px', margin: 'auto', mt: 4, mb: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'primary.light' }}>
        <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: 700 }}>
          ¡Pedido Confirmado!
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', mb: 3 }}>
          Gracias por tu compra en Clapi Pulpas de Fruta. Aquí están los detalles de tu pedido:
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Número de Pedido:</Typography>
            <Typography variant="body1">{order.id}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Fecha del Pedido:</Typography>
            <Typography variant="body1">{order.date}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Información del Cliente
        </Typography>
        <Typography variant="body1">**Nombre:** {order.customerInfo.name}</Typography>
        <Typography variant="body1">**Correo:** {order.customerInfo.email}</Typography>
        <Typography variant="body1">**Dirección:** {order.customerInfo.address}, {order.customerInfo.city}, {order.customerInfo.postalCode}, {order.customerInfo.country}</Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Detalles del Pedido
        </Typography>
        <List>
          {order.items.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ py: 0.5 }}>
              <ListItemText
                primary={`${item.name} (x${item.quantity})`}
                secondary={formatCurrency(item.price * item.quantity)}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItem>
          ))}
          <Divider sx={{ mt: 1, mb: 1 }} />
          <ListItem disablePadding sx={{ py: 0.5 }}>
            <ListItemText
              primary={<Typography variant="h6" sx={{ fontWeight: 700 }}>Total Final:</Typography>}
              secondary={<Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>{formatCurrency(order.total)}</Typography>}
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/')}
          >
            Volver a la Tienda
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default OrderConfirmationPage;