import { team } from '@/database/team';
import { Budget, budgetSelectSchema } from '@/models/budgets/Budget';
import { User, userSelectSchema } from '@/models/users/User';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Includes
export interface TeamIncludes {
  users?: true;
  budgets?: true;
}

// Zod schemas
export const teamInsertSchema = createInsertSchema(team);
export const teamSelectSchema = createSelectSchema(team);

// Zod schema types
export type TeamSchema = z.infer<typeof teamSelectSchema>;
export type TeamInsertSchema = z.infer<typeof teamInsertSchema>;
export type TeamUpdateSchema = Partial<TeamInsertSchema>;

// Schema with relations
export const teamWithRelationsSchema = teamSelectSchema.extend({
  users: userSelectSchema.array().optional(),
  budgets: budgetSelectSchema.array().optional(),
});

export type TeamWithRelationsSchema = z.infer<typeof teamWithRelationsSchema>;

// Transformed model
export interface Team extends Omit<TeamWithRelationsSchema, 'users' | 'budgets'> {
  users?: User[];
  budgets?: Budget[];
}
