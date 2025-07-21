/**
 * Utilidades para formateo de números y monedas
 */

export const formatCurrency = (value: number): string => {
  return `S/. ${value.toLocaleString('es-PE', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

export const formatNumber = (value: number): string => {
  return value.toLocaleString('es-PE', { 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  });
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatInputCurrency = (value: number): string => {
  if (value === 0) return '';
  return value.toLocaleString('es-PE', { 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  });
};

export const formatInputPercentage = (value: number): string => {
  if (value === 0) return '';
  return value.toString();
};

export const formatInputNumber = (value: number): string => {
  if (value === 0) return '';
  return value.toString();
};

/**
 * Parsea un valor de string a número, manejando formatos de moneda y porcentaje
 */
export const parseNumericValue = (value: string): number => {
  if (!value || value.trim() === '') return 0;
  
  // Remover caracteres no numéricos excepto punto, coma y signo negativo
  let cleanValue = value.replace(/[^\d.,-]/g, '');
  
  // Si no hay comas ni puntos, es un número simple
  if (!cleanValue.includes(',') && !cleanValue.includes('.')) {
    const parsed = parseFloat(cleanValue);
    return isNaN(parsed) ? 0 : parsed;
  }
  
  // Si hay comas, asumir que son separadores de miles y removerlas
  if (cleanValue.includes(',')) {
    cleanValue = cleanValue.replace(/,/g, '');
  }
  
  // Parsear el valor
  const parsed = parseFloat(cleanValue);
  
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Valida que un número esté dentro de un rango específico
 */
export const validateRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Redondea un número a un número específico de decimales
 */
export const roundToDecimals = (value: number, decimals: number = 2): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

