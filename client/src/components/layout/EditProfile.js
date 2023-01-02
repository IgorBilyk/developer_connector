import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../store/features/actions";
import Loading from "./Loading";

const EditProfile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
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
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(null);
  const [socials, setSocials] = useState({});
  const [success, setSuccess] = useState(false);
  const refreshToken = localStorage.getItem("refreshToken");
  const stateData = useSelector((state) => state.register);
  const profileData = useSelector((state) => state.register.profileData[0]);
  const id = profileData.user._id;
  console.log(profileData);
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

    const config = {
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
    console.log(result);

    try {
      await axios.post(
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

      return () => clearInterval(interval);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(count);
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
            <select
              name="status"
              onChange={handleStatusChange}
              /* defaultValue={
                !loading
                  ? options.find((item) => item.value == profileData?.status)
                      .value
                  : selected
              } */
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
              defaultValue={!loading ? profileData?.company : null}
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
              defaultValue={!loading ? profileData?.website : null}
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
              defaultValue={!loading ? profileData?.location : null}
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
              defaultValue={!loading ? profileData?.skills[0].toString() : null}
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
              defaultValue={!loading ? profileData?.githubusername : null}
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
              defaultValue={!loading ? profileData?.bio : null}
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
              defaultValue={!loading ? profileData?.social.twitter : null}
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
              defaultValue={!loading ? profileData?.social.facebook : null}
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
              defaultValue={!loading ? profileData?.social.youtube : null}
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
              defaultValue={!loading ? profileData?.social.linkedin : null}
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
              defaultValue={!loading ? profileData?.social.instagram : null}
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
