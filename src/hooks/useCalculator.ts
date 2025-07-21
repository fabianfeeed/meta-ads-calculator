'use client';

import { useState, useMemo, useCallback } from 'react';
import { CalculatorInputs, CalculatorResults } from '@/types/calculator';
import { calculateResults, validateInputs } from '@/utils/calculations';

const DEFAULT_INPUTS: CalculatorInputs = {
  montoVentaObjetivo: 5000,
  ticketPromedio: 60,
  porcentajeCAC: 20,
  tasaConversionLeads: 5,
};

export const useCalculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);

  // Calcular resultados automáticamente cuando cambien los inputs
  const results: CalculatorResults = useMemo(() => {
    return calculateResults(inputs);
  }, [inputs]);

  // Validar inputs
  const errors = useMemo(() => {
    return validateInputs(inputs);
  }, [inputs]);

  // Verificar si hay errores
  const hasErrors = useMemo(() => {
    return Object.values(errors).some(error => error !== null);
  }, [errors]);

  // Función para actualizar un input específico
  const updateInput = useCallback((field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Función para resetear todos los inputs a valores por defecto
  const resetInputs = useCallback(() => {
    setInputs(DEFAULT_INPUTS);
  }, []);

  // Función para establecer todos los inputs de una vez
  const setAllInputs = useCallback((newInputs: CalculatorInputs) => {
    setInputs(newInputs);
  }, []);

  // Función para obtener un input específico
  const getInput = useCallback((field: keyof CalculatorInputs): number => {
    return inputs[field];
  }, [inputs]);

  // Función para obtener un error específico
  const getError = useCallback((field: keyof CalculatorInputs): string | null => {
    return errors[field];
  }, [errors]);

  return {
    // Estado
    inputs,
    results,
    errors,
    hasErrors,
    
    // Acciones
    updateInput,
    resetInputs,
    setAllInputs,
    
    // Getters
    getInput,
    getError,
  };
};

