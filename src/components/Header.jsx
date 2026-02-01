import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">ShoppyGlobe</h1>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart </Link>
      </nav>
    </header>
  );
};

export default Header;