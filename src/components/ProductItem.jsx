import { Link } from "react-router-dom";

const ProductItem = ({ product, onAddToCart }) => {
  return (
    <div className="product-item">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        <h3>{product.title}</h3>
      </Link>

      <p>₹{product.price}</p>

      <button onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;