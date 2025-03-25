"use client"

import { useState, useEffect, useContext } from "react"
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native"
import { fetchProductById } from "../services/api"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import { Heart, ShoppingCart } from "lucide-react-native"

export default function ProductDetailScreen({ route }) {
  const { productId } = route.params
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { addToCart } = useContext(CartContext)
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext)

  const isInWishlist = wishlist.some((item) => item.id === productId)

  useEffect(() => {
    loadProductDetails()
  }, [productId])

  const loadProductDetails = async () => {
    try {
      setLoading(true)
      const data = await fetchProductById(productId)
      setProduct(data)
      setLoading(false)
    } catch (err) {
      setError("Failed to load product details. Please try again.")
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    addToCart(product)
  }

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(product)
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    )
  }

  if (error || !product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || "Product not found"}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadProductDetails}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        <TouchableOpacity style={styles.wishlistButton} onPress={toggleWishlist}>
          <Heart size={24} color={isInWishlist ? "#f43f5e" : "#64748b"} fill={isInWishlist ? "#f43f5e" : "none"} />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.category}>{product.category.toUpperCase()}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {product.rating.rate}</Text>
          <Text style={styles.ratingCount}>({product.rating.count} reviews)</Text>
        </View>

        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <ShoppingCart size={20} color="#fff" />
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 300,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  wishlistButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    padding: 16,
  },
  category: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3b82f6",
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f59e0b",
    marginRight: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: "#64748b",
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#334155",
    marginBottom: 24,
  },
  addToCartButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
})

