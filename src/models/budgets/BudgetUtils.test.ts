import { describe, expect, it } from 'vitest';
import { Budget } from './Budget';
import { BudgetUtils } from './BudgetUtils';

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

describe('BudgetUtils', () => {
  describe('getRemainingBudget', () => {
    it('returns the correct remaining amount when no money is spent', () => {
      const budget = createTestBudget({ amount: 1000, amountSpent: 0 });
      const remaining = BudgetUtils.getRemainingBudget(budget);
      expect(remaining).toBe(1000);
    });

    it('returns the correct remaining amount when some money is spent', () => {
      const budget = createTestBudget({ amount: 1000, amountSpent: 400 });
      const remaining = BudgetUtils.getRemainingBudget(budget);
      expect(remaining).toBe(600);
    });
  });

  describe('validateBudgetForExpense', () => {
    it('returns true for valid budget and amount', () => {
      const budget = createTestBudget({ amount: 1000, amountSpent: 400 });
      expect(() => BudgetUtils.validateBudgetForExpense(budget, 500)).not.toThrow();
    });

    it('throws error when budget is undefined', () => {
      expect(() => BudgetUtils.validateBudgetForExpense(undefined, 500)).toThrow('Budget not found');
    });

    it('throws error when amount exceeds remaining budget', () => {
      const budget = createTestBudget({ amount: 1000, amountSpent: 800 });
      expect(() => BudgetUtils.validateBudgetForExpense(budget, 200.01)).toThrow('Not enough budget left');
    });

    it('throws error when budget is expired', () => {
      const budget = createTestBudget({
        endDate: new Date(2024, 11, 31), // Set end date in the past
      });
      expect(() => BudgetUtils.validateBudgetForExpense(budget, 500)).toThrow('Budget has expired');
    });

    it('validates budget with exact remaining amount', () => {
      const budget = createTestBudget({ amount: 1000, amountSpent: 500 });
      expect(() => BudgetUtils.validateBudgetForExpense(budget, 500)).not.toThrow();
    });
  });
});
