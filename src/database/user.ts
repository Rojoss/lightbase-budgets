import { relations } from 'drizzle-orm';
import { index, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { team } from './team';

export const user = pgTable(
  'user',
  {
    id: uuid('id').primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    teamId: uuid('team_id').references(() => team.id),
  },
  (table) => [index('team_id_idx').on(table.teamId)],
);

export const userRelations = relations(user, ({ one }) => ({
  team: one(team, {
    fields: [user.teamId],
    references: [team.id],
  }),
}));
