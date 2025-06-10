// src/pages/CartPage.jsx
import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Divider, IconButton, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext'; // <--- Importa el hook useCart
import { useNavigate } from 'react-router-dom'; // Para la navegación programática

function CartPage() {
  // Obtiene las funciones y el estado del carrito del contexto
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate(); // Hook para navegar programáticamente

  // Función para manejar el clic en "Proceder al Pago"
  const handleCheckout = () => {
    navigate('/checkout'); // Navegar a la página de checkout (la crearemos luego)
  };

  // Función para formatear el número a moneda colombiana
  const formatCurrency = (value) => {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  return (
    <Box sx={{ p: 4, maxWidth: '900px', margin: 'auto', mt: 4, mb: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: 'center', mb: 5, fontWeight: 700 }}>
        Tu Carrito de Compras
      </Typography>

      {/* Muestra un mensaje si el carrito está vacío */}
      {cartItems.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary', mt: 6 }}>
          Tu carrito está vacío. ¡Explora nuestras pulpas y añade algunas!
        </Typography>
      ) : (
        <>
          <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
            {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem sx={{ py: 2, px: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' } }}>
                  {/* Sección de la imagen del producto */}
                  <Box sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 100 }, height: { xs: 100, sm: 100 }, flexShrink: 0 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', borderRadius: 8, objectFit: 'cover' }}
                    />
                  </Box>

                  {/* Sección de texto del producto (nombre y descripción) */}
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {item.description || 'Sin descripción.'}
                      </Typography>
                    }
                    sx={{ flexGrow: 1, mb: { xs: 2, sm: 0 } }}
                  />

                  {/* Controles de cantidad y precio */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 2, sm: 0 }, minWidth: { sm: 250 }, justifyContent: { xs: 'space-between', sm: 'flex-end' } }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, mr: 2 }}>
                      {formatCurrency(item.price)} c/u
                    </Typography>
                    <IconButton
                      edge="end"
                      aria-label="restar"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1} // Deshabilita si la cantidad es 1 para no ir a 0
                      size="small"
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ mx: 1, minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      edge="end"
                      aria-label="sumar"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      size="small"
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="eliminar"
                      onClick={() => removeFromCart(item.id)}
                      sx={{ ml: { xs: 0, sm: 2 } }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider component="li" /> {/* Separador entre ítems */}
              </React.Fragment>
            ))}
          </List>

          {/* Sección de resumen del carrito y botón de checkout */}
          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'right' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Total: {formatCurrency(getCartTotal())}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleCheckout}
              disabled={!cartItems.length} // Deshabilita el botón si el carrito está vacío
            >
              Proceder al Pago
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default CartPage;