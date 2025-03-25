import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "react-native"
import AppNavigator from "./navigation/AppNavigator"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <WishlistProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </WishlistProvider>
    </NavigationContainer>
  )
}

