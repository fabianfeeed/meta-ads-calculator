'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FileText, Download, FileSpreadsheet, Printer } from 'lucide-react';
import { CalculatorInputs, CalculatorResults, KpiData } from '@/types/calculator';
import { exportToCSV, exportToPDF } from '@/utils/exportUtils';
import { cn } from '@/lib/utils';

interface ExportButtonsProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
  kpiData: KpiData;
  className?: string;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  inputs,
  results,
  kpiData,
  className,
}) => {
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const handleExportCSV = async () => {
    setIsExporting('csv');
    try {
      exportToCSV(inputs, results, kpiData);
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      alert('Error al exportar a CSV. Por favor, inténtalo de nuevo.');
    } finally {
      setTimeout(() => setIsExporting(null), 1000);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting('pdf');
    try {
      exportToPDF(inputs, results, kpiData);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Error al exportar a PDF. Por favor, inténtalo de nuevo.');
    } finally {
      setTimeout(() => setIsExporting(null), 2000);
    }
  };

  const exportOptions = [
    {
      id: 'csv',
      label: 'Exportar CSV',
      description: 'Descargar datos en formato CSV para Excel',
      icon: FileSpreadsheet,
      onClick: handleExportCSV,
      color: 'text-green-700 border-green-300 hover:bg-green-50',
    },
    {
      id: 'pdf',
      label: 'Exportar PDF',
      description: 'Generar reporte en formato PDF',
      icon: FileText,
      onClick: handleExportPDF,
      color: 'text-red-700 border-red-300 hover:bg-red-50',
    },
  ];

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <CardTitle className="text-lg font-semibold text-blue-900 flex items-center gap-2">
          <Download className="h-5 w-5" />
          Exportar Resultados
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <p className="text-sm text-gray-600 mb-4">
            Descarga tus cálculos y KPIs en diferentes formatos para análisis posterior o presentaciones.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exportOptions.map((option) => {
              const Icon = option.icon;
              const isLoading = isExporting === option.id;
              
              return (
                <TooltipProvider key={option.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={option.onClick}
                        disabled={isLoading || isExporting !== null}
                        className={cn(
                          'h-auto p-4 flex flex-col items-center gap-2 text-center',
                          option.color,
                          isLoading && 'opacity-50 cursor-not-allowed'
                        )}
                      >
                        <Icon className={cn(
                          'h-6 w-6',
                          isLoading && 'animate-pulse'
                        )} />
                        <div>
                          <div className="font-medium text-sm">
                            {isLoading ? 'Exportando...' : option.label}
                          </div>
                          <div className="text-xs opacity-75 mt-1">
                            {option.description}
                          </div>
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{option.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-2">
              <Printer className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-600">
                <p className="font-medium mb-1">Consejos de exportación:</p>
                <ul className="space-y-1">
                  <li>• <strong>CSV:</strong> Ideal para análisis en Excel o Google Sheets</li>
                  <li>• <strong>PDF:</strong> Perfecto para reportes y presentaciones</li>
                  <li>• Los datos incluyen inputs, resultados y KPIs actuales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

