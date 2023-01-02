import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../store/features/actions";
import { updateDashboard } from "../../store/features/dashboardSlice";

import Loading from "./Loading";
import { Experiences } from "./experiences/Experiences";
import { Educations } from "./educations/Educations";
import { DashboardHeader } from "./DashboardHeader";
import { Popup } from "./Popup";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [popup, setPopup] = useState(false);

  //Get data from profile redux store
  const profileData = useSelector((state) => state.register);
  const postsState = useSelector((state) => state.posts.click);
  const { isLoggedIn } = profileData;
  const { _id } = isLoggedIn ? JSON.parse(localStorage.getItem("data")) : null;
  useEffect(() => {
    dispatch(getUser({ accessToken: token, id: _id }));

    dispatch(updateDashboard());
    const interval = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearInterval(interval);
  }, [clicked]);

  const token = localStorage.getItem("accessToken");
  const userData = isLoggedIn ? JSON.parse(localStorage.getItem("data")) : null;

  const handleClick = () => {
    setClicked((prev) => !prev);
  };
  //handle popup window
  const handlePopup = () => {
    setPopup((prev) => !prev);
  };
  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      {popup && <Popup />}

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
          {!loading && profileData.profileData[0]?.experience.length > 0 ? (
            <DashboardHeader company={true} />
          ) : (
            <tr>
              <th>No Experiences found!</th>
            </tr>
          )}
          <tbody>
            <Experiences handleClick={handleClick} />
          </tbody>
        </table>
      )}
      <h2 className="my-2">Education Credentials</h2>
      {loading ? (
        <Loading />
      ) : (
        <table className="table">
          {!loading && profileData.profileData[0].education.length > 0 ? (
            <DashboardHeader company={false} />
          ) : (
            <tr>
              <th>No Education found!</th>
            </tr>
          )}
          <tbody>
            <Educations handleClick={handleClick} />
          </tbody>
        </table>
      )}

      <div className="my-2">
        <button className="btn btn-danger" onClick={handlePopup}>
          <i className="fas fa-user-minus"></i>
          Delete My Account
        </button>
      </div>
    </section>
  );
};
export default Dashboard;
