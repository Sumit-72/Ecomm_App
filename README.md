# 🛒 React Native E-Commerce App  

## 📌 Overview  
This **React Native E-Commerce App** is designed to showcase products dynamically using the FakeStore API. The app includes essential e-commerce features such as product listing, detailed views, cart management, and wishlist functionality.  

## ✨ Features  
✅ **Product Listing:** Fetches and displays products in a responsive grid.  
✅ **Product Details:** Shows detailed product information with an **"Add to Cart"** button.  
✅ **Navigation:** Implements **React Navigation** with bottom tabs and stack navigation.  
✅ **Cart Management:** Uses **AsyncStorage** to store cart items and calculate totals.  
✅ **Wishlist Feature:** Allows users to **add/remove** products from their wishlist.  
✅ **Search & Filter:** Implements **search functionality** and **category filtering**.  

## 🏗 Key Components  
- 📌 **ProductListScreen** – Grid view of products with search and filter options.  
- 📌 **ProductDetailScreen** – Displays product details with **Add to Cart/Wishlist** buttons.  
- 📌 **CartScreen** – Manages cart with **quantity controls** and total price calculation.  
- 📌 **WishlistScreen** – Displays saved products with a quick **Add to Cart** option.  
- 📌 **Context Providers** – Manages state for **Cart and Wishlist** using React Context API.

## 🚀 Installation & Setup  
Clone this repository and navigate to the project directory:  
```bash
git clone https://github.com/Sumit-72/Ecomm_App.git && cd Ecomm_App
```
Install dependencies and set up the project: 
```bash
npm install  
npx expo prebuild  
npx expo run:android
```
If you encounter errors, try clearing the cache and rebuilding the app:
 ```bash
# For React Native projects
npm start -- --reset-cache
# Then rebuild your app
```

## 📺 Demo & Repository  
🎥 **Demo Video:** [Watch Here](https://drive.google.com/file/d/1Xs1t_vVmh5APcerBoc2ryzTMapBiRfCd/view?usp=drive_link) 

## 🔮 Future Enhancements  
🚀 **Improve UI/UX** for a better user experience.  
🌟 **Product Rating & Review** section.  
🎙️ **Voice Search** functionality.  
🤖 **AI-based Product Recommendations**.  

