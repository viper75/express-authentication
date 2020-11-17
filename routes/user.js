const router = require("express").Router();
const User = require("../models/User");
const { registrationValidation } = require("../utils/validation");

router.post("/register", async (req, res) => {
  const { error } = registrationValidation(req.body);

  //Validate user input
  if (error)
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });

  //Check if email already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res
      .status(400)
      .json({ status: false, message: "Email already exists." });

  //Create a new User object
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.json({
      status: true,
      message: "User registered successfully.",
      data: savedUser,
    });
  } catch (error) {
    res.json({ status: false, message: error, data: null });
  }
});

module.exports = router;
