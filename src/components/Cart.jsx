import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { selectCartItems } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const items = useSelector(selectCartItems);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0)
    return (
      <div style={{ padding: "20px" }}>
        <h2>Your cart is empty</h2>
        <Link to="/">Go Shopping</Link>
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <h3>Total: ₹{total.toFixed(2)}</h3>
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;