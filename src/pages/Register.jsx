import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Form.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://reqres.in/api/register",
        {
          email,
          password,
        },
        {
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        }
      );
      login(res.data.token, email);
      navigate("/");
    } catch (error) {
      setError("Registration failed. Please check your input.");
      console.log(error.response ? error.response.data : error.message);
    }
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="form-input">
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-input">
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            type={showPassword ? "text" : "password"}
          />
          <span onClick={handleShowPassword} className="password-toggle">
            {showPassword ? (
              <ion-icon name="eye-off-outline"></ion-icon>
            ) : (
              <ion-icon name="eye-outline"></ion-icon>
            )}
          </span>
        </div>
        <button type="submit" className="form-button">
          Create Account
        </button>
        <p className="form-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
