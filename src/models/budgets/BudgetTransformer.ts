import { Budget, BudgetWithRelationsSchema } from '@/models/budgets/Budget';
import { transformTeam } from '@/models/teams/TeamTransformer';

export function transformBudget(budget: BudgetWithRelationsSchema): Budget {
  return {
    ...budget,
    team: budget.team ? transformTeam(budget.team) : undefined,
  };
}
