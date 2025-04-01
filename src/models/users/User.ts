import { user } from '@/database/user';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { Team, teamSelectSchema } from '../teams/Team';

// Includes
export interface UserIncludes {
  team?: true;
}

// Zod schemas
export const userInsertSchema = createInsertSchema(user);
export const userSelectSchema = createSelectSchema(user);

// Types derived from Zod schemas
export type UserSchema = z.infer<typeof userSelectSchema>;
export type UserInsertSchema = z.infer<typeof userInsertSchema>;
export type UserUpdateUser = Partial<UserInsertSchema>;

// Schema with relations
export const uerWithRelationsSchema = userSelectSchema.extend({
  team: teamSelectSchema.optional(),
});

export type UserWithRelationsSchema = z.infer<typeof uerWithRelationsSchema>;

// Transformed model
export interface User extends Omit<UserWithRelationsSchema, 'teamId' | 'team'> {
  teamId?: string;
  team?: Team;
}
