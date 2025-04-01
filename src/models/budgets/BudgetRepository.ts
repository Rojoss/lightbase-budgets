import { budget } from '@/database/budget';
import { db } from '@/lib/database';
import { Budget, BudgetIncludes } from '@/models/budgets/Budget';
import { transformBudget } from '@/models/budgets/BudgetTransformer';
import { and, eq, gte, lte } from 'drizzle-orm';

export const BudgetRespository = {
  getBudgetById: async (id: string, includes: BudgetIncludes = {}): Promise<Budget | undefined> => {
    const result = await db().query.budget.findFirst({
      where: eq(budget.id, id),
      with: includes,
    });
    return result ? transformBudget(result) : undefined;
  },

  getActiveBudgets: async (teamId: string): Promise<Budget[]> => {
    const now = new Date();
    const results = await db().query.budget.findMany({
      where: and(eq(budget.teamId, teamId), lte(budget.startDate, now), gte(budget.endDate, now)),
    });
    return results ? results.map(transformBudget) : [];
  },

  updateAmountSpent: async (id: string, amountSpent: number): Promise<Budget | undefined> => {
    const result = await db().update(budget).set({ amountSpent }).where(eq(budget.id, id)).returning();

    return result?.length ? transformBudget(result[0]) : undefined;
  },
};
