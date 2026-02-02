import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { selectCartItems } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const items = useSelector(selectCartItems);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0)
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <Link to="/">Go Shopping</Link>
        </div>
      </div>
    );

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h2>Your Cart</h2>
        <div className="cart-items">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="cart-total">
          <h3>Total: ${total.toFixed(2)}</h3>
          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;