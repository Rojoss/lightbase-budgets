import { Budget } from '@/models/budgets/Budget';

export const BudgetUtils = {
  getRemainingBudget: (budget: Budget): number => {
    return budget.amount - budget.amountSpent;
  },

  validateBudgetForExpense: (budget: Budget | undefined, amount: number): budget is Budget => {
    if (!budget) {
      throw new Error('Budget not found');
    }
    if (BudgetUtils.getRemainingBudget(budget) < amount) {
      throw new Error('Not enough budget left');
    }
    if (budget.endDate < new Date()) {
      throw new Error('Budget has expired');
    }
    return true;
  },
};
