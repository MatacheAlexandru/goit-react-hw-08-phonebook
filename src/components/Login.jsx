import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/contacts");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className={styles["login-container"]}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles["input"]}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles["input"]}
        />

        {error && <p className={styles["error-message"]}>Error: {error}</p>}

        <button type="submit" className={styles["button"]}>
          Login
        </button>
      </form>

      <p>Don't have an account?</p>
      <button
        onClick={() => navigate("/register")}
        className={styles["button"]}
      >
        Go to Register
      </button>
    </div>
  );
};

export default Login;
