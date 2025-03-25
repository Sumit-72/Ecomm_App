"use client"

import { useState, useEffect } from "react"
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native"
import { fetchProducts } from "../services/api"
import ProductCard from "../components/ProductCard"
import { Filter } from "lucide-react-native"

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await fetchProducts()
      setProducts(data)
      setFilteredProducts(data)

      // Extract unique categories
      const uniqueCategories = [...new Set(data.map((item) => item.category))]
      setCategories(uniqueCategories)

      setLoading(false)
    } catch (err) {
      setError("Failed to load products. Please try again.")
      setLoading(false)
    }
  }

  useEffect(() => {
    filterProducts()
  }, [searchQuery, activeCategory, products])

  const filterProducts = () => {
    let result = [...products]

    // Filter by search query
    if (searchQuery) {
      result = result.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((item) => item.category === activeCategory)
    }

    setFilteredProducts(result)
  }

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() =>
        navigation.navigate("ProductDetail", {
          productId: item.id,
          title: item.title,
        })
      }
    />
  )

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadProducts}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilterModal(!showFilterModal)}>
          <Filter size={20} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {showFilterModal && (
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[styles.categoryButton, activeCategory === "all" && styles.activeCategoryButton]}
              onPress={() => setActiveCategory("all")}
            >
              <Text style={[styles.categoryButtonText, activeCategory === "all" && styles.activeCategoryButtonText]}>
                All
              </Text>
            </TouchableOpacity>

            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[styles.categoryButton, activeCategory === category && styles.activeCategoryButton]}
                onPress={() => setActiveCategory(category)}
              >
                <Text
                  style={[styles.categoryButtonText, activeCategory === category && styles.activeCategoryButtonText]}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  productList: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  filterButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  filterContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeCategoryButton: {
    backgroundColor: "#3b82f6",
  },
  categoryButtonText: {
    color: "#333",
  },
  activeCategoryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
})

