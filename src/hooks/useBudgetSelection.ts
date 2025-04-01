import getFittingBudget from '@/actions/getFittingBudget';
import { Budget } from '@/models/budgets/Budget';
import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

/**
 * A custom hook for automatically selecting an appropriate budget based on an amount.
 * This hook fetches and updates the selected budget whenever the amount changes.
 *
 * @param teamId - The ID of the team to fetch budgets for
 * @param amount - The amount to find a fitting budget for
 * @returns An object containing the selected budget, loading state, and any error messages
 */
export function useBudgetSelection(teamId: string, amount: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>(undefined);
  const debouncedAmount = useDebounce(amount, 500);

  useEffect(() => {
    const numAmount = parseFloat(debouncedAmount);

    if (isNaN(numAmount) || numAmount <= 0) {
      setSelectedBudget(undefined);
      return;
    }

    const fetchBudget = async () => {
      setIsLoading(true);
      try {
        const budget = await getFittingBudget(teamId, numAmount);
        setSelectedBudget(budget);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch budget');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBudget();
  }, [debouncedAmount, teamId]);

  return { selectedBudget, isLoading, error };
}
