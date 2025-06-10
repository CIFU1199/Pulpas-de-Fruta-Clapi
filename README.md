Clapi Pulpas de Fruta

(Nota: Esta imagen es un placeholder, puedes reemplazarla con una captura de pantalla real de tu aplicación.)

¡Bienvenido al repositorio del proyecto Clapi Pulpas de Fruta! Esta es una aplicación web moderna construida con React y Material-UI que simula una tienda en línea para la venta de pulpas de fruta 100% naturales. El proyecto incluye un carrito de compras interactivo con persistencia de datos local (IndexedDB) y un flujo de simulación de pago que genera una factura.
🚀 Funcionalidades Principales

    Página de Inicio (/): Presenta la marca Clapi, destaca los beneficios de las pulpas y muestra algunos productos destacados.
    Página de Productos (/productos): Muestra una lista completa de todas las pulpas disponibles, con sus descripciones y precios.
    Carrito de Compras (/carrito):
        Añadir productos al carrito desde cualquier página de productos.
        Ver los ítems en el carrito con su cantidad, precio unitario y subtotal.
        Ajustar la cantidad de cada producto en el carrito.
        Eliminar productos del carrito.
        Calcula y muestra el total general del carrito.
        Persistencia de Datos: El contenido del carrito se guarda en el navegador usando IndexedDB, por lo que no se pierde al recargar la página o cerrar el navegador.
    Simulación de Checkout (/checkout):
        Formulario para ingresar la información de envío del cliente.
        Resumen del pedido antes de "pagar".
        Simulación de un proceso de pago (no hay pasarela de pago real).
    Confirmación de Pedido / Factura (/confirmacion-pedido):
        Muestra los detalles de la compra realizada, actuando como una factura simulada.
        Incluye número de pedido, fecha, información del cliente y desglose de los productos comprados con el total final.
        Después de la compra, el carrito se vacía automáticamente.
        Los pedidos "pagados" se guardan en IndexedDB para un posible historial de compras futuro.
    Navegación Intuitiva: Una barra de navegación clara con un contador de ítems en el carrito.
    Diseño Responsivo: Adaptado para verse bien en diferentes tamaños de pantalla (móviles, tablets, escritorio).

🛠️ Tecnologías Utilizadas

    React: Biblioteca de JavaScript para construir interfaces de usuario.
    Material-UI (MUI): Framework de componentes React que implementa Material Design de Google, para un diseño rápido y atractivo.
    React Router DOM: Para la gestión de rutas y navegación en la aplicación.
    IndexedDB: API de bajo nivel para almacenar grandes cantidades de datos estructurados en el navegador del cliente.
    Vite: Un bundler de desarrollo moderno y rápido.

⚙️ Configuración y Ejecución del Proyecto

Sigue estos pasos para poner en marcha el proyecto en tu máquina local.
Prerrequisitos

Asegúrate de tener instalado Node.js (versión 18 o superior) y npm (o Yarn).
Instalación

    Clona este repositorio (si aún no lo has hecho):
    Bash

git clone <URL_DEL_REPOSITORIO> # Reemplaza <URL_DEL_REPOSITORIO> con la URL de tu repo
cd clapi-pulpas-de-fruta

Instala las dependencias:
Bash

    npm install
    # o si usas yarn
    # yarn install

Ejecución

    Inicia el servidor de desarrollo:
    Bash

    npm run dev
    # o si usas yarn
    # yarn dev

    Abre tu navegador web y visita la URL que te proporcionará Vite (normalmente http://localhost:5173/).

📂 Estructura de Archivos Clave

Aquí hay un resumen de los archivos y carpetas más importantes del proyecto:

clapi-pulpas-de-fruta/
├── public/                 # Archivos estáticos (ej. imágenes de productos)
├── src/
│   ├── assets/             # Activos como el logo, etc.
│   ├── components/         # Componentes reutilizables (Navbar, Footer, etc.)
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── context/            # Contextos de React para la gestión global del estado
│   │   └── CartContext.jsx # Lógica del carrito de compras y conexión a IndexedDB
│   ├── data/               # Datos estáticos (ej. products.js)
│   │   └── products.js     # Información de los productos
│   ├── pages/              # Componentes de las páginas principales de la aplicación
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── CartPage.jsx        # Página para visualizar y gestionar el carrito
│   │   ├── CheckoutPage.jsx    # Página para la simulación de pago
│   │   └── OrderConfirmationPage.jsx # Página de factura/confirmación de pedido
│   ├── services/           # Lógica para interactuar con APIs externas o IndexedDB
│   │   └── indexedDBService.js # Funciones para manejar la base de datos IndexedDB
│   ├── theme/              # Configuración del tema de Material-UI
│   │   └── customTheme.js
│   ├── App.jsx             # Componente principal de la aplicación y configuración de rutas
│   └── main.jsx            # Punto de entrada de la aplicación (renderiza App, envuelve con Providers)
├── .gitignore              # Archivos y carpetas a ignorar por Git
├── index.html              # Archivo HTML principal
├── package.json            # Metadatos del proyecto y dependencias
├── vite.config.js          # Configuración de Vite
└── README.md               # Este archivo

📈 Próximos Pasos Potenciales

Este proyecto es una base sólida, pero siempre hay espacio para mejoras y nuevas funcionalidades:

    Historial de Pedidos: Una página donde los usuarios autenticados puedan ver sus compras anteriores (los pedidos ya se guardan en IndexedDB).
    Autenticación de Usuarios: Implementar un sistema de registro/login (con IndexedDB o una API real).
    Detalle del Producto: Una página dedicada para cada producto con más información.
    Búsqueda y Filtrado: Funcionalidad para buscar productos o filtrarlos por categoría.
    Notificaciones: Usar un componente de Snackbar o Toast de Material-UI para confirmaciones (ej. "Producto añadido al carrito").
    Despliegue: Publicar la aplicación en un servicio de hosting (ej. Vercel, Netlify).
