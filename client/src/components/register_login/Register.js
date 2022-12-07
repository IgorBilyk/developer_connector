import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//redux import
import { useSelector, useDispatch } from "react-redux";
//import redux action functions
import { registerUser, clearErrors } from "../../store/features/actions";
import { hideAlert } from "../../store/features/userSlice";
import "../../App.css";

import Alert from "../layout/Alert";

const Register = () => {
  const dispatch = useDispatch();
  /*   useEffect(() => {
    dispatch(clearErrors());
  }, []); */

  const errors = useSelector((state) => state.register.errorMessages);
  const state = useSelector((state) => state.register);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = inputs;

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      password2,
    };
    try {
      dispatch(hideAlert());
      await dispatch(registerUser(newUser));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="container">
      {errors.length > 0 ? <Alert /> : ""}

      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={name}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          className="btn btn-primary"
          id="btn"
          value="Register"
          disabled={state.loading ? true : false}
        />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};
export default Register;
