import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./notfound.scss";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 | Tycho van Rosmalen";
  }, []);

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound">
          <h1>404</h1>
          <h2>Oops! You seem to be lost.</h2>
          <p>
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </p>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      </div>

      <div className="mobile-notlandscape">
          <img src="assets/rotatedevice.gif" alt="rotate device"/>
          <h2>Please rotate your device for a better experience.</h2>
      </div>
    </div>
  );
};

export default NotFound;
