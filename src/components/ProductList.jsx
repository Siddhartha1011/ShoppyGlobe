import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import useProducts from "../hooks/useProducts";
import { selectSearchQuery } from "../redux/cartSlice";
import "./ProductList.css";

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const searchQuery = useSelector(selectSearchQuery);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="product-list-container">
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <p className="no-products">No products found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
