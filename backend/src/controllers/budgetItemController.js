import BudgetItem from "../models/BudgetItem.js";
import Category from "../models/BudgetCategory.js";

// CREATE
// create a budget item
export async function createBudgetItem(req, res) {
    try {
        const {
            budgetCategory,
            name,
            emoji,
            itemType
        } = req.body;

        // does category exist
        const category = await Category.findById(budgetCategory);

        if (!category)
            return res.status(404).json({
                message: "Category not found"
            })
        
        // create the display order by display order
        const lastItem = await BudgetItem.findOne({
            budgetCategory,
            }).sort({ displayOrder: -1 });
        
        // if a previous item exists, display order is +1
        // otherwise its the first item so display is 0
        const displayOrder = lastItem
            ? lastItem.displayOrder + 1
            : 0;
        
        const savedItem = await BudgetItem.create({
            budgetCategory,
            displayOrder,
            name,
            emoji,
            itemType,
        });

        res.status(200).json({message: "Budget item created successfully!", savedItem})
    } catch (err) {
        console.error("createBudgetItem(): ", err);

        if (err.code === 11000) {
            return res.status(409).json({
                message:
                "An item already exists with this name for this category.",
            });
        }

        res.status(500).json({ message: "internal server error" });
    }
}

// READ
// get all budget items
export async function getAllBudgetItems(_, res) {
    try {
        const items = await BudgetItem.find().sort({createdAt: -1});
        res.status(200).json({message: "All items found:\n", items});
    } catch (err) {
        console.error("getAllBudgetItems(): ", err);
        res.status(500).json({ message: "internal server error" });
    }
}

// get budget item by id
export async function getBudgetItemById(req, res) {
    try {
        const item = await BudgetItem.findById(req.params.id);
        if (!item)
            return res.status(404).json({message: "Item not found"});
        res.status(200).json({message: `Item with id ${req.params.id} found`, item});
    } catch (err) {
        console.error("getBudgetItemById(): ", err);
        res.status(500).json({ message: "internal server error" });
    }
}

// get budget item from by category
export async function getBudgetItemByCategory(req, res) {
    try {
        const items = await BudgetItem.find({
            budgetCategory: req.params.budgetCategoryId
        }).sort({
            displayOrder: -1
        })
        res.status(200).json({message: "Items found", items})
    } catch (err) {
        console.error("getBudgetItemByCategory(): ", err);
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
            actualAmount,
            budgetPlan,
            hasReminder,
            reminderDaysBefore
        } = req.body
        const updatedItem = await BudgetItem.findByIdAndUpdate(
            req.params.id,
            {
                name,
                emoji,
                plannedAmount,
                actualAmount,
                budgetPlan,
                hasReminder,
                reminderDaysBefore
            },
            {new: true, runValidators: true}
        );
        if (!updatedItem)
            return res.status(404).json({message: "Item not found"});
        res.status(200).json({
            message: "Item updated successfully!", updatedItem
        })
    } catch (err) {
        console.error("updateBudgetItem(): ", err);
        if (err.code === 11000) {
            return res.status(409).json({
                message:
                "An item already exists with this name for this category.",
            });
        }
        res.status(500).json({ message: "internal server error" });
    }
}
// update budget item display order
export async function reorderBudgetItems(req, res) {
    try {
        const {items} = req.body;
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
                        displayOrder: item.displayOrder
                    }
                }
            }))
        );

        res.status(200).json({
            message: "Items reordered successfully",
        })
    } catch (err) {
        console.error("reorderBudgetItems(): ", err);
        res.status(500).json({ message: "internal server error" });
    }
}

// DELETE
// delete budget item
export async function deleteBudgetItem(req, res) {
    try {
        const deletedItem = await BudgetItem.findByIdAndDelete(req.params.id);
        if (!deletedItem)
            return res.status(404).json({message: "Item not found"});
        res.status(200).json({ message: "Item deleted successfully!", deletedItem });
    } catch (err) {
        console.error("deleteBudgetItem(): ", err);
        res.status(500).json({ message: "internal server error" });
    }
}
// delete budget item by category
export async function deleteBudgetItemByCategory(req, res) {
    try {
        const deletedItems = await BudgetItem.deleteMany({
            budgetCategory: req.params.budgetCategoryId
        })
        res.status(200).json({
            message: "Items deleted successfully!",
            deletedCount: deletedItems.deletedCount
        })
    } catch (err) {
        console.error("deleteBudgetItemByCategory(): ", err);
        res.status(500).json({ message: "internal server error" });
    }
}