import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    console.log("Added to cart:", product);
  };

  if (loading) return <h2>Loading product...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <img
        src={product.thumbnail}
        alt={product.title}
        width="300"
        loading="lazy"
      />

      <h2>{product.title}</h2>
      <p>{product.description}</p>

      <h3>₹{product.price}</h3>

      <p><strong>Rating:</strong> {product.rating}/5</p>
      <p><strong>Availability:</strong> {product.availabilityStatus}</p>

      <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
      <p><strong>Shipping:</strong> {product.shippingInformation}</p>
      <p><strong>Return Policy:</strong> {product.returnPolicy}</p>

      {/* Add to Cart Button */}
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>

      <h3>Reviews</h3>
      {product.reviews && product.reviews.length > 0 ? (
        product.reviews.map((review, index) => (
          <div key={index}>
            <p><strong>{review.reviewerName}</strong></p>
            <p>Rating: {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default ProductDetail;