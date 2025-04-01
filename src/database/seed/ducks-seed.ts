import { db } from '../../lib/database';
import { budget } from '../budget';
import { team } from '../team';
import { user } from '../user';

async function seed() {
  // Create team
  const [rubberduckTeam] = await db()
    .insert(team)
    .values({
      id: crypto.randomUUID(),
      name: 'Rubberduck',
    })
    .returning();

  // Create team members
  await db()
    .insert(user)
    .values([
      {
        id: crypto.randomUUID(),
        name: 'Feather',
        email: 'feather@rubberduck.com',
        teamId: rubberduckTeam.id,
      },
      {
        id: crypto.randomUUID(),
        name: 'Quack',
        email: 'quack@rubberduck.com',
        teamId: rubberduckTeam.id,
      },
    ]);

  // Create budgets
  await db()
    .insert(budget)
    .values([
      {
        id: crypto.randomUUID(),
        name: '2025 budget',
        amount: 200.0,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2026-01-01'),
        teamId: rubberduckTeam.id,
      },
      {
        id: crypto.randomUUID(),
        name: '2025 spring budget',
        amount: 100.0,
        startDate: new Date('2025-03-21'),
        endDate: new Date('2025-06-21'),
        teamId: rubberduckTeam.id,
      },
    ]);

  console.log('Seed completed successfully!');
}

seed().catch(console.error);
