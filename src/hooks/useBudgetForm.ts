import { Budget } from '@/models/budgets/Budget';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A custom hook for managing budget form state and submission.
 *
 * @param initialBudget - The initial budget data to populate the form with, if any
 * @param onSubmit - Callback function to handle form submission
 */
export function useBudgetForm(initialBudget: Budget | undefined, onSubmit: (formData: FormData) => Promise<void>) {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>(initialBudget);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const updateSelectedBudget = useCallback((budget: Budget | undefined) => {
    setSelectedBudget(budget);
  }, []);

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      try {
        setError('');
        formData.append('budget', selectedBudget?.id.toString() ?? '');
        await onSubmit(formData);

        setShowSuccess(true);
        setAmount('');
        setMessage('');
        router.refresh();

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to submit expense');
      }
    },
    [selectedBudget, onSubmit, router],
  );

  const isValid = message.trim().length > 0 && selectedBudget !== undefined && parseFloat(amount) > 0;

  return {
    amount,
    message,
    showSuccess,
    error,
    setAmount,
    setMessage,
    handleSubmit,
    isValid,
    updateSelectedBudget,
  };
}
