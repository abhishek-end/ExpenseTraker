const categoryRouter = require("express").Router();
const categoryController = require("../controller/categoryLists");
const isAuthenticated = require("../middleware/isAuth");
// ! add
categoryRouter.post(
  "/api/v1/category/add",
  isAuthenticated,
  categoryController.add
);
// !lists
categoryRouter.get(
  "/api/v1/category/lists",
  isAuthenticated,
  categoryController.lists
);
//! update
categoryRouter.put(
  "/api/v1/category/update/:id",
  isAuthenticated,
  categoryController.update
);
categoryRouter.delete(
  "/api/v1/category/delete/:id",
  isAuthenticated,
  categoryController.delete
);

module.exports = categoryRouter;
