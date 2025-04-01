import { budget } from '@/database/budget';
import { Team, teamSelectSchema } from '@/models/teams/Team';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Includes
export interface BudgetIncludes {
  team?: true;
}

// Zod schemas
export const budgetInsertSchema = createInsertSchema(budget);
export const budgetSelectSchema = createSelectSchema(budget);

// Zod schema types
export type BudgetSchema = z.infer<typeof budgetSelectSchema>;
export type BudgetInsertSchema = z.infer<typeof budgetInsertSchema>;
export type BudgetUpdateSchema = Partial<BudgetInsertSchema>;

// Schema with relations
export const budgetWithRelationsSchema = budgetSelectSchema.extend({
  team: teamSelectSchema.optional(),
});

export type BudgetWithRelationsSchema = z.infer<typeof budgetWithRelationsSchema>;

// Transformed model
export interface Budget extends Omit<BudgetWithRelationsSchema, 'team'> {
  team?: Team;
}
