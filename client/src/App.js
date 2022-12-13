//racf short code to create component
import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Components
import Navbar from "./components/layout/Navbar";
import NotFound from "./components/layout/NotFound";
import Register from "./components/register_login/Register";
import Login from "./components/register_login/Login";
import Dashboard from "./components/layout/Dashboard";
import EditProfile from "./components/layout/EditProfile";
import AddExperience from "./components/layout/experiences/AddExperience";
import AddEducation from "./components/layout/AddEducation";
import Posts from "./components/layout/Posts";
import Post from "./components/layout/post/Post";
import Profiles from "./components/Profiles/Profiles";
import { Landing } from "./components/layout/Landing";
import IndividualPost from "./components/layout/post/IndividualPost";

import { logOut } from "./store/features/userSlice";

import "./App.css";
// contex setup
export const globalStateContext = React.createContext(
  JSON.parse(localStorage.getItem("data"))
);

function App() {
  const dispatch = useDispatch();

  const stateData = useSelector((state) => state.register);

  const { isLoggedIn } = stateData;

  const handlelogout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("accessToken");
  };
  const [userData, setUserData] = useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : null
  );
  console.log(stateData);
  return (
    <Router>
      <globalStateContext.Provider value={userData}>
        <Fragment>
          <Navbar />
          <Link
            onClick={() => {
              dispatch(logOut());
              window.location("/");
            }}
          >
            logout
          </Link>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route exact path="register" element={<Register />} />
            <Route
              path="login"
              element={isLoggedIn ? <Profiles /> : <Login />}
            />
            <Route
              path="profiles"
              element={isLoggedIn ? <Profiles /> : <Login />}
            />
            <Route
              path="dashboard"
              element={isLoggedIn ? <Dashboard /> : <Login />}
            />
            <Route
              path="editProfile"
              element={isLoggedIn ? <EditProfile /> : <Login />}
            />
            <Route
              path="addExperience"
              element={isLoggedIn ? <AddExperience /> : <Login />}
            />
            <Route
              path="addEducation"
              element={isLoggedIn ? <AddEducation /> : <Login />}
            />
            <Route
              exact
              path="posts"
              element={isLoggedIn ? <Posts /> : <Login />}
            />
            <Route
              path="post/:id"
              element={userData?.name ? <IndividualPost /> : <Login />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Fragment>
      </globalStateContext.Provider>
    </Router>
  );
}

export default App;
