const asyncHandler = require("express-async-handler");
const Category = require("../../model/category/Category");

// @desc    Get all categories
exports.createCategory = asyncHandler(async (req, res) => {
    const { name, author } = req.body;
    //! if exist
    const categoryFound = await Category.findOne({ name });
    if (categoryFound) {
      throw new Error("Category already exists");
    }
    const category = await Category.create({
        name: name,
        author: req.userAuth?._id,
      });
      res.status(201).json({
        status: "success",
        message: "Category successfully created",
        category,
      });
    });
    