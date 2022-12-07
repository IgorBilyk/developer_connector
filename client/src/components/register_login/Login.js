import React, { useState, useEffect } from "react";
//import axios from "axios ";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../store/features/actions";

import "../../App.css";
import Alert from "../layout/Alert";

const Login = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const errors = useSelector((state) => state.register.errorMessages);
  const state = useSelector((state) => state.register);

  const { email, password } = inputs;

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //login User
  const loginUser = (data) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      };
      fetch("/auth", config)
        .then((res) => res.json())
        .then((result) => {
          console.log(`Success ${result.accessTok}`);
          localStorage.setItem("accessToken", result.accessTok);
          localStorage.setItem("data", JSON.stringify(result.user));
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    /*  dispatch(loginUser(data)); */
    loginUser(data);
  };
  return (
    <section className="container">
      {errors.length > 0 ? <Alert /> : ""}
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            required
            onChange={handleChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};
export default Login;
