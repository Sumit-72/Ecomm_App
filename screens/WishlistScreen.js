"use client"

import { useContext } from "react"
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native"
import { WishlistContext } from "../context/WishlistContext"
import { CartContext } from "../context/CartContext"
import { Heart, ShoppingCart } from "lucide-react-native"

export default function WishlistScreen({ navigation }) {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext)
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const renderItem = ({ item }) => (
    <View style={styles.wishlistItem}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetail", {
            productId: item.id,
            title: item.title,
          })
        }
      >
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      </TouchableOpacity>

      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
            <ShoppingCart size={16} color="#fff" />
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.removeButton} onPress={() => removeFromWishlist(item.id)}>
            <Heart size={20} color="#f43f5e" fill="#f43f5e" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  if (wishlist.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your wishlist is empty</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 16,
    color: "#64748b",
  },
  listContainer: {
    padding: 16,
  },
  wishlistItem: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3b82f6",
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  addToCartButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#3b82f6",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fee2e2",
    justifyContent: "center",
    alignItems: "center",
  },
})

