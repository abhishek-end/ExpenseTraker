const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body, typeof password);

    //! User Validate
    if ((!username, !email, !password)) {
      throw new Error("Please Provide all the details");
    }

    //! Check if email exists
    const UserExist = await User.findOne({ email });
    if (UserExist) {
      throw new Error("User Already Exists");
    }

    //! Hash the user password

    const hashedPassword = await bcrypt.hash(String(password), 10);

    //* User Created and send it to the DB
    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Send user response
    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  //* Login
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid Email");
    }

    // Compare the password
    const comparePassword = await bcrypt.compare(
      String(password),
      user.password
    );

    if (!comparePassword) {
      throw new Error("Invalid Password");
    }

    // JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      message: "Login Success",
      username: user.username,
      token,
      email: user.email,
      id: user._id,
    });
  }),
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("Invalid User");
    }
    res.json({
      message: "Profile Success",
      username: user.username,
      email: user.email,
    });
  }),
  changePassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("Invalid User");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(String(newPassword), salt);
    user.password = hashedPassword;
    console.log(hashedPassword);

    //! Re-save the newPassword
    await user.save();
    res.json({
      message: "Password Change Successfully",
    });
  }),
  updateUserProfile: asyncHandler(async (req, res) => {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user,
      {
        username,
        email,
      },
      {
        new: true,
      }
    );

    res.json({
      message: "Username `Change Successfully",
      username: user.username,
      email: user.email,
    });
  }),
};

module.exports = userController;
