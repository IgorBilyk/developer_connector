import React, { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Profile";

const Profiles = () => {
  const token = localStorage.getItem("token");
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/profiles", {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProfiles(res.data));
      
  }, []);
  return (
    <section className="container">
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {profiles &&
          profiles.map((profile, index) => (
            <Profile key={index} profile={profile} />
          ))}
      </div>
    </section>
  );
};
export default Profiles;
