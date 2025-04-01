'use server';

import { BudgetRespository } from '@/models/budgets/BudgetRepository';
import { BudgetService } from '@/models/budgets/BudgetService';
import { BudgetUtils } from '@/models/budgets/BudgetUtils';

export default async function submitExpense(formData: FormData) {
  const budgetId = formData.get('budget') as string;
  const amount = Number(formData.get('amount'));
  const message = formData.get('message') as string;

  const budget = await BudgetRespository.getBudgetById(budgetId);
  if (!BudgetUtils.validateBudgetForExpense(budget, amount)) {
    return;
  }

  // TODO: Zod validation for translation log messages
  if (message?.length < 5) {
    throw new Error('Message is too short');
  }
  if (message.length > 255) {
    throw new Error('Message is too long');
  }

  await BudgetService.addExpense(budget, amount, message);
}
