import BudgetDebtItem from "../models/BudgetDebtItem.js";
import BudgetItem from "../models/BudgetItem.js";

// CREATE
// create a debt item
export async function createDebtItem(req, res) {
  try {
    const {
      budgetItem,
      debtType,
      originalBalance,
      currentBalance,
      minimumPayment,
      interestRate,
      preferredPayoffInYears,
    } = req.body;

    // does the budget item exist?
    const item = await BudgetItem.findById(budgetItem);

    if (!item) {
      return res.status(404).json({
        message: "Budget item not found",
      });
    }

    const savedDebtItem = await BudgetDebtItem.create({
      budgetItem,
      debtType,
      originalBalance,
      currentBalance,
      minimumPayment,
      interestRate,
      preferredPayoffInYears,
    });

    res.status(201).json({
      message: "Debt item created successfully!",
      savedDebtItem,
    });
  } catch (err) {
    console.error("createDebtItem(): ", err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: "A debt item already exists for this budget item.",
      });
    }

    res.status(500).json({
      message: "internal server error",
    });
  }
}

// READ
// get all debt items
export async function getAllDebtItems(_, res) {
  try {
    const debtItems = await BudgetDebtItem.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "All debt items found",
      debtItems,
    });
  } catch (err) {
    console.error("getAllDebtItems(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}

// get debt item by id
export async function getDebtItemById(req, res) {
  try {
    const debtItem = await BudgetDebtItem.findById(req.params.id);

    if (!debtItem) {
      return res.status(404).json({
        message: "Debt item not found",
      });
    }

    res.status(200).json({
      message: `Debt item with id ${req.params.id} found`,
      debtItem,
    });
  } catch (err) {
    console.error("getDebtItemById(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}

// get debt item by budget item
export async function getDebtItemByBudgetItem(req, res) {
  try {
    const debtItem = await BudgetDebtItem.findOne({
      budgetItem: req.params.budgetItemId,
    });

    if (!debtItem) {
      return res.status(404).json({
        message: "Debt item not found",
      });
    }

    res.status(200).json({
      message: "Debt item found",
      debtItem,
    });
  } catch (err) {
    console.error("getDebtItemByBudgetItem(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}

// UPDATE
// update debt item
export async function updateDebtItem(req, res) {
  try {
    const {
      debtType,
      originalBalance,
      currentBalance,
      minimumPayment,
      interestRate,
      preferredPayoffInYears,
    } = req.body;

    const updatedDebtItem = await BudgetDebtItem.findByIdAndUpdate(
      req.params.id,
      {
        debtType,
        originalBalance,
        currentBalance,
        minimumPayment,
        interestRate,
        preferredPayoffInYears,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedDebtItem) {
      return res.status(404).json({
        message: "Debt item not found",
      });
    }

    res.status(200).json({
      message: "Debt item updated successfully!",
      updatedDebtItem,
    });
  } catch (err) {
    console.error("updateDebtItem(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}

// DELETE
// delete debt item
export async function deleteDebtItem(req, res) {
  try {
    const deletedDebtItem = await BudgetDebtItem.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedDebtItem) {
      return res.status(404).json({
        message: "Debt item not found",
      });
    }

    res.status(200).json({
      message: "Debt item deleted successfully!",
      deletedDebtItem,
    });
  } catch (err) {
    console.error("deleteDebtItem(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}

// delete debt item by budget item
export async function deleteDebtItemByBudgetItem(req, res) {
  try {
    const deletedDebtItem = await BudgetDebtItem.findOneAndDelete({
      budgetItem: req.params.budgetItemId,
    });

    if (!deletedDebtItem) {
      return res.status(404).json({
        message: "Debt item not found",
      });
    }

    res.status(200).json({
      message: "Debt item deleted successfully!",
      deletedDebtItem,
    });
  } catch (err) {
    console.error("deleteDebtItemByBudgetItem(): ", err);

    res.status(500).json({
      message: "internal server error",
    });
  }
}
