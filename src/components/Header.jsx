import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectSearchQuery,
  setSearchQuery,
} from "../redux/cartSlice";
import "./Header.css";

const Header = () => {
  const cartItems = useSelector(selectCartItems);
  const searchQuery = useSelector(selectSearchQuery);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        setCurrentUser(null);
      }
    }
  }, []);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
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
          {currentUser ? (
            <>
              <span className="user-greeting">Hi, {currentUser.name}</span>
              <button type="button" onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth">Sign In</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
