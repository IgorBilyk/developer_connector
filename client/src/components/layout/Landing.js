import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
export const Landing = () => {
  const isLoggedIn = useSelector((state) => state.register.isLoggedIn);

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          {!isLoggedIn ? (
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">
                Sign up
              </Link>

              <Link to="/login" className="btn btn-light">
                Login
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};
