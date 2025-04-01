import submitExpense from '@/actions/submitExpense';
import { BudgetsCard } from '@/components/BudgetsCard';
import { Navbar } from '@/components/Navbar';
import { UseBudgetCard } from '@/components/UseBudgetCard';
import { BudgetRespository } from '@/models/budgets/BudgetRepository';
import { UserRepository } from '@/models/users/UserRepository';
import { NextRequest, NextResponse } from 'next/server';

const DEMO_USER_ID = '4b4aab85-2ea0-483d-aa15-e2b0f97498fd';

export default async function DashboardPage(request: NextRequest) {
  // TODO: Auth
  const user = await UserRepository.getUserById(DEMO_USER_ID, { team: true });
  if (!user || !user.team) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  const budgets = await BudgetRespository.getActiveBudgets(user.team.id);
  budgets.sort((a, b) => a.endDate.getTime() - b.endDate.getTime());

  return (
    <>
      <Navbar username={user.name} teamName={user.team.name} />
      <main className="container mx-auto space-y-8 py-8">
        <BudgetsCard budgets={budgets} />
        {budgets.length > 0 && <UseBudgetCard teamId={user.team.id} onSubmit={submitExpense} />}
      </main>
    </>
  );
}
