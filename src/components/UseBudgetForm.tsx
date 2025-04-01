'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBudgetForm } from '@/hooks/useBudgetForm';
import { useBudgetSelection } from '@/hooks/useBudgetSelection';
import { useEffect } from 'react';
import { BudgetContent } from './BudgetContent';

interface UseBudgetFormProps {
  teamId: string;
  onSubmit: (formData: FormData) => Promise<void>;
}

export function UseBudgetForm({ teamId, onSubmit }: UseBudgetFormProps) {
  const {
    amount,
    message,
    showSuccess,
    error: formError,
    setAmount,
    setMessage,
    handleSubmit,
    isValid,
    updateSelectedBudget,
  } = useBudgetForm(undefined, onSubmit);

  const { selectedBudget, isLoading, error: budgetError } = useBudgetSelection(teamId, amount);

  // Update the form with the selected budget
  useEffect(() => {
    updateSelectedBudget(selectedBudget);
  }, [selectedBudget, updateSelectedBudget]);

  return (
    <form action={handleSubmit} className="space-y-6">
      {showSuccess && <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">Expense recorded successfully</div>}

      <div className="space-y-2">
        <Label htmlFor="message">Description</Label>
        <Input
          id="message"
          name="message"
          placeholder="Enter details about this expense"
          minLength={5}
          maxLength={255}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">€</div>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            className="pl-10"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Budget</Label>
        <div className="relative flex min-h-20 items-center rounded-md border px-4">
          <BudgetContent isLoading={isLoading} amount={amount} selectedBudget={selectedBudget} />
        </div>
      </div>

      {(budgetError || formError) && <div className="bg-destructive/15 text-destructive rounded-md p-3 text-sm">{budgetError || formError}</div>}

      <Button disabled={!isValid} type="submit" className="w-full">
        Record Expense
      </Button>
    </form>
  );
}
