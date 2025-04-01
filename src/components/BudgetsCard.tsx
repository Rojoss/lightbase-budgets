import { Budget } from '@/models/budgets/Budget';
import { BudgetCard } from './BudgetCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface BudgetsCardProps {
  budgets: Budget[];
}

export function BudgetsCard({ budgets }: BudgetsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
        <CardDescription>View and manage your team budgets</CardDescription>
      </CardHeader>
      <CardContent>
        {budgets.length === 0 ? (
          <p className="text-muted-foreground text-center">No budgets available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {budgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
