import { transformTeam } from '@/models/teams/TeamTransformer';
import { User, UserWithRelationsSchema } from '@/models/users/User';

export function transformUser(user: UserWithRelationsSchema): User {
  return {
    ...user,
    teamId: user.teamId ?? undefined,
    team: user.team ? transformTeam(user.team) : undefined,
  };
}
