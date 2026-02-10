import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";

// Lazy load all components
const ProductList = lazy(() => import("./components/ProductList"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const Cart = lazy(() => import("./components/Cart"));
const Checkout = lazy(() => import("./components/Checkout"));
const NotFound = lazy(() => import("./components/NotFound"));
const Auth = lazy(() => import("./components/Auth"));

// Layout component with Header
const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

// Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

