import { Budget } from '@/models/budgets/Budget';

interface BudgetContentProps {
  isLoading: boolean;
  amount: string;
  selectedBudget: Budget | undefined;
}

export function BudgetContent({ isLoading, amount, selectedBudget }: BudgetContentProps) {
  if (isLoading) {
    return <div className="text-muted-foreground text-sm">Finding best fitting budget...</div>;
  }

  if (amount !== '' && !selectedBudget) {
    return <div className="text-muted-foreground text-sm">No available budget</div>;
  }

  if (!selectedBudget) {
    return <div className="text-muted-foreground text-sm">Enter an amount to find a budget</div>;
  }

  return (
    <div className="space-y-1">
      <div className="font-medium">{selectedBudget.name}</div>
      <div className="text-muted-foreground text-sm">Remaining: €{(selectedBudget.amount - selectedBudget.amountSpent).toFixed(2)}</div>
    </div>
  );
}
