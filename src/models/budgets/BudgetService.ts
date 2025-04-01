import { Budget } from '@/models/budgets/Budget';
import { BudgetRespository } from '@/models/budgets/BudgetRepository';
import { BudgetUtils } from '@/models/budgets/BudgetUtils';

export const BudgetService = {
  /**
   * Gets the most suitable budget for a given amount from an array of budgets.
   * Returns the budget that:
   * 1. Is active (before end date)
   * 2. Has enough remaining balance
   * 3. Will end the soonest (least time remaining)
   *
   * @param budgets Array of budgets to choose from
   * @param amount The amount needed
   * @returns The most suitable budget or undefined if no budget fits the criteria
   */
  getFittingBudget: (budgets: Budget[], amount: number): Budget | undefined => {
    const now = new Date();

    const eligibleBudgets = budgets.filter((budget) => {
      return budget.endDate > now && BudgetUtils.getRemainingBudget(budget) >= amount;
    });

    if (eligibleBudgets.length === 0) {
      return undefined;
    }

    return eligibleBudgets.sort((a, b) => a.endDate.getTime() - b.endDate.getTime())[0];
  },

  /**
   * Adds an expense to the budget and updates the amount spent.
   * @throws {Error} If the amount exceeds the remaining budget.
   */
  addExpense: async (budget: Budget, amount: number, message: string): Promise<Budget | undefined> => {
    if (!BudgetUtils.validateBudgetForExpense(budget, amount)) {
      return;
    }

    const newAmountSpent = budget.amountSpent + amount;
    const result = await BudgetRespository.updateAmountSpent(budget.id, newAmountSpent);

    // TODO: Log the expense to the database
    console.log(message, amount);

    return result;
  },
};
