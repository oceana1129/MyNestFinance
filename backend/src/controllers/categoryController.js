import Category from "../models/BudgetCategory.js";
import Budget from "../models/MonthlyBudget.js";
import { deleteCategoryData } from "../services/deleteCategoryData.js";

// CREATE
// create a category
/**
 * Will create a budget category for a user.
 */
export async function createCategory(req, res) {
  try {
    const { monthlyBudget, name, emoji, color, categoryType } = req.body;

    // does the budget exist
    const budget = await Budget.findById(monthlyBudget);

    if (!budget) {
      return res.status(404).json({
        message: "Monthly budget not found",
      });
    }

    // create the display order by display order
    const lastCategory = await Category.findOne({
      monthlyBudget,
    }).sort({ displayOrder: -1 });

    // if a previous category exists, display order is +1
    // otherwise its the first category so display is 0
    const displayOrder = lastCategory ? lastCategory.displayOrder + 1 : 0;

    // budget exists, continue with req
    const savedCategory = await Category.create({
      monthlyBudget,
      displayOrder,
      name,
      emoji,
      color,
      categoryType,
    });

    res.status(201).json({
      message: "Budget Category created successfully!",
      savedCategory,
    });
  } catch (err) {
    console.error("createCategory()", err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: "A category already exists with this name for this budget.",
      });
    }
    res.status(500).json({ message: "internal server error" });
  }
}

// READ
// get all categories
export async function getAllCategories(_, res) {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All categories found:\n", categories });
  } catch (err) {
    console.error("getAllCategories(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// get category by id
export async function getCategoryById(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res
      .status(200)
      .json({ message: `Category with id ${req.params.id} found`, category });
  } catch (err) {
    console.error("getCategoryById(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// get all categories by month
export async function getCategoriesByBudget(req, res) {
  try {
    const categories = await Category.find({
      monthlyBudget: req.params.monthlyBudgetId,
    }).sort({
      displayOrder: 1,
    });
    res.status(200).json({ message: "Categories found", categories });
  } catch (err) {
    console.error("getCategoriesByBudget(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// UPDATE
// update category
export async function updateCategory(req, res) {
  try {
    const { name, emoji, color, categoryType, plannedAmount } =
      req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        emoji,
        color,
        categoryType,
        plannedAmount,
      },
      { new: true, runValidators: true },
    );
    if (!updatedCategory)
      return res.status(404).json({ message: "category not found" });
    res.status(200).json({
      message: "category updated successfully!",
      updatedCategory,
    });
  } catch (err) {
    console.error("updateCategory()", err);
    if (err.code === 11000) {
      return res.status(409).json({
        message: "An category already exists with this name for this budget.",
      });
    }
    res.status(500).json({ message: "internal server error" });
  }
}

// update display order
export async function reorderCategories(req, res) {
  try {
    const { categories } = req.body;
    // is an array
    if (!Array.isArray(categories)) {
      return res.status(400).json({
        message: "Category array required",
      });
    }
    // has items in array
    if (categories.length === 0) {
      return res.status(400).json({
        message: "No categories provided",
      });
    }

    await Category.bulkWrite(
      categories.map((category) => ({
        updateOne: {
          filter: {
            _id: category.id,
          },
          update: {
            displayOrder: category.displayOrder,
          },
        },
      })),
    );

    res.status(200).json({
      message: "Categories reordered successfully!",
    });
  } catch (err) {
    console.error("reorderCategories(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}

// delete category by id
export async function deleteCategory(req, res) {
  try {
    const deletedCategory = await deleteCategoryData(req.params.id);
    if (!deletedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({
      message: "Category deleted successfully!",
      deletedCategory,
    });
  } catch (err) {
    console.error("deleteCategory(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}