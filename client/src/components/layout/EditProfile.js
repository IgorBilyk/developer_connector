import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addProfileData } from "../../store/features/actions";
import { getUser } from "../../store/features/actions";
import Loading from "./Loading";

const EditProfile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const profile_data = JSON.parse(localStorage.getItem("profile_data"));
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
  const [inputs, setInputs] = useState({
    company: profile_data?.company ? profile_data.company : "",
    location: profile_data?.location ? profile_data.location : "",
    skills: profile_data?.skills ? profile_data.skills : "",
    githubusername: profile_data?.githubusername
      ? profile_data.githubusername
      : "",
    bio: profile_data?.bio ? profile_data.bio : "",
    website: profile_data?.website ? profile_data.website : "",
  });
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(null);
  const [socials, setSocials] = useState({
    youtube: profile_data?.social.youtube ? profile_data.social?.youtube : "",
    twitter: profile_data?.social.twitter ? profile_data.social?.twitter : "",
    facebook: profile_data?.social.facebook
      ? profile_data.social?.facebook
      : "",
    linkedin: profile_data?.social.linkedin
      ? profile_data.social?.linkedin
      : "",
    instagram: profile_data?.social.instagram
      ? profile_data.social?.instagram
      : "",
  });
  const [success, setSuccess] = useState(false);
  const refreshToken = localStorage.getItem("refreshToken");
  const profileData = JSON.parse(localStorage.getItem("profile_data"));

  const id = JSON.parse(localStorage.getItem("data"))._id;
  const user_id = JSON.parse(localStorage.getItem("profile_data"))?._id;

  const handleStatusChange = (e) => {
    setSelected(e.target.value, "selected");
  };
  const handleInputsChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSocialsChange = (e) => {
    setSocials({ ...socials, [e.target.name]: e.target.value.trim() });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const result = {
      user: id,
      social: {
        youtube: socials.youtube
          ? socials.youtube
          : profileData?.social.youtube,
        twitter: socials.twitter
          ? socials.twitter
          : profileData?.social.twitter,
        facebook: socials.facebook
          ? socials.facebook
          : profileData?.social.facebook,
        linkedin: socials.linkedin
          ? socials.linkedin
          : profileData?.social.linkedin,
        instagram: socials.instagram
          ? socials.instagram
          : profileData?.social.instagram,
      },
      company: inputs.company,
      location: inputs.location,
      skills: inputs.skills,
      githubusername: inputs.githubusername,
      bio: inputs.bio,
      status: selected,
      website: inputs.website,
    };
    console.log(refreshToken, result, "from edit profile");
    dispatch(addProfileData({ refreshToken, result }));
    setSuccess(true);
    const interval = setTimeout(() => {
      setSuccess(false);
      console.log("Success");
      navigate("/dashboard");
    }, 1500);

    return () => clearInterval(interval);
    /* const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const result = {
      user: id,
      social: {
        youtube: socials.youtube
          ? socials.youtube
          : profileData?.social.youtube,
        twitter: socials.twitter
          ? socials.twitter
          : profileData?.social.twitter,
        facebook: socials.facebook
          ? socials.facebook
          : profileData?.social.facebook,
        linkedin: socials.linkedin
          ? socials.linkedin
          : profileData?.social.linkedin,
        instagram: socials.instagram
          ? socials.instagram
          : profileData?.social.instagram,
      },
      company: inputs.company ? inputs.company : profileData?.company,
      location: inputs.location ? inputs.location : profileData?.location,
      skills: inputs.skills ? inputs.skills : profileData?.skills,
      githubusername: inputs.githubusername
        ? inputs.githubusername
        : profileData?.githubusername,
      bio: inputs.bio ? inputs.bio : profileData?.bio,
      status: selected ? selected : profileData?.status,
      website: inputs.website ? inputs.website : profileData?.website,
    };
    console.log(result); */

    try {
      /* await axios.post(
        "http://localhost:5000/",

        result,
        { headers: config }
      );
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
      const interval = setTimeout(() => {
        setSuccess(false);
        console.log("Success");
        navigate("/dashboard");
      }, 1500);

      return () => clearInterval(interval); */
      console.log("from edit profile");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    //Get profile info of current user by id [Redux action]

    dispatch(getUser({ refreshToken, id }));

    const interval = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <section className="container">
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>

      {loading ? (
        <Loading />
      ) : (
        <form className="form" onSubmit={submitForm}>
          <small>* required field</small>
          <div className="form-group">
            <select name="status" onChange={handleStatusChange} required>
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
              style={{ overflow: "auto", resize: "none" }}
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
            />
          </div>
          {success && <h3 className="success">Success!</h3>}
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      )}
    </section>
  );
};
export default EditProfile;
