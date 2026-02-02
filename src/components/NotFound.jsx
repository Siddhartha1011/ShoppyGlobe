import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          The page you are looking for does not exist or has been moved.
        </p>
        <p className="error-details">
          Error Details: The requested URL was not found on this server. Please
          check the URL and try again, or return to the home page.
        </p>
        <Link to="/" className="home-link">
          <button className="home-button">Go to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

