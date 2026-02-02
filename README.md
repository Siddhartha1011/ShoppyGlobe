# ShoppyGlobe 🛒

A modern, full-featured e-commerce application built with React and Vite. ShoppyGlobe provides a seamless shopping experience with product browsing, cart management, and checkout functionality.

**Repository Link:** [https://github.com/yourusername/ShoppyGlobe](https://github.com/yourusername/ShoppyGlobe)

##  Features

### Component Structure
- **App**: Main application component with routing
- **Header**: Navigation menu with shopping cart icon and item count
- **ProductList**: Displays a grid of products with search functionality
- **ProductItem**: Individual product card with "Add to Cart" button
- **ProductDetail**: Detailed product view with reviews and specifications
- **Cart**: Shopping cart with quantity management
- **CartItem**: Individual cart item with quantity controls
- **Checkout**: Order form with user details and order summary
- **NotFound**: 404 error page with proper error details

### Key Functionalities

**Product Management**
- Fetch products from DummyJSON API
- Search and filter products in real-time
- View detailed product information
- Lazy loading for images and components

**Shopping Cart**
- Add products to cart
- Adjust quantities (minimum 1)
- Remove items from cart
- View cart total

**Checkout Process**
- Collect user shipping information
- Display order summary
- Place order and clear cart
- Automatic redirect to home page

**State Management**
- Redux Toolkit for cart state
- Redux state for search functionality
- Persistent cart across navigation

**Performance Optimization**
- Code splitting with React.lazy
- Suspense for loading states
- Lazy loading for images
- Optimized component rendering

**Routing**
- React Router with createBrowserRouter
- Dynamic routes for product details
- Protected routes and 404 handling

**Responsive Design**
- Mobile-first approach
- Responsive grid layouts
- Adaptive navigation
- Touch-friendly interactions

## Tech Stack

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **Redux Toolkit 2.11.2** - State management
- **React Router DOM 7.13.0** - Routing
- **React Redux 9.2.0** - Redux bindings

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ShoppyGlobe.git
cd ShoppyGlobe/shoppyglobe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

##  Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

##  Project Structure

```
shoppyglobe/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Cart.jsx
│   │   ├── Cart.css
│   │   ├── CartItem.jsx
│   │   ├── CartItem.css
│   │   ├── Checkout.jsx
│   │   ├── Checkout.css
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── NotFound.jsx
│   │   ├── NotFound.css
│   │   ├── ProductDetail.jsx
│   │   ├── ProductDetail.css
│   │   ├── ProductItem.jsx
│   │   ├── ProductList.jsx
│   │   └── ProductList.css
│   ├── hooks/
│   │   └── useProducts.js
│   ├── redux/
│   │   ├── cartSlice.js
│   │   └── store.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

##  Features Breakdown

### Custom Hooks
- **useProducts**: Custom hook for fetching products from API with loading and error states

### Redux Store
- **Cart State**: Manages cart items, quantities, and search query
- **Actions**: addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, setSearchQuery
- **Selectors**: selectCartItems, selectSearchQuery

### Routing
- `/` - Home page (ProductList)
- `/products/:id` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `*` - 404 Not Found page

### API Integration
- **Products API**: `https://dummyjson.com/products`
- **Product Detail API**: `https://dummyjson.com/products/:id`

##  Styling

- Modern, clean UI design
- Responsive CSS with media queries
- Consistent color scheme
- Smooth transitions and hover effects
- Mobile-optimized layouts

##  Development

This project uses:
- **Vite** for fast development and building
- **ESLint** for code quality
- **React 19** with latest features
- **Redux Toolkit** for efficient state management

##  Notes

- The application uses DummyJSON API for product data
- Cart state is managed in Redux and persists during navigation
- All images are lazy-loaded for better performance
- Components are code-split for optimal bundle size


