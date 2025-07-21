export interface CalculatorInputs {
  montoVentaObjetivo: number;
  ticketPromedio: number;
  porcentajeCAC: number;
  tasaConversionLeads: number;
}

export interface CalculatorResults {
  ventasNecesarias: number;
  leadsNecesarios: number;
  costoPorCompraObjetivo: number;
  inversionNecesaria: number;
  roasObjetivo: number;
}

export interface KpiData {
  mensajes: {
    semanal: number;
    mensual: number;
  };
  costePorMensaje: number;
  ventasCerradas: {
    semanal: number;
    mensual: number;
  };
  tasaConversion: number;
  ventasObjetivo: {
    semanal: number;
  };
}

export interface KpiPreset {
  id: string;
  name: string;
  data: KpiData;
  createdAt: Date;
}

export type ROASStatus = 'excellent' | 'good' | 'warning' | 'poor';

export interface TooltipContent {
  title: string;
  description: string;
}

