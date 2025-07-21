'use client';

import { useState, useEffect, useCallback } from 'react';
import { KpiData, KpiPreset } from '@/types/calculator';
import { calculateConversionRate } from '@/utils/calculations';

const DEFAULT_KPI_DATA: KpiData = {
  mensajes: {
    semanal: 87.5, // Promedio de 75-100
    mensual: 350, // Promedio de 300-400
  },
  costePorMensaje: 1.71, // S/ 600 / 350 mensajes
  ventasCerradas: {
    semanal: 2.5, // Promedio de 2-3
    mensual: 10, // Promedio de 8-12
  },
  tasaConversion: 2.86, // 10/350 * 100
  ventasObjetivo: {
    semanal: 1500,
  },
};

const STORAGE_KEYS = {
  KPI_DATA: 'meta-ads-calculator-kpi-data',
  KPI_PRESETS: 'meta-ads-calculator-kpi-presets',
};

export const useKpiStore = () => {
  const [kpiData, setKpiData] = useState<KpiData>(DEFAULT_KPI_DATA);
  const [presets, setPresets] = useState<KpiPreset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos del localStorage al inicializar
  useEffect(() => {
    try {
      // Cargar datos de KPI
      const savedKpiData = localStorage.getItem(STORAGE_KEYS.KPI_DATA);
      if (savedKpiData) {
        const parsedData = JSON.parse(savedKpiData);
        setKpiData(parsedData);
      }

      // Cargar presets
      const savedPresets = localStorage.getItem(STORAGE_KEYS.KPI_PRESETS);
      if (savedPresets) {
        const parsedPresets = JSON.parse(savedPresets);
        setPresets(parsedPresets);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar datos de KPI en localStorage
  const saveKpiData = useCallback((data: KpiData) => {
    try {
      localStorage.setItem(STORAGE_KEYS.KPI_DATA, JSON.stringify(data));
      setKpiData(data);
    } catch (error) {
      console.error('Error saving KPI data to localStorage:', error);
    }
  }, []);

  // Actualizar datos de KPI con recálculo automático de tasa de conversión
  const updateKpiData = useCallback((newData: KpiData) => {
    const updatedData = {
      ...newData,
      tasaConversion: calculateConversionRate(newData.mensajes.mensual, newData.ventasCerradas.mensual),
    };
    saveKpiData(updatedData);
  }, [saveKpiData]);

  // Guardar preset
  const savePreset = useCallback((name: string, data?: KpiData) => {
    const presetData = data || kpiData;
    const newPreset: KpiPreset = {
      id: Date.now().toString(),
      name,
      data: presetData,
      createdAt: new Date(),
    };

    const updatedPresets = [...presets, newPreset];
    
    try {
      localStorage.setItem(STORAGE_KEYS.KPI_PRESETS, JSON.stringify(updatedPresets));
      setPresets(updatedPresets);
      return newPreset;
    } catch (error) {
      console.error('Error saving preset to localStorage:', error);
      return null;
    }
  }, [kpiData, presets]);

  // Cargar preset
  const loadPreset = useCallback((presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      updateKpiData(preset.data);
      return true;
    }
    return false;
  }, [presets, updateKpiData]);

  // Eliminar preset
  const deletePreset = useCallback((presetId: string) => {
    const updatedPresets = presets.filter(p => p.id !== presetId);
    
    try {
      localStorage.setItem(STORAGE_KEYS.KPI_PRESETS, JSON.stringify(updatedPresets));
      setPresets(updatedPresets);
      return true;
    } catch (error) {
      console.error('Error deleting preset from localStorage:', error);
      return false;
    }
  }, [presets]);

  // Resetear a valores por defecto
  const resetToDefault = useCallback(() => {
    updateKpiData(DEFAULT_KPI_DATA);
  }, [updateKpiData]);

  // Exportar datos actuales
  const exportData = useCallback(() => {
    return {
      kpiData,
      presets,
      exportedAt: new Date().toISOString(),
    };
  }, [kpiData, presets]);

  // Importar datos
  const importData = useCallback((data: { kpiData?: KpiData; presets?: KpiPreset[] }) => {
    try {
      if (data.kpiData) {
        updateKpiData(data.kpiData);
      }
      if (data.presets && Array.isArray(data.presets)) {
        localStorage.setItem(STORAGE_KEYS.KPI_PRESETS, JSON.stringify(data.presets));
        setPresets(data.presets);
      }
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }, [updateKpiData]);

  return {
    // Estado
    kpiData,
    presets,
    isLoading,
    
    // Acciones
    updateKpiData,
    savePreset,
    loadPreset,
    deletePreset,
    resetToDefault,
    exportData,
    importData,
  };
};

