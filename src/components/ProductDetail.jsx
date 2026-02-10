import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "./ProductDetail.css";

const API_BASE_URL = "http://localhost:3000/api";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        // Normalize product shape from backend
        const normalized = {
          id: data._id || data.id,
          title: data.title || data.name || "",
          description: data.description || "",
          price: data.price ?? 0,
          thumbnail: data.thumbnail || data.imageUrl || "",
          stockQuantity: data.stockQuantity ?? 0,
        };

        setProduct(normalized);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        })
      );
    }
  };

  if (loading) return <h2>Loading product...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="product-detail">
      {/* Image + Description Container */}
      <div className="product-main-container">
        {/* Image Card */}
        <div className="product-card image-card">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Description Card */}
        <div className="product-card description-card">
          <h2>{product.title}</h2>
          <p className="description">{product.description}</p>

          <h3 className="price">${product.price}</h3>

          <p>
            <strong>In stock:</strong>{" "}
            <span className="info-value">{product.stockQuantity}</span>
          </p>

          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;