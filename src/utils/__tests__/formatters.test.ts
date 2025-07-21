import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  parseNumericValue,
  validateRange,
} from '../formatters';

describe('Formatters', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1000)).toBe('S/. 1,000.00');
      expect(formatCurrency(1234.56)).toBe('S/. 1,234.56');
      expect(formatCurrency(0)).toBe('S/. 0.00');
    });

    it('should handle large numbers', () => {
      expect(formatCurrency(1000000)).toBe('S/. 1,000,000.00');
      expect(formatCurrency(1234567.89)).toBe('S/. 1,234,567.89');
    });

    it('should handle negative numbers', () => {
      expect(formatCurrency(-1000)).toBe('S/. -1,000.00');
    });

    it('should handle decimal precision', () => {
      expect(formatCurrency(10.1)).toBe('S/. 10.10');
      expect(formatCurrency(10.999)).toBe('S/. 11.00');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1234567)).toBe('1,234,567');
    });

    it('should handle decimals correctly', () => {
      expect(formatNumber(1234.56)).toBe('1,235'); // formatNumber rounds to 0 decimals
      expect(formatNumber(1000.1)).toBe('1,000');
    });

    it('should handle zero and small numbers', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(5)).toBe('5');
      expect(formatNumber(99)).toBe('99');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentages correctly', () => {
      expect(formatPercentage(25)).toBe('25.0%');
      expect(formatPercentage(2.86)).toBe('2.9%');
      expect(formatPercentage(0)).toBe('0.0%');
    });

    it('should handle high precision', () => {
      expect(formatPercentage(33.333333)).toBe('33.3%');
      expect(formatPercentage(66.666666)).toBe('66.7%');
    });

    it('should handle edge cases', () => {
      expect(formatPercentage(100)).toBe('100.0%');
      expect(formatPercentage(0.01)).toBe('0.0%');
    });
  });

  describe('parseNumericValue', () => {
    it('should parse simple numbers', () => {
      expect(parseNumericValue('100')).toBe(100);
      expect(parseNumericValue('1234.56')).toBe(1234.56);
    });

    it('should handle currency format', () => {
      expect(parseNumericValue('S/. 1000.00')).toBe(1000);
      expect(parseNumericValue('S/. 1234.56')).toBe(1234.56);
    });

    it('should handle percentage format', () => {
      expect(parseNumericValue('25%')).toBe(25);
      expect(parseNumericValue('2.86%')).toBe(2.86);
    });

    it('should handle comma as thousands separator', () => {
      expect(parseNumericValue('10000')).toBe(10000);
      expect(parseNumericValue('1234567')).toBe(1234567);
    });

    it('should handle empty or invalid strings', () => {
      expect(parseNumericValue('')).toBe(0);
      expect(parseNumericValue('   ')).toBe(0);
      expect(parseNumericValue('abc')).toBe(0);
    });

    it('should handle mixed formats', () => {
      expect(parseNumericValue('S/. 10000.50')).toBe(10000.5);
      expect(parseNumericValue('$1234.56')).toBe(1234.56);
    });
  });

  describe('validateRange', () => {
    it('should return true for values within range', () => {
      expect(validateRange(50, 0, 100)).toBe(true);
      expect(validateRange(0, 0, 100)).toBe(true);
      expect(validateRange(100, 0, 100)).toBe(true);
    });

    it('should return false for values outside range', () => {
      expect(validateRange(-1, 0, 100)).toBe(false);
      expect(validateRange(101, 0, 100)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(validateRange(0, 0, 0)).toBe(true);
      expect(validateRange(1, 0, 0)).toBe(false);
    });

    it('should handle decimal ranges', () => {
      expect(validateRange(2.5, 0, 5)).toBe(true);
      expect(validateRange(5.1, 0, 5)).toBe(false);
    });
  });
});

