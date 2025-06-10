// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Badge } from '@mui/material'; // Importa Badge para el contador
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <--- Importa el hook useCart

function Navbar() {
  const { getTotalItems } = useCart(); // <--- Obtén la función getTotalItems del contexto

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo/Título de la tienda que enlaza a la página de inicio */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 600 }}
        >
          Clapi Pulpas de Fruta
        </Typography>

        {/* Botones de navegación */}
        <Button color="inherit" component={Link} to="/">Inicio</Button>
        <Button color="inherit" component={Link} to="/productos">Productos</Button>
        <Button color="inherit" component={Link} to="/nosotros">Nosotros</Button>
        <Button color="inherit" component={Link} to="/contacto">Contacto</Button>

        {/* Botones de acción derecha (Login/Registro y Carrito) */}
        <Box sx={{ marginLeft: 2 }}>
          {/*<Button color="inherit" component={Link} to="/login">Iniciar Sesión</Button>*/}
          <Button color="inherit" component={Link} to="/carrito">
            <Badge badgeContent={getTotalItems()} color="secondary"> {/* <--- Usa Badge para el contador de ítems */}
              <ShoppingCartIcon />
            </Badge>
            Carrito
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;