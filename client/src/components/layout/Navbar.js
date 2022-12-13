import React, { Fragment, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../store/features/userSlice";

import "../../App.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.register);
  const { isLoggedIn, userData: data } = stateData;
  const name = stateData?.userInfo?.name;
  const test = async () => {
    const result = await axios.post(
      "http://localhost:5000/test",
      {},
      {
        "Content-Type": "application/json",

        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2NzYsImlhdCI6MTY3MDk1MzM2NiwiZXhwIjoxNjcwOTU0MjY2fQ.A87ekCCHE06DqI6SqrT1SZx0m_EVBRNqPjnwHCYziPs`,
        },
      }
    );
  };

  return (
    <Fragment>
      {isLoggedIn ? (
        <nav className="navbar bg-dark">
          <button onClick={test}>JWT</button>
          <div>
            <h1>
              <Link to="/">
                <i className="fas fa-code"></i> DevConnector
              </Link>
            </h1>
          </div>
          <ul className="loggedUser">
            <li>
              <Link to="posts">Posts</Link>
            </li>
            <li>
              <Link to="profiles">Developers</Link>
            </li>
            <li>
              <Link to="dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="dashboard">Hey {name}</Link>
            </li>
            <li> | </li>
            <li>
              <Link
                onClick={() => {
                  dispatch(logOut());
                  window.location("/");
                }}
              >
                Log out <FontAwesomeIcon icon={faSignOut} />
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="navbar bg-dark">
          <ul>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
              <Link to="register">Sign up</Link>
            </li>
          </ul>
        </nav>
      )}
    </Fragment>
  );
};
export default Navbar;
