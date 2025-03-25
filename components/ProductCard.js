import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "#f9f9f9",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    height: 40,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3b82f6",
  },
})

