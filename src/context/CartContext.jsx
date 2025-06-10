// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  openDB,           // Función para abrir la DB
  getAllItems,      // Para obtener todos los ítems del carrito
  putItem,          // Para añadir/actualizar un ítem
  deleteItem,       // Para eliminar un ítem
  clearStore,       // Para limpiar todo el carrito
  CART_STORE_NAME   // El nombre del Object Store del carrito
} from '../services/indexedDBService';
import productsData from '../data/productsData'; // Necesitamos los datos de los productos para obtener su información completa (imagen, descripción, etc.)

// 1. Crea el contexto
const CartContext = createContext();

// 2. Crea el Proveedor del Contexto
export const CartProvider = ({ children }) => {
  // Estado local para los ítems del carrito
  const [cartItems, setCartItems] = useState([]);
  // Un estado para saber si IndexedDB está listo (importante para evitar operaciones antes de que la DB esté abierta)
  const [dbReady, setDbReady] = useState(false);

  // useEffect para cargar el carrito desde IndexedDB cuando el componente se monta
  useEffect(() => {
    const loadCart = async () => {
      try {
        await openDB(); // Asegurarse de que la DB esté abierta
        const items = await getAllItems(CART_STORE_NAME);
        setCartItems(items); // Cargar los ítems en el estado de React
        setDbReady(true); // La DB está lista
      } catch (error) {
        console.error('Error al cargar el carrito desde IndexedDB:', error);
        setDbReady(true); // Aunque haya error, la DB ha intentado abrirse
      }
    };
    loadCart();
  }, []); // Se ejecuta solo una vez al montar el componente

  // Función para añadir un producto al carrito
  const addToCart = async (productId) => {
    if (!dbReady) { // Si la DB no está lista, no hacemos nada
      console.warn("IndexedDB no está listo. No se puede agregar al carrito.");
      return;
    }

    // Busca si el producto ya existe en el carrito local
    const existingItem = cartItems.find(item => item.id === productId);
    // Busca la información completa del producto en tu lista de productos (productsData)
    const productToAdd = productsData.find(p => p.id === productId);

    if (!productToAdd) {
      console.error('Producto no encontrado en la lista de productos:', productId);
      return;
    }

    let updatedCartItems;
    if (existingItem) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      updatedCartItems = cartItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Si es un producto nuevo, lo añade al carrito con cantidad 1
      const newItem = {
        id: productToAdd.id,
        name: productToAdd.name,
        // Convertir el precio a un número para cálculos. Elimina '$', '.' y reemplaza ',' por '.'
        price: parseFloat(productToAdd.price.replace('$', '').replace(/\./g, '').replace(',', '.')),
        image: productToAdd.image,
        quantity: 1,
      };
      updatedCartItems = [...cartItems, newItem];
    }
    setCartItems(updatedCartItems); // Actualiza el estado de React

    // Persiste el cambio en IndexedDB
    const itemToPersist = updatedCartItems.find(item => item.id === productId);
    if (itemToPersist) {
      await putItem(CART_STORE_NAME, itemToPersist);
    }
  };

  // Función para remover un producto del carrito
  const removeFromCart = async (productId) => {
    if (!dbReady) {
      console.warn("IndexedDB no está listo. No se puede remover del carrito.");
      return;
    }
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems); // Actualiza el estado de React
    await deleteItem(CART_STORE_NAME, productId); // Elimina de IndexedDB
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateItemQuantity = async (productId, newQuantity) => {
    if (!dbReady) {
      console.warn("IndexedDB no está listo. No se puede actualizar la cantidad.");
      return;
    }
    if (newQuantity <= 0) {
      removeFromCart(productId); // Si la cantidad es 0 o menos, lo eliminamos
      return;
    }
    const updatedCartItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems); // Actualiza el estado de React

    // Persiste el cambio en IndexedDB
    const itemToPersist = updatedCartItems.find(item => item.id === productId);
    if (itemToPersist) {
      await putItem(CART_STORE_NAME, itemToPersist);
    }
  };

  // Función para limpiar todo el carrito
  const clearCart = async () => {
    if (!dbReady) {
      console.warn("IndexedDB no está listo. No se puede limpiar el carrito.");
      return;
    }
    setCartItems([]); // Vacía el estado de React
    await clearStore(CART_STORE_NAME); // Limpia el Object Store en IndexedDB
  };

  // Calcula el número total de ítems en el carrito (para el contador en la Navbar)
  const getTotalItems = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Calcula el subtotal del carrito
  const getCartTotal = () => {
    // Asegúrate de que el precio sea un número para la suma
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  // El valor que se proveerá a todos los componentes que usen este contexto
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    getTotalItems,
    getCartTotal,
    dbReady // Útil para que los componentes sepan cuándo pueden interactuar con el carrito
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Hook personalizado para usar el contexto del carrito fácilmente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};