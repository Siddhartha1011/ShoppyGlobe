import { useEffect, useState } from "react";

// Base URL of the backend API
// NOTE: PORT is 3000 in .env, so we use 3000 here.
const API_BASE_URL = "http://localhost:3000/api";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();

        // Normalize backend shape (Mongo) to what the UI expects
        const normalized = (Array.isArray(data) ? data : []).map((p) => ({
          id: p.id || p._id, // React list key & cart usage
          title: p.title || p.name || "",
          description: p.description || "",
          price: p.price ?? 0,
          thumbnail: p.thumbnail || p.imageUrl || "",
        }));

        setProducts(normalized);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;


