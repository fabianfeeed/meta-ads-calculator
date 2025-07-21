import { describe, it, expect } from 'vitest';
import {
  calculateResults,
  calculateConversionRate,
  validateInputs,
  getROASStatus,
} from '../calculations';
import { CalculatorInputs } from '@/types/calculator';

describe('Calculations', () => {
  describe('calculateResults', () => {
    it('should calculate correct results for valid inputs', () => {
      const inputs: CalculatorInputs = {
        montoVentaObjetivo: 5000,
        ticketPromedio: 60,
        porcentajeCAC: 20,
        tasaConversionLeads: 5,
      };

      const results = calculateResults(inputs);

      expect(results.ventasNecesarias).toBeCloseTo(83.33, 2);
      expect(results.leadsNecesarios).toBeCloseTo(1666.67, 2);
      expect(results.costoPorCompraObjetivo).toBeCloseTo(12, 2);
      expect(results.inversionNecesaria).toBeCloseTo(1000, 2);
      expect(results.roasObjetivo).toBeCloseTo(5, 2);
    });

    it('should handle edge case with high conversion rate', () => {
      const inputs: CalculatorInputs = {
        montoVentaObjetivo: 10000,
        ticketPromedio: 100,
        porcentajeCAC: 15,
        tasaConversionLeads: 10,
      };

      const results = calculateResults(inputs);

      expect(results.ventasNecesarias).toBe(100);
      expect(results.leadsNecesarios).toBe(1000);
      expect(results.costoPorCompraObjetivo).toBe(15);
      expect(results.inversionNecesaria).toBe(1500);
      expect(results.roasObjetivo).toBeCloseTo(6.67, 2);
    });

    it('should handle low conversion rate scenario', () => {
      const inputs: CalculatorInputs = {
        montoVentaObjetivo: 3000,
        ticketPromedio: 50,
        porcentajeCAC: 25,
        tasaConversionLeads: 2,
      };

      const results = calculateResults(inputs);

      expect(results.ventasNecesarias).toBe(60);
      expect(results.leadsNecesarios).toBe(3000);
      expect(results.costoPorCompraObjetivo).toBe(12.5);
      expect(results.inversionNecesaria).toBe(750);
      expect(results.roasObjetivo).toBe(4);
    });

    it('should return zero results for zero inputs', () => {
      const inputs: CalculatorInputs = {
        montoVentaObjetivo: 0,
        ticketPromedio: 0,
        porcentajeCAC: 0,
        tasaConversionLeads: 0,
      };

      const results = calculateResults(inputs);

      expect(results.ventasNecesarias).toBe(0);
      expect(results.leadsNecesarios).toBe(0);
      expect(results.costoPorCompraObjetivo).toBe(0);
      expect(results.inversionNecesaria).toBe(0);
      expect(results.roasObjetivo).toBe(0);
    });
  });

  describe('calculateConversionRate', () => {
    it('should calculate correct conversion rate', () => {
      const rate = calculateConversionRate(350, 10);
      expect(rate).toBeCloseTo(2.86, 2);
    });

    it('should handle zero messages', () => {
      const rate = calculateConversionRate(0, 10);
      expect(rate).toBe(0);
    });

    it('should handle zero sales', () => {
      const rate = calculateConversionRate(100, 0);
      expect(rate).toBe(0);
    });

    it('should handle perfect conversion', () => {
      const rate = calculateConversionRate(100, 100);
      expect(rate).toBe(100);
    });
  });

  describe('validateInputs', () => {
    it('should return no errors for valid inputs', () => {
      const inputs: CalculatorInputs = {
        montoVentaObjetivo: 5000,
        ticketPromedio: 60,
        porcentajeCAC: 20,
        tasaConversionLeads: 5,
      };

      const errors = validateInputs(inputs);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it('should return error for negative monto venta objetivo', () => {
      const inputs: CalculatorInputs = {
        montoVentaObjetivo: -1000,
        ticketPromedio: 60,
        porcentajeCAC: 20,
        tasaConversionLeads: 5,
      };

      const errors = validateInputs(inputs);
      expect(errors.montoVentaObjetivo).toBe('El monto debe ser mayor a 0');
    });

    it('should return error for zero ticket promedio', () => {
      const inputs: CalculatorInputs = {
        montoVentaObjetivo: 5000,
        ticketPromedio: 0,
        porcentajeCAC: 20,
        tasaConversionLeads: 5,
      };

      const errors = validateInputs(inputs);
      expect(errors.ticketPromedio).toBe('El ticket promedio debe ser mayor a 0');
    });

    it('should return error for invalid percentage CAC', () => {
      const inputs: CalculatorInputs = {
        montoVentaObjetivo: 5000,
        ticketPromedio: 60,
        porcentajeCAC: 150,
        tasaConversionLeads: 5,
      };

      const errors = validateInputs(inputs);
      expect(errors.porcentajeCAC).toBe('El porcentaje debe estar entre 0 y 100');
    });

    it('should return error for invalid conversion rate', () => {
      const inputs: CalculatorInputs = {
        montoVentaObjetivo: 5000,
        ticketPromedio: 60,
        porcentajeCAC: 20,
        tasaConversionLeads: -5,
      };

      const errors = validateInputs(inputs);
      expect(errors.tasaConversionLeads).toBe('La tasa de conversión debe estar entre 0 y 100');
    });

    it('should return multiple errors for multiple invalid inputs', () => {
      const inputs: CalculatorInputs = {
        montoVentaObjetivo: 0,
        ticketPromedio: -10,
        porcentajeCAC: 150,
        tasaConversionLeads: -5,
      };

      const errors = validateInputs(inputs);
      expect(Object.keys(errors)).toHaveLength(4);
    });
  });

  describe('getROASStatus', () => {
    it('should return excellent for ROAS >= 5', () => {
      expect(getROASStatus(5)).toBe('excellent');
      expect(getROASStatus(7)).toBe('excellent');
    });

    it('should return good for ROAS between 3 and 5', () => {
      expect(getROASStatus(3)).toBe('good');
      expect(getROASStatus(4)).toBe('good');
      expect(getROASStatus(4.99)).toBe('good');
    });

    it('should return warning for ROAS between 2 and 3', () => {
      expect(getROASStatus(2)).toBe('warning');
      expect(getROASStatus(2.5)).toBe('warning');
      expect(getROASStatus(2.99)).toBe('warning');
    });

    it('should return poor for ROAS < 2', () => {
      expect(getROASStatus(1)).toBe('poor');
      expect(getROASStatus(0.5)).toBe('poor');
      expect(getROASStatus(1.99)).toBe('poor');
    });

    it('should handle edge cases', () => {
      expect(getROASStatus(0)).toBe('poor');
      expect(getROASStatus(10)).toBe('excellent');
    });
  });
});

