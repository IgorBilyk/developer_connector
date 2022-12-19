import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../store/features/actions";
import Loading from "./Loading";
import { Experiences } from "./experiences/Experiences";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  //Get data from profile redux store
  const profileData = useSelector((state) => state.register);
  const { isLoggedIn } = profileData;
  const { _id } = isLoggedIn ? JSON.parse(localStorage.getItem("data")) : null;
  useEffect(() => {
    dispatch(getUser({ accessToken: token, id: _id }));
    const interval = setTimeout(() => setLoading(false), 500);
    return () => clearInterval(interval);
  }, [clicked]);

  const token = localStorage.getItem("accessToken");
  const userData = isLoggedIn ? JSON.parse(localStorage.getItem("data")) : null;

  const name = profileData?.userData.name;
  const handleClick = () => {
    setClicked(prev => !prev)
    console.log(clicked)
  }
  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>

      <p className="lead">
        Welcome<i className="fas fa-user"> {userData.name}</i>{" "}
      </p>
      <div className="dash-buttons">
        <Link to="/editProfile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>
        <Link to="/addExperience" className="btn btn-light">
          <i className="fab fa-black-tie text-primary"></i> Add Experience
        </Link>
        <Link to="/addEducation" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Add Education
        </Link>
      </div>
      <h2 className="my-2">Experience Credentials</h2>
      {loading ? (
        <Loading />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <Experiences handleClick={handleClick}/>
          </tbody>
        </table>
      )}
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Northern Essex</td>
            <td className="hide-sm">Associates</td>
            <td className="hide-sm">02-03-2007 - 01-02-2009</td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="my-2">
        <button className="btn btn-danger">
          <i className="fas fa-user-minus"></i>
          Delete My Account
        </button>
      </div>
    </section>
  );
};
export default Dashboard;
