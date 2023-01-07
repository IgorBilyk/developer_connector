import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addEducation } from "../../../store/features/actions";

const AddEducation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState(null);

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
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
    if (inputs.from > inputs.to) {
      return setError("Please, check validity of 'to' date!");
    }
    dispatch(addEducation(data));
    setInputs({
      school: "",
      degree: "",
      fieldofstudy: "",
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
  return (
    <section className="container">
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleForm}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            onChange={handleInputs}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            onChange={handleInputs}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            onChange={handleInputs}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={inputs.from}
            min="1960-01-01"
            max={currentDate}
            onChange={handleInputs}
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
            Current School or Bootcamp
          </p>
        </div>
        {checkbox ? (
          ""
        ) : (
          <div className="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              onChange={handleInputs}
              min={inputs.from}
              max={currentDate}
              value={inputs.to}
              defaultValue={currentDate}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            />
          </div>
        )}
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
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
export default AddEducation;
