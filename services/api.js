import axios from "axios"

const API_URL = "https://fakestoreapi.com"

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`)
    return response.data
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error)
    throw error
  }
}

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/categories`)
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

