import { team } from '@/database/team';
import { db } from '@/lib/database';
import { TeamIncludes, TeamWithRelationsSchema } from '@/models/teams/Team';
import { eq } from 'drizzle-orm';

export const TeamRepository = {
  getTeamById: async (id: string, includes: TeamIncludes = {}): Promise<TeamWithRelationsSchema | undefined> => {
    const result = await db().query.team.findFirst({
      where: eq(team.id, id),
      with: includes,
    });
    return result;
  },
};
