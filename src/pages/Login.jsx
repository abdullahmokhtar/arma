import React, { useState } from "react";
import { string, object } from "yup";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const validationSchema = object({
    email: string()
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      ),
    password: string()
      .required("Password is required")
      .min(6, "Invalid password"),
  });

  const submitHandler = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      await signIn(formik.values.email, formik.values.password);
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
      } else if (error.message.includes("network-request-failed")) {
        setError("There is no internet connection");
      } else {
        setError(error.message);
      }
    }
    setIsSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitHandler,
  });
  return (
    <div className="w-75 m-auto my-5">
      <h1 className="ps-0">Login: </h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email" className="my-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control mb-3"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email && (
          <div className="alert alert-danger">{formik.errors.email}</div>
        )}
        <label htmlFor="password" className="my-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control mb-3"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && (
          <div className="alert alert-danger">{formik.errors.password}</div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn btn-primary w-100 "
        >
          {isSubmitting ? "Logining in..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
