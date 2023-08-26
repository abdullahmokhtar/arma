import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

let isSubmitting = false;
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { signIn } = UserAuth();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    isSubmitting=true;
    try {
      await signIn(email, password);
      navigate("/admin");
    } catch (error) {
      if (
        error.message.includes("user-not-found") ||
        error.message.includes("wrong-password")
      ) {
        setError("Invalid username or password");
      } else if (
        error.message.includes(
          "Access to this account has been temporarily disabled"
        )
      ) {
        setError(
          "Your account has been temporarily disabled due to many failed login attempts"
        );
      }else if (error.message.includes("network-request-failed")) {
        setError("There is no internet connection")
      } else {
        setError(error.message);
      }
    }
    isSubmitting = false;

  };
  return (
    <div>
      <h1>Log In </h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="email"
            className="form-control"
            onChange={emailChangeHandler}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            className="form-control"
            onChange={passwordChangeHandler}
            required
          />
        </div>
        <button disabled={isSubmitting} type="submit" className="btn btn-primary w-100 mt-5">
          {isSubmitting? "Logining in..." : "Log in"}
        </button>
        <p className="text-danger">{error}</p>
      </form>
    </div>
  );
};

export default LoginPage;
