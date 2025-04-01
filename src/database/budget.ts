import { relations } from 'drizzle-orm';
import { decimal, index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { team } from './team';

export const budget = pgTable(
  'budget',
  {
    id: uuid('id').primaryKey(),
    name: text('name').notNull(),
    amount: decimal('amount', { precision: 10, scale: 2, mode: 'number' }).notNull(),
    amountSpent: decimal('amount_spent', { precision: 10, scale: 2, mode: 'number' }).notNull().default(0),
    startDate: timestamp('start_date', { mode: 'date' }).notNull(),
    endDate: timestamp('end_date', { mode: 'date' }).notNull(),
    teamId: uuid('team_id')
      .references(() => team.id)
      .notNull(),
  },
  (table) => [index('budget_team_id_idx').on(table.teamId), index('budget_date_range_idx').on(table.startDate, table.endDate)],
);

export const budgetRelations = relations(budget, ({ one }) => ({
  team: one(team, {
    fields: [budget.teamId],
    references: [team.id],
  }),
}));
