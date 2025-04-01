'use server';

import { Budget } from '@/models/budgets/Budget';
import { BudgetRespository } from '@/models/budgets/BudgetRepository';
import { BudgetService } from '@/models/budgets/BudgetService';

export default async function getFittingBudget(teamId: string, amount: number): Promise<Budget | undefined> {
  // TODO: Get teamId from session
  const budgets = await BudgetRespository.getActiveBudgets(teamId);
  const result = BudgetService.getFittingBudget(budgets, amount);
  return result;
}
