"use client"

import { createContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // Load cart from AsyncStorage on app start
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart")
        if (storedCart) {
          setCart(JSON.parse(storedCart))
        }
      } catch (error) {
        console.error("Error loading cart from storage:", error)
      }
    }

    loadCart()
  }, [])

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem("cart", JSON.stringify(cart))
      } catch (error) {
        console.error("Error saving cart to storage:", error)
      }
    }

    saveCart()
  }, [cart])

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id)

      if (existingProductIndex > -1) {
        // Product exists, increase quantity
        const updatedCart = [...prevCart]
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        }
        return updatedCart
      } else {
        // Product doesn't exist, add new item
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    )
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

