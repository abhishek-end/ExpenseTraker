const asyncHandler = require("express-async-handler");
const Category = require("../model/Categorey");
const Transaction = require("../model/Transaction");
const categoryController = {
  //! add
  add: asyncHandler(async (req, res) => {
    const { name, type, investment } = req.body;
    if (!name || !type) {
      throw new Error("Name and type field is required");
    }
    const validTypes = ["income", "expanse", "investment"];
    const normalizeChar = name.toLowerCase();
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error("invalid category " + type);
    }
    const categoryExists = await Category.findOne({
      name: normalizeChar,
      user: req.user,
    });
    if (categoryExists) {
      throw new Error(`
        Category ${categoryExists.name} is already exists
        `);
    }
    // !create category
    const category = await Category.create({
      name: normalizeChar,
      type,
      user: req.user,
    });
    res.status(201).json(category);
  }),
  //! lists
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });
    res.status(200).json(categories);
  }),
  //!update
  update: asyncHandler(async (req, res) => {
    const categoryID = req.params.id;
    const { name, type } = req.body;
    const normalizeChar = name.toLowerCase();
    const category = await Category.findById(categoryID);

    const oldName = category.name;
    category.name = normalizeChar;
    category.type = type;
    const updateCategory = await category.save();
    if (oldName !== updateCategory.name) {
      await Transaction.updateMany(
        {
          category: oldName,
        },
        {
          $set: { category: updateCategory.name },
        }
      );
    }
    res.json(updateCategory);
  }),
  //!delete
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category && category.user.toString() === req.user.toString()) {
      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        { user: req.user, category: category._id },
        { $set: { defaultCategory } }
      );

      // remove
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: "Category remove and transaction updated" });
    } else {
      res.json({
        message: "unauthorized user or transaction not found",
      });
    }
  }),
};

module.exports = categoryController;
