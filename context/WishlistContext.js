"use client"

import { createContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([])

  // Load wishlist from AsyncStorage on app start
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const storedWishlist = await AsyncStorage.getItem("wishlist")
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist))
        }
      } catch (error) {
        console.error("Error loading wishlist from storage:", error)
      }
    }

    loadWishlist()
  }, [])

  // Save wishlist to AsyncStorage whenever it changes
  useEffect(() => {
    const saveWishlist = async () => {
      try {
        await AsyncStorage.setItem("wishlist", JSON.stringify(wishlist))
      } catch (error) {
        console.error("Error saving wishlist to storage:", error)
      }
    }

    saveWishlist()
  }, [wishlist])

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      // Check if product already exists in wishlist
      const existingProduct = prevWishlist.find((item) => item.id === product.id)

      if (existingProduct) {
        // Product already in wishlist, don't add again
        return prevWishlist
      } else {
        // Product doesn't exist, add new item
        return [...prevWishlist, product]
      }
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId))
  }

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId)
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

