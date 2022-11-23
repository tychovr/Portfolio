import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../../../components/navbar/navbar";
import { logIn, auth } from "../../../components/database/login";
import "./login.scss";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, user] = useAuthState(auth);

  const navigate = useNavigate();

  const handleLogin = (e: any) => {
    logIn(email, password);
  };

  useEffect(() => {
    document.title = "Admin Login";

    if (loading) {
        return;
    }
    if (user) {
        navigate(-1);
    }
  }, [user, loading]);

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-content">
        <div className="login">
          <div className="login-form">
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
              <div className="login-input">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
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
