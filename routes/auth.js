const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { loginValidation } = require("../utils/validation");

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);

  //Validate user input
  if (error)
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });

  //Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ status: false, message: 'Invalid email/password combination.' });

  //Check if password is valid
  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .json({ status: false, message: 'Invalid email/password combination.' });

  const token = jwt.sign({ user: user._id}, process.env.JWT_SECRET);
  
  res
    .status(200)
    .json({
      status: true,
      message: 'Loggin successfull',
      access_token: token,
      token_type: 'Bearer',
    });
});

module.exports = router;
