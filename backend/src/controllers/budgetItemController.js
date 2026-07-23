import BudgetItem from "../models/BudgetItem.js";
import Category from "../models/BudgetCategory.js";
import { deleteItemData } from "../services/deleteItemData.js";

// CREATE
// create a budget item
export async function createBudgetItem(req, res) {
  try {
    const { budgetCategory, monthlyBudget, name, emoji } = req.body;

    // does category exist
    const category = await Category.findById(budgetCategory)
      .populate("monthlyBudget");

    if (!category)
      return res.status(404).json({
        message: "Category not found",
      });
    
    // make sure budget -> category -> belongs to user
    if (!category.monthlyBudget.userProfile.equals(req.profile._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // create the display order by display order
    const lastItem = await BudgetItem.findOne({
      budgetCategory,
    }).sort({ displayOrder: -1 });

    // if a previous item exists, display order is +1
    // otherwise its the first item so display is 0
    let { displayOrder } = req.body;

    if (displayOrder === undefined) {
        const lastItem = await BudgetItem.findOne({
            budgetCategory,
        }).sort({ displayOrder: -1 });

        displayOrder = lastItem ? lastItem.displayOrder + 1 : 0;
    }

    const savedItem = await BudgetItem.create({
      budgetCategory,
      monthlyBudget,
      displayOrder,
      name,
      emoji,
    });

    res
      .status(200)
      .json({ savedItem });
  } catch (err) {
    console.error("createBudgetItem(): ", err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: "An item already exists with this name for this category.",
      });
    }

    res.status(500).json({ message: "internal server error" });
  }
}

// READ
// get all budget items
export async function getAllBudgetItems(_, res) {
  try {
    const items = await BudgetItem.find().sort({ createdAt: -1 });
    res.status(200).json({ items });
  } catch (err) {
    console.error("getAllBudgetItems(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// get budget item by id
export async function getBudgetItemById(req, res) {
  try {
    const item = await BudgetItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res
      .status(200)
      .json({ item });
  } catch (err) {
    console.error("getBudgetItemById(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// get budget item from by category
export async function getBudgetItemByCategory(req, res) {
  try {
    const items = await BudgetItem.find({
      budgetCategory: req.params.budgetCategoryId,
    }).sort({
      displayOrder: 1,
    });
    res.status(200).json({ items });
  } catch (err) {
    console.error("getBudgetItemByCategory(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// get budget item from by category
export async function getBudgetItemByBudget(req, res) {
  try {
    const items = await BudgetItem.find({
      monthlyBudget: req.params.monthlyBudgetId,
    }).sort({
      displayOrder: 1,
    });
    res.status(200).json({ items });
  } catch (err) {
    console.error("getBudgetItemByBudget(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// UPDATE
// update budget item
export async function updateBudgetItem(req, res) {
  try {
    const {
      name,
      emoji,
      plannedAmount,
      budgetPlan,
      hasReminder,
      reminderDaysBefore,
    } = req.body;
    const updatedItem = await BudgetItem.findByIdAndUpdate(
      req.params.id,
      {
        name,
        emoji,
        plannedAmount,
        budgetPlan,
        hasReminder,
        reminderDaysBefore,
      },
      { new: true, runValidators: true },
    );
    if (!updatedItem)
      return res.status(404).json({ message: "Item not found" });
    res.status(200).json({
      updatedItem,
    });
  } catch (err) {
    console.error("updateBudgetItem(): ", err);
    if (err.code === 11000) {
      return res.status(409).json({
        message: "An item already exists with this name for this category.",
      });
    }
    res.status(500).json({ message: "internal server error" });
  }
}

// update budget item display order
export async function reorderBudgetItems(req, res) {
  try {
    const { items } = req.body;
    // is an array
    if (!Array.isArray(items)) {
      return res.status(400).json({
        message: "Items array required",
      });
    }
    // has items in array
    if (items.length === 0) {
      return res.status(400).json({
        message: "No items provided",
      });
    }
    await BudgetItem.bulkWrite(
      items.map((item) => ({
        updateOne: {
          filter: {
            _id: item.id,
          },
          update: {
            displayOrder: item.displayOrder,
          },
        },
      })),
    );

    res.status(200).json({
      message: "Items reordered successfully",
    });
  } catch (err) {
    console.error("reorderBudgetItems(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}

// DELETE
// delete budget item
export async function deleteBudgetItem(req, res) {
  try {
    const deletedItem = await deleteItemData(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Item not found" });
    res
      .status(200)
      .json({ deletedItem });
  } catch (err) {
    console.error("deleteBudgetItem(): ", err);
    res.status(500).json({ message: "internal server error" });
  }
}