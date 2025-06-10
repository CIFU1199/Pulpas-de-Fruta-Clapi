// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import {
  Box, Typography, Button, TextField, Grid, Paper,
  List, ListItem, ListItemText, Divider
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { putItem, ORDERS_STORE_NAME } from '../services/indexedDBService'; // Para guardar el pedido

function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Estado para los datos del formulario de envío
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  // Manejador de cambios para los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para formatear el número a moneda colombiana
  const formatCurrency = (value) => {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  // Manejador del envío del formulario (simulación de pago)
  const handlePlaceOrder = async (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    if (cartItems.length === 0) {
      alert('Tu carrito está vacío. No puedes proceder con la compra.');
      navigate('/productos');
      return;
    }

    // Validación básica de los campos
    const { name, email, address, city, postalCode, country } = formData;
    if (!name || !email || !address || !city || !postalCode || !country) {
      alert('Por favor, completa todos los campos del formulario de envío.');
      return;
    }

    // Generar un ID de pedido simple (para simulación)
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const orderDate = new Date().toLocaleString();

    const order = {
      id: orderId, // IndexedDB usará este como keyPath o generará uno si autoIncrement es true
      date: orderDate,
      customerInfo: formData,
      items: cartItems,
      total: getCartTotal(),
      status: 'Procesado', // Estado de la orden
    };

    try {
      // Guardar el pedido en IndexedDB
      await putItem(ORDERS_STORE_NAME, order);
      // Limpiar el carrito después de la compra
      await clearCart();

      alert('¡Compra simulada con éxito! Redireccionando a la factura.');
      // Redirigir a la página de confirmación de pedido con los datos del pedido
      navigate('/confirmacion-pedido', { state: { order } });

    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      alert('Hubo un error al procesar tu compra. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: '900px', margin: 'auto', mt: 4, mb: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: 'center', mb: 5, fontWeight: 700 }}>
        Finalizar Compra
      </Typography>

      <Grid container spacing={4}>
        {/* Columna Izquierda: Detalles del Pedido */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Resumen del Pedido
            </Typography>
            <List>
              {cartItems.length === 0 ? (
                <Typography variant="body1" color="text.secondary">Tu carrito está vacío.</Typography>
              ) : (
                cartItems.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={`${item.name} x ${item.quantity}`}
                        secondary={formatCurrency(item.price * item.quantity)}
                      />
                    </ListItem>
                    <Divider component="li" sx={{ my: 1 }} />
                  </React.Fragment>
                ))
              )}
            </List>
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'right' }}>
                Total a Pagar: {formatCurrency(getCartTotal())}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Columna Derecha: Formulario de Envío y Pago */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Información de Envío
            </Typography>
            <form onSubmit={handlePlaceOrder}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Nombre Completo"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Correo Electrónico"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Dirección"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Ciudad"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Código Postal"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="País"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>

              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 3 }}>
                Método de Pago
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, mb: 3, textAlign: 'center', borderColor: 'primary.main', border: '2px dashed' }}>
                <Typography variant="body1" color="text.secondary">
                  Simulación de pago: No se requiere información de tarjeta real.
                  <br />
                  Haz clic en "Pagar" para completar la compra.
                </Typography>
              </Paper>

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                sx={{ mt: 3 }}
                disabled={cartItems.length === 0}
              >
                Pagar
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CheckoutPage;