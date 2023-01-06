const express = require("express");
const config = require("config");
const axios = require("axios");

const router = express.Router();
const auth = require("../../midleware/auth");
const { body, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Get profile
// route - profile router api/profile/me
// @access private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) return res.status(400).json({ msg: "Profile was not found" });
    res.send(profile);
    res.send("Good request");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Message");
  }
});

// Create & update profile
// route - profile router api/profile/
router.post(
  "/",

  [
    body("status", "The status is required").notEmpty(),
    body("skills", "Skills are required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body, "body data");
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      user,
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      social,
    } = req.body;

    //profile object
    const { facebook, youtube, twitter, linkedin, instagram } = social;
    const profileFields = {};
    profileFields.user = user;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) profileFields.skills = skills;

    //build social profile
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    try {
      let profile = await Profile.findOne({ user });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Message");
    }
    // res.send(req.body);
  }
);
// route  get all profiles
router.get("/profiles", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate({
      model: "User",
      path: "user",
      select: ["name", "avatar"],
    });

    res.status(200).send(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
// route  get profile by user id
router.get("/profile/user/:user_id", async (req, res) => {
  try {
    console.log(req.params.user_id);
    const user = await Profile.findOne({ user: req.params.user_id }).populate({
      model: "User",
      path: "user",
      select: ["name", "avatar"],
    });

    if (!user) return res.status(400).json({ msg: "Profile not found" });
    res.status(200).send(user);
  } catch (err) {
    if (err.kind == "ObjectId")
      return res.status(400).send("Profile not found");
    res.status(500).send(`Server error : ${err.message}`);
  }
});
// delete user profile
// @access private
router.delete(
  "/profile/delete/:user_id",
  /*  auth, */ async (req, res) => {
    try {
      console.log(req.params.user_id, "from profile servers");
      await Profile.findOneAndDelete({ user: req.params.user_id });
      await User.findOneAndDelete({ _id: req.params.user_id });
      res.json({ msg: "User has been removed." });
    } catch (err) {
      res.status(500).send(`Server error : ${err.message}`);
    }
  }
);
// PUT /profile/experience
//add profile experience
// @access private
router.put(
  "/experience",
  [
    /* auth, */
    [
      body("title", "Title is required").notEmpty(),
      body("company", "Company is required").notEmpty(),
      body("from", "From date is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description, id } =
      req.body;
    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: id });
      const { experience } = profile;
      experience.unshift(newExperience);
      await profile.save();
      res.send(profile);
    } catch (err) {
      res.status(500).send(`Server error : ${err.message}`);
    }
  }
);
// DELETE /profile/experience/:exp_id
//Delete profile experience
//@access private
router.delete(
  "/experience/:exp_id/:user_id",
  /* auth, */ async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id,
      });
      const { experience } = profile;
      const removedIndx = experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);
      if (removedIndx == -1)
        return res.status(500).send("Experience not found!");
      experience.splice(removedIndx, 1);
      await profile.save();

      res.json(profile);
    } catch (err) {
      res.status(500).send(`Server error : ${err.message}`);
    }
  }
);

// PUT /profile/education
//add/update profile education
// @access private
router.put(
  "/education",
  [
    /* auth, */
    [
      body("school", "School is required").notEmpty(),
      body("degree", "Degree is required").notEmpty(),
      body("fieldofstudy", "Field of study is required").notEmpty(),
      body("from", "From date of study is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    const newEducation = {
      id,
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: id });
      const { education } = profile;
      education.unshift(newEducation);
      await profile.save();
      res.send(profile);
    } catch (err) {
      res.status(500).send(`Server error : ${err.message}`);
    }
  }
);
//DELETE /profile/education/:edu_id
//Delete profile education
//@access private
router.delete(
  "/education/:edu_id/:user_id",
  /* auth, */ async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id,
      });
      const { education } = profile;
      const removedIndx = education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);
      if (removedIndx == -1)
        return res.status(500).send("Education not found!");
      education.splice(removedIndx, 1);
      await profile.save();

      res.json(profile);
    } catch (err) {
      res.status(500).send(`Server error : ${err.message}`);
    }
  }
);
//GET /profile/githubuser/
//Get github user repositories
//@access public
router.get("/github/:username", async (req, res) => {
  try {
    const repos = await axios.get(
      `https://api.github.com/users/${
        req.params.username
      }/repos/?client_id=${config.get(
        "GITHUB_CLIENT_ID"
      )}&client_secret=${config.get("GITHUB_CLIENT_SECRET")}`,
      {
        headers: {
          "user-agent": "node.js",
        },
      }
    );
    res.send(repos);
  } catch (err) {
    res.status(500).send(`Server error : ${err.message}`);
    console.log(err);
  }
});

module.exports = router;
