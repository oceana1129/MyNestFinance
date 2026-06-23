import {dashboardService} from "../services/dashboardService.js"

export async function getDashboard(req, res) {
  const dashboard =
    await dashboardService.getDashboard(
      req.params.budgetId
    );

  res.status(200).json(dashboard);
}