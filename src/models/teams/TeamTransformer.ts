import { transformBudget } from '@/models/budgets/BudgetTransformer';
import { Team, TeamWithRelationsSchema } from '@/models/teams/Team';
import { transformUser } from '@/models/users/UserTransformer';

export function transformTeam(team: TeamWithRelationsSchema): Team {
  return {
    ...team,
    users: team.users ? team.users.map((user) => transformUser(user)) : undefined,
    budgets: team.budgets ? team.budgets.map((budget) => transformBudget(budget)) : undefined,
  };
}
