import React from 'react';
import { Box, Typography, Container, Grid, Link as MuiLink, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { styled } from '@mui/system';

// Componente estilizado para el fondo del footer (opcional, para un toque tropical)
const FooterBackground = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark, // Un verde oscuro como base
  color: theme.palette.common.white,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  // Opcional: Patrón o forma de onda para un toque tropical
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // Puedes reemplazar esto con un patrón SVG o una imagen PNG sutil
    // Ejemplo de un patrón de hoja sutil (requiere CSS más complejo o SVG)
    // backgroundImage: 'url("/path/to/tropical-pattern.svg")',
    // backgroundSize: 'cover',
    // opacity: 0.1,
    zIndex: 0,
  },
}));

function Footer() {
  return (
    <FooterBackground>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}> {/* Contenido sobre el fondo */}
        <Grid container spacing={4}>
          {/* Columna 1: Información de Contacto */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Clapi Pulpas de Fruta
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Dirección: Calle 123 #45-67, San Gil, Santander, Colombia
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: info@clapi.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Teléfono: +57 310 123 4567
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook" href="#" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram" href="#" target="_blank">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter" href="#" target="_blank">
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Columna 2: Enlaces Rápidos */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Enlaces Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <MuiLink href="/" color="inherit" underline="none" sx={{ mb: 1 }}>Inicio</MuiLink>
              <MuiLink href="/productos" color="inherit" underline="none" sx={{ mb: 1 }}>Productos</MuiLink>
              <MuiLink href="/nosotros" color="inherit" underline="none" sx={{ mb: 1 }}>Sobre Nosotros</MuiLink>
              <MuiLink href="/contacto" color="inherit" underline="none" sx={{ mb: 1 }}>Contacto</MuiLink>
              <MuiLink href="/politica-privacidad" color="inherit" underline="none" sx={{ mb: 1 }}>Política de Privacidad</MuiLink>
            </Box>
          </Grid>

          {/* Columna 3: Información Adicional / Newsletter (ejemplo) */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Mantente Conectado
            </Typography>
            <Typography variant="body2">
              Suscríbete a nuestro boletín para recibir las últimas novedades y ofertas exclusivas.
            </Typography>
            {/* Aquí podrías añadir un campo de email y un botón de suscripción (futuro) */}
          </Grid>
        </Grid>

        {/* Derechos de Autor */}
        <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', mt: 6, pt: 4, textAlign: 'center' }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Clapi Pulpas de Fruta. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </FooterBackground>
  );
}

export default Footer;