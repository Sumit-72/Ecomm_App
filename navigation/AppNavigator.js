import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { ShoppingBag, Heart, ShoppingCart } from "lucide-react-native"

import ProductListScreen from "../screens/ProductListScreen"
import ProductDetailScreen from "../screens/ProductDetailScreen"
import CartScreen from "../screens/CartScreen"
import WishlistScreen from "../screens/WishlistScreen"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function ProductStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: "#f0f0f0",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: "Products" }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params?.title || "Product Details" })}
      />
    </Stack.Navigator>
  )
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <ShoppingBag size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => <ShoppingCart size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

