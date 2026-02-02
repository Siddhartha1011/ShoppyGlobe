import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

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
    if (product) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail
      }));
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
  
          <p><strong>Rating:</strong> <span className="info-value">{product.rating}/5</span></p>
          <p><strong>Availability:</strong> <span className="info-value">{product.availabilityStatus}</span></p>
          <p><strong>Warranty:</strong> <span className="info-value">{product.warrantyInformation}</span></p>
          <p><strong>Shipping:</strong> <span className="info-value">{product.shippingInformation}</span></p>
          <p><strong>Return Policy:</strong> <span className="info-value">{product.returnPolicy}</span></p>
  
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
  
      {/* Reviews Section */}
      <div className="reviews-card">
        <h3>Reviews</h3>
  
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div className="review-item" key={index}>
              <p className="reviewer">{review.reviewerName}</p>
              <p>
                <span className="rating-label">Rating:</span>
                <span className="rating-value">{review.rating}/5</span>
              </p>
              <p className="comment">{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;