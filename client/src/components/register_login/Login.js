import React, { useState } from "react";
//import axios from "axios ";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../store/features/actions";

import "../../App.css";
import Alert from "../layout/Alert";

const Login = () => {
  //redux state initialization
  const dispatch = useDispatch();
  let errors = useSelector((state) => state.register.errorMessages[0]?.data);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //login User

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    dispatch(loginUser(data));
    
  };
/*   console.log(errors.msg);
 */  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      {errors && (
        <p key={errors.msg} className="error-msg">
          {errors?.msg}
        </p>
      )}
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
