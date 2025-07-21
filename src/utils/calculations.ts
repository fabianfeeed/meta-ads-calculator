import { CalculatorInputs, CalculatorResults, ValidationErrors, ROASStatus } from '@/types/calculator';
import { roundToDecimals } from './formatters';

/**
 * Calcula todos los resultados basados en los inputs proporcionados
 */
export const calculateResults = (inputs: CalculatorInputs): CalculatorResults => {
  const { montoVentaObjetivo, ticketPromedio, porcentajeCAC, tasaConversionLeads } = inputs;

  // Validar que los inputs sean válidos
  if (montoVentaObjetivo <= 0 || ticketPromedio <= 0 || porcentajeCAC <= 0 || tasaConversionLeads <= 0) {
    return {
      ventasNecesarias: 0,
      leadsNecesarios: 0,
      costoPorCompraObjetivo: 0,
      inversionNecesaria: 0,
      roasObjetivo: 0,
    };
  }

  // Cálculos principales
  const ventasNecesarias = montoVentaObjetivo / ticketPromedio;
  const leadsNecesarios = ventasNecesarias / (tasaConversionLeads / 100);
  const costoPorCompraObjetivo = ticketPromedio * (porcentajeCAC / 100);
  const inversionNecesaria = montoVentaObjetivo * (porcentajeCAC / 100);
  const roasObjetivo = inversionNecesaria > 0 ? montoVentaObjetivo / inversionNecesaria : 0;

  return {
    ventasNecesarias: roundToDecimals(ventasNecesarias, 2),
    leadsNecesarios: roundToDecimals(leadsNecesarios, 2),
    costoPorCompraObjetivo: roundToDecimals(costoPorCompraObjetivo, 2),
    inversionNecesaria: roundToDecimals(inversionNecesaria, 2),
    roasObjetivo: roundToDecimals(roasObjetivo, 2),
  };
};

/**
 * Determina el estado del ROAS basado en el valor
 */
export const getROASStatus = (roas: number): ROASStatus => {
  if (roas >= 5) return 'excellent';
  if (roas >= 4) return 'good';
  if (roas >= 3) return 'warning';
  return 'poor';
};

/**
 * Valida los inputs de la calculadora
 */
export const validateInputs = (inputs: CalculatorInputs): Record<keyof CalculatorInputs, string | null> => {
  const errors: Record<keyof CalculatorInputs, string | null> = {
    montoVentaObjetivo: null,
    ticketPromedio: null,
    porcentajeCAC: null,
    tasaConversionLeads: null,
  };

  if (inputs.montoVentaObjetivo <= 0) {
    errors.montoVentaObjetivo = 'El monto debe ser mayor a 0';
  }

  if (inputs.ticketPromedio <= 0) {
    errors.ticketPromedio = 'El ticket promedio debe ser mayor a 0';
  }

  if (inputs.porcentajeCAC <= 0 || inputs.porcentajeCAC > 100) {
    errors.porcentajeCAC = 'El porcentaje debe estar entre 1 y 100';
  }

  if (inputs.tasaConversionLeads <= 0 || inputs.tasaConversionLeads > 100) {
    errors.tasaConversionLeads = 'La tasa debe estar entre 1 y 100';
  }

  return errors;
};

/**
 * Calcula la tasa de conversión basada en mensajes y ventas
 */
export const calculateConversionRate = (mensajes: number, ventas: number): number => {
  if (mensajes <= 0) return 0;
  return roundToDecimals((ventas / mensajes) * 100, 2);
};

/**
 * Calcula el coste por mensaje basado en inversión y número de mensajes
 */
export const calculateCostPerMessage = (inversion: number, mensajes: number): number => {
  if (mensajes <= 0) return 0;
  return roundToDecimals(inversion / mensajes, 2);
};

