import React, { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Profile";
import Loading from "../layout/Loading";

const Profiles = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/profiles", {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setProfiles(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <section className="container">
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      {loading ? (
        <Loading />
      ) : (
        <div className="profiles">
          {profiles &&
            profiles.map((profile, index) => (
              <Profile key={index} profile={profile} />
            ))}
        </div>
      )}
    </section>
  );
};
export default Profiles;
