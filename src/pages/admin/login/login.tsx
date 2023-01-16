import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../../components/database/login";
import "./login.scss";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e: any) => {
    e.preventDefault();
    logIn(email, password);
    navigate(-1);
  };

  useEffect(() => {
    document.title = "Admin Login";

    if (localStorage.getItem("user")) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login">
          <div className="login-form">
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
              <div className="login-input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
