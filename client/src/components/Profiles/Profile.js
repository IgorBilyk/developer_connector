import React from "react";

const Profile = ({ profile }) => {
  const {
    bio,
    company,
    date,
    education,
    experience,
    githubusername,
    location,
    skills,
    social,
    status,
    website,
    user,
  } = profile;
  const { name, avatar } = user;
  return (
    <div className="profile bg-light">
      <img className="round-img" src={"https://" + avatar} alt="avatar" />
      <div>
        <h2>{name}</h2>
        <p>{location}</p>
        <a href="profile.html" className="btn btn-primary">
          View Profile
        </a>
      </div>

      <ul>
        {skills.map((skill) => (
          <li className="text-primary">
            <i className="fas fa-check">{skill}</i>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Profile;