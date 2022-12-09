import React, { Fragment, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../store/features/userSlice";

import { globalStateContext } from "../../App";

import "../../App.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useContext(globalStateContext);
  const stateData = useSelector((state) => state.register);
  const { isLoggedIn, userData: data } = stateData;
  const name = stateData.userInfo.name;

  //const [userData, setUserData] = useState(user);
  //const { name } = userData;
  console.log(stateData.userInfo.name);
  return (
    <Fragment>
      {isLoggedIn ? (
        <nav className="navbar bg-dark">
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
