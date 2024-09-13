const userRouter = require("express").Router();
const userController = require("../controller/userCtrl");
const isAuthenticated = require("../middleware/isAuth");

// ! Register
userRouter.post("/api/v1/users/register", userController.register);
// !Login
userRouter.post("/api/v1/users/login", userController.login);
// !profile
userRouter.get(
  "/api/v1/users/profile",
  isAuthenticated,
  userController.profile
);
//!changePassword
userRouter.put(
  "/api/v1/users/change-password",
  isAuthenticated,
  userController.changePassword
);
//!update-profile
userRouter.put(
  "/api/v1/users/update-profile",
  isAuthenticated,
  userController.updateUserProfile
);

module.exports = userRouter;
