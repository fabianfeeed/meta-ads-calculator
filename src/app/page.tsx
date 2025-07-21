'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputField } from '@/components/calculator/InputField';
import { ResultTable } from '@/components/calculator/ResultTable';
import { KpiCard } from '@/components/calculator/KpiCard';
import { PresetManager } from '@/components/calculator/PresetManager';
import { ExportButtons } from '@/components/calculator/ExportButtons';
import { useCalculator } from '@/hooks/useCalculator';
import { useKpiStore } from '@/hooks/useKpiStore';
import { Calculator, Target } from 'lucide-react';

export default function Home() {
  const { inputs, results, updateInput, getError } = useCalculator();
  const {
    kpiData,
    presets,
    isLoading,
    updateKpiData,
    savePreset,
    loadPreset,
    deletePreset,
    resetToDefault,
    exportData,
    importData,
  } = useKpiStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-lg text-gray-600">Cargando calculadora...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Calculator className="h-10 w-10 text-blue-600" />
            Meta-Ads Budget & KPI Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calcula tu inversión publicitaria necesaria en Meta (Facebook/Instagram) Ads, 
            ROAS objetivo y monitorea tus KPIs operativos.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Paso 1: Inputs */}
          <Card className="h-fit">
            <CardHeader className="bg-blue-900 text-white">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Target className="h-5 w-5" />
                Paso 1: Datos de Entrada
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <InputField
                id="montoVentaObjetivo"
                label="Monto de Venta Objetivo"
                value={inputs.montoVentaObjetivo}
                onChange={(value) => updateInput('montoVentaObjetivo', value)}
                type="currency"
                placeholder="5,000"
                error={getError('montoVentaObjetivo') || undefined}
                tooltip={{
                  title: 'Monto de Venta Objetivo',
                  description: 'Total de ingresos que quieres generar en el período establecido'
                }}
              />
              
              <InputField
                id="ticketPromedio"
                label="Ticket Promedio"
                value={inputs.ticketPromedio}
                onChange={(value) => updateInput('ticketPromedio', value)}
                type="currency"
                placeholder="60"
                error={getError("ticketPromedio") || undefined}
                tooltip={{
                  title: 'Ticket Promedio',
                  description: 'Valor promedio de cada venta o transacción'
                }}
              />
              
              <InputField
                id="porcentajeCAC"
                label="Porcentaje CAC"
                value={inputs.porcentajeCAC}
                onChange={(value) => updateInput('porcentajeCAC', value)}
                type="percentage"
                placeholder="20"
                error={getError("porcentajeCAC") || undefined}
                tooltip={{
                  title: 'Porcentaje CAC',
                  description: 'Porcentaje de tus ingresos que estás dispuesto a invertir en adquisición de clientes'
                }}
              />
              
              <InputField
                id="tasaConversionLeads"
                label="Tasa de Conversión de Leads"
                value={inputs.tasaConversionLeads}
                onChange={(value) => updateInput('tasaConversionLeads', value)}
                type="percentage"
                placeholder="5"
                error={getError("tasaConversionLeads") || undefined}
                tooltip={{
                  title: 'Tasa de Conversión de Leads',
                  description: 'Porcentaje de leads que se convierten en ventas (por defecto 5%)'
                }}
              />
            </CardContent>
          </Card>

          {/* Paso 2: Resultados */}
          <ResultTable results={results} />
        </div>

        {/* Panel de KPIs */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <KpiCard 
              data={kpiData} 
              onUpdate={updateKpiData}
            />
          </div>
          
          <div>
            <PresetManager
              presets={presets}
              onSavePreset={savePreset}
              onLoadPreset={loadPreset}
              onDeletePreset={deletePreset}
              onResetToDefault={resetToDefault}
              onExportData={exportData}
              onImportData={importData}
            />
          </div>
        </div>

        {/* Exportación */}
        <ExportButtons
          inputs={inputs}
          results={results}
          kpiData={kpiData}
        />
      </div>
    </div>
  );
}



// This is a dummy comment to trigger a new deployment


