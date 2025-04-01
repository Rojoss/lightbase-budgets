import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { budget } from './budget';
import { user } from './user';

export const team = pgTable('team', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
});

export const teamRelations = relations(team, ({ many }) => ({
  users: many(user),
  budgets: many(budget),
}));
