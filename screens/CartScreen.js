"use client"

import { useContext } from "react"
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native"
import { CartContext } from "../context/CartContext"
import { Minus, Plus, Trash2 } from "lucide-react-native"

export default function CartScreen() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, getCartTotal } = useContext(CartContext)

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />

      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(item.id)}>
            <Minus size={16} color="#3b82f6" />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(item.id)}>
            <Plus size={16} color="#3b82f6" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
        <Trash2 size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  )

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${getCartTotal().toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>$0.00</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${getCartTotal().toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
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
  cartItem: {
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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "500",
  },
  removeButton: {
    justifyContent: "center",
    padding: 8,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3b82f6",
  },
  checkoutButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})

