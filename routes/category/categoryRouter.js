const express = require("express");
const { createCategory,getCategories,updateCategory,deleteCategory } = require("../../controllers/categories/category");
const isLoggin = require("../../middlewares/isLoggin");
const categoryRouter = express.Router();

// create category
categoryRouter.post("/",isLoggin, createCategory);

// get all categories
categoryRouter.get("/", getCategories);
// delete category
categoryRouter.delete("/:id", isLoggin , deleteCategory);

// update category
categoryRouter.put("/:id", updateCategory);
module.exports = categoryRouter;