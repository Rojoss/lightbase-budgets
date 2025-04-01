import { user } from '@/database/user';
import { db } from '@/lib/database';
import { UserIncludes, UserWithRelationsSchema } from '@/models/users/User';
import { eq } from 'drizzle-orm';

export const UserRepository = {
  getUserById: async (id: string, includes: UserIncludes = {}): Promise<UserWithRelationsSchema | undefined> => {
    const result = await db().query.user.findFirst({
      where: eq(user.id, id),
      with: includes,
    });
    return result;
  },

  getUserByEmail: async (email: string, includes: UserIncludes = {}): Promise<UserWithRelationsSchema | undefined> => {
    const result = await db().query.user.findFirst({
      where: eq(user.email, email),
      with: includes,
    });
    return result;
  },
};
