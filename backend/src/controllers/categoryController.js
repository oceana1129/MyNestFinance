import Category from "../models/BudgetCategory.js";
import Budget from "../models/MonthlyBudget.js";
import { deleteCategoryData } from "../services/deleteCategoryData.js";

// CREATE
/**
 * Will create a budget category for a user.
 */
export async function createCategory(req, res) {
  try {
    const { monthlyBudget, name, emoji, color, categoryType } 
      = req.body;

    // does the budget exist
    const budget = await Budget.findById(monthlyBudget);

    if (!budget) {
      return res.status(404).json({
        message: "Monthly budget not found",
      });
    }

    // authorization: category must belong to the user
    if (!budget.userProfile.equals(req.profile._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // create the display order by display order
    const lastCategory = await Category.findOne({
      monthlyBudget,
    }).sort({ displayOrder: -1 });

    // if a previous category exists, display order is +1
    // otherwise its the first category so display is 0
    let { displayOrder } = req.body;

    if (displayOrder === undefined) {
        const lastCategory = await BudgetItem.findOne({
            budgetCategory,
        }).sort({ displayOrder: -1 });

        displayOrder = lastCategory ? lastCategory.displayOrder + 1 : 0;
    }

    // budget exists and belongs to user, continue with req
    const savedCategory = await Category.create({
      monthlyBudget,
      displayOrder,
      name,
      emoji,
      color,
      categoryType,
    });

    res.status(201).json({
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
/**
 * get all categories
 * @param {*} _ 
 * @param {*} res 
 * @returns 
 */
export async function getAllCategories(_, res) {
  // authorization
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ categories });
  } catch (err) {
    console.error("getAllCategories(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * get category by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function getCategoryById(req, res) {
  try {
    const category = await Category.findById(req.params.id)
      .populate("monthlyBudget");
    
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (!category.monthlyBudget.userProfile.equals(req.profile._id))
        return res.status(403).json({ message: "Forbidden" });
    
    res
      .status(200)
      .json({ category });
  } catch (err) {
    console.error("getCategoryById(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * get all categories by month
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function getCategoriesByBudget(req, res) {
  try {
    const budget = await Budget.findById(req.params.monthlyBudgetId);

  if (!budget) {
    return res.status(404).json({ message: "Budget not found" });
  }

  if (!budget.userProfile.equals(req.profile._id)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const categories = await Category.find({
    monthlyBudget: budget._id,
  }).sort({
    displayOrder: 1,
  });

  res.status(200).json({ categories });
  } catch (err) {
    console.error("getCategoriesByBudget(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// UPDATE
/**
 * update category
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function updateCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id)
    .populate("monthlyBudget");

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  if (!category.monthlyBudget.userProfile.equals(req.profile._id)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { name, emoji, color, categoryType } =
    req.body;

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
      emoji,
      color,
      categoryType,
    },
    { new: true, runValidators: true },
  );

  if (!updatedCategory)
    return res.status(404).json({ message: "category not found" });
  
  res.status(200).json({
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
    const ids = categories.map(c => c.id);

    const foundCategories = await Category.find({
      _id: { $in: ids },
    }).populate("monthlyBudget");

    // authorization
    for (const category of foundCategories) {
      if (!category.monthlyBudget.userProfile.equals(req.profile._id)) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }
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
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const budget = await Budget.findById(category.monthlyBudget);

    // authorization
    if (!budget.userProfile.equals(req.profile._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const deletedCategory = await deleteCategoryData(category._id);

    res.status(200).json({
      deletedCategory,
    });
  } catch (err) {
    console.error("deleteCategory(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}