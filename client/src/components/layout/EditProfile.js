import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const EditProfile = () => {
  const options = [
    { value: "", text: "* Select Professional Status" },
    { value: "Developer", text: "Developer" },
    { value: "Junior Developer", text: "Junior Developer" },
    { value: "Senior Developer", text: "Senior Developer" },
    { value: "Student or Learning", text: "Student or Learning" },
    { value: "Instructor or Teacher", text: "Instructor or Teacher" },
    { value: "Intern", text: "Intern" },
    { value: "Other", text: "Other" },
  ];
  const [selected, setSelected] = useState(options[0].value);
  const [inputs, setInputs] = useState({});
  const [socials, setSocials] = useState({});
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem("token");

  const handleStatusChange = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  };
  const handleInputsChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSocialsChange = (e) => {
    setSocials({ ...socials, [e.target.name]: e.target.value.trim() });
  };
  const submitForm = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
    };
    const result = {
      social: {
        youtube: socials.youtube,
        twitter: socials.twitter,
        facebook: socials.facebook,
        linkedin: socials.linkedin,
        instagram: socials.instagram,
      },
      company: inputs.company,
      location: inputs.location,
      skills: inputs.skills,
      githubusername: inputs.githubusername,
      bio: inputs.bio,
      status: selected,
      website: inputs.website,
    };
    console.log(result);

    try {
      await axios.post("http://localhost:5000/", result, config);
      setInputs({
        company: "",
        location: "",
        skills: "",
        githubusername: "",
        bio: "",
        website: "",
      });
      setSelected("");
      setSocials({
        youtube: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        instagram: "",
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
      console.log("Success");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="container">
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* required field</small>
      <form className="form" onSubmit={submitForm}>
        <div className="form-group">
          <select
            name="status"
            onChange={handleStatusChange}
            value={selected}
            required
          >
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            onChange={handleInputsChange}
            value={inputs.company}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            onChange={handleInputsChange}
            value={inputs.website}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            onChange={handleInputsChange}
            value={inputs.location}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            onChange={handleInputsChange}
            value={inputs.skills}
            required
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            onChange={handleInputsChange}
            value={inputs.githubusername}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            onChange={handleInputsChange}
            value={inputs.bio}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <span>Add Social Network Links </span>
          <span>(Optional)</span>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input
            type="text"
            placeholder="Twitter URL"
            name="twitter"
            onChange={handleSocialsChange}
            value={socials.twitter}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input
            type="text"
            placeholder="Facebook URL"
            name="facebook"
            onChange={handleSocialsChange}
            value={socials.facebook}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input
            type="text"
            placeholder="YouTube URL"
            name="youtube"
            onChange={handleSocialsChange}
            value={socials.youtube}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input
            type="text"
            placeholder="Linkedin URL"
            name="linkedin"
            onChange={handleSocialsChange}
            value={socials.linkedin}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input
            type="text"
            placeholder="Instagram URL"
            name="instagram"
            onChange={handleSocialsChange}
            value={socials.instagram}
          />
        </div>
        {success && <h3 className="success">Success!</h3>}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};
export default EditProfile;
