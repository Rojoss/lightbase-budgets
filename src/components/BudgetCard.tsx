import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/helpers/currencyFormat';
import { Budget } from '@/models/budgets/Budget';
import { BudgetUtils } from '@/models/budgets/BudgetUtils';
import { CardLabelItem } from './CardLabelItem';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface BudgetProps {
  budget: Budget;
}

export function BudgetCard({ budget }: BudgetProps) {
  const daysRemaining = Math.ceil((budget.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{budget.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <CardLabelItem label="Total Budget" value={formatCurrency(budget.amount)} />
          <CardLabelItem label="Remaining" value={formatCurrency(BudgetUtils.getRemainingBudget(budget))} isHighlighted />
        </div>

        <Progress value={(BudgetUtils.getRemainingBudget(budget) / budget.amount) * 100} />

        <div className="space-y-1 pt-2">
          <CardLabelItem label="Start Date" value={budget.startDate.toLocaleDateString()} />
          <CardLabelItem label="End Date" value={budget.endDate.toLocaleDateString()} />
          <CardLabelItem label="Days Remaining" value={`${daysRemaining} days`} />
        </div>
      </CardContent>
    </Card>
  );
}
