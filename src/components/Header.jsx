import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectSearchQuery, setSearchQuery } from "../redux/cartSlice";
import "./Header.css";

const Header = () => {
  const cartItems = useSelector(selectCartItems);
  const searchQuery = useSelector(selectSearchQuery);
  const dispatch = useDispatch();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <h1 className="logo">ShoppyGlobe</h1>
      </Link>

      <div className="header-right">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="header-search-input"
        />
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/cart" className="cart-link">
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;