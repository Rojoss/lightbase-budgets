import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Budget } from './Budget';
import { BudgetRespository } from './BudgetRepository';
import { BudgetService } from './BudgetService';

const createTestBudget = (override: Partial<Budget> = {}): Budget => ({
  id: '1',
  name: 'Test Budget',
  amount: 1000,
  amountSpent: 0,
  startDate: new Date(),
  endDate: new Date(2025, 11, 31),
  teamId: 'team1',
  ...override,
});

describe('BudgetService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 3, 1));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getFittingBudget', () => {
    it('returns undefined when no budgets are provided', () => {
      const result = BudgetService.getFittingBudget([], 100);
      expect(result).toBeUndefined();
    });

    it('returns undefined when no budget has enough remaining balance', () => {
      const budgets: Budget[] = [
        createTestBudget({ id: '1', amount: 100, amountSpent: 80 }),
        createTestBudget({ id: '2', amount: 200, amountSpent: 190 }),
      ];
      const result = BudgetService.getFittingBudget(budgets, 50);
      expect(result).toBeUndefined();
    });

    it('returns undefined when all budgets are expired', () => {
      const pastDate = new Date(2023, 0, 1);
      const budgets: Budget[] = [
        createTestBudget({ id: '1', startDate: new Date(2022, 0, 1), endDate: pastDate }),
        createTestBudget({ id: '2', startDate: new Date(2022, 0, 1), endDate: pastDate }),
      ];
      const result = BudgetService.getFittingBudget(budgets, 50);
      expect(result).toBeUndefined();
    });

    it('returns the budget ending soonest with sufficient remaining balance', () => {
      const budgets: Budget[] = [
        createTestBudget({ id: '1', endDate: new Date(2025, 11, 31) }),
        createTestBudget({ id: '2', endDate: new Date(2025, 5, 30) }),
        createTestBudget({ id: '3', endDate: new Date(2026, 0, 1) }),
      ];
      const result = BudgetService.getFittingBudget(budgets, 500);
      expect(result).toBeDefined();
      expect(result?.id).toBe('2'); // Should pick Budget 2 as it ends soonest
    });
  });

  describe('addExpense', () => {
    beforeEach(() => {
      vi.spyOn(BudgetRespository, 'updateAmountSpent');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should call updateAmountSpent with correct parameters', async () => {
      const budget = createTestBudget();
      const amount = 500;
      const message = 'Test expense';

      vi.mocked(BudgetRespository.updateAmountSpent).mockResolvedValue({
        ...budget,
        amountSpent: amount,
      });

      await BudgetService.addExpense(budget, amount, message);

      expect(BudgetRespository.updateAmountSpent).toHaveBeenCalledWith('1', 500);
    });

    it('should throw error if amount exceeds remaining budget', async () => {
      const budget = createTestBudget({ amountSpent: 800 });
      const amount = 300;
      const message = 'Test expense';

      await expect(BudgetService.addExpense(budget, amount, message)).rejects.toThrow('Not enough budget left');

      expect(BudgetRespository.updateAmountSpent).not.toHaveBeenCalled();
    });
  });
});
