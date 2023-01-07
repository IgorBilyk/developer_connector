import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { addExperience } from "../../../store/features/actions";
import { updateDashboard } from "../../../store/features/dashboardSlice";
const AddExperience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState(null);

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(inputs, error);
  };
  const checkboxHandle = (e) => {
    setCheckbox((prev) => !prev);
  };
  const handleForm = (e) => {
    e.preventDefault();
      const data = {
      ...inputs,
      id: JSON.parse(localStorage.getItem("data"))._id,
      current: checkbox,
    };
    if (inputs.from > inputs.to) setError("Please, check validity of to date!");
        dispatch(addExperience(data));
    setInputs({
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      description: "",
    });
    setTimeout(() => navigate("/dashboard"), 1000);
  };
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
  console.log(currentDate, inputs);
  return (
    <section className="container">
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleForm}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            onChange={handleInputs}
            value={inputs.title}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            onChange={handleInputs}
            value={inputs.company}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={inputs.location}
            onChange={handleInputs}
          />
        </div>
        <div className="form-group">
          <h4>From Date*</h4>
          <input
            type="date"
            name="from"
            min="1960-01-01"
            max={currentDate}
            value={inputs.from}
            onChange={handleInputs}
            required
            onKeyDown={(e) => {
              e.preventDefault();
            }}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value=""
              onChange={checkboxHandle}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4 style={{ display: checkbox ? "none" : "block" }}>To Date</h4>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <input
            type="date"
            name="to"
            onChange={handleInputs}
            min={inputs.from}
            max={currentDate}
            value={inputs.to}
            defaultValue={currentDate}
            style={{ display: checkbox ? "none" : "block" }}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={inputs.description}
            onChange={handleInputs}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

export default AddExperience;
