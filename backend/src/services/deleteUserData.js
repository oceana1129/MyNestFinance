import UserProfile from "../models/UserProfile.js";
import MonthlyBudget from "../models/MonthlyBudget.js";

import { deleteBudgetData } from "./deleteBudgetData.js";

/**
 * Delete user and any budgets the user has
 * 
 * @param {*} userId the id of the user
 * @returns the deleted user
 */
export async function deleteUserData(userId) {
  // find the user
  const user = await UserProfile.findById(userId);

  // if there's no user return null
  if (!user) {
    return null;
  }

  // find all budgets under the user
  const budgets = await MonthlyBudget.find({
    userProfile: user._id,
  });

  // for every budget the user has, delete it
  for (const budget of budgets) {
    await deleteBudgetData(budget._id);
  }

  // delete the user
  await UserProfile.findByIdAndDelete(user._id);

  // return deleted user
  return user;
}