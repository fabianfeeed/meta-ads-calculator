'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { CalculatorResults, ROASStatus } from '@/types/calculator';
import { cn } from '@/lib/utils';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { getROASStatus } from '@/utils/calculations';

interface ResultTableProps {
  results: CalculatorResults;
  className?: string;
}

export const ResultTable: React.FC<ResultTableProps> = ({ results, className }) => {
  const roasStatus = getROASStatus(results.roasObjetivo);

  const getROASColor = (status: ROASStatus): string => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'poor':
        return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getROASIcon = (status: ROASStatus) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <TrendingUp className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'poor':
        return <TrendingDown className="h-5 w-5" />;
    }
  };

  const resultItems = [
    {
      label: 'Ventas Necesarias',
      value: formatNumber(results.ventasNecesarias),
      tooltip: {
        title: 'Ventas Necesarias',
        description: 'Número de ventas que necesitas para alcanzar tu objetivo de ingresos'
      }
    },
    {
      label: 'Leads Necesarios',
      value: formatNumber(results.leadsNecesarios),
      tooltip: {
        title: 'Leads Necesarios',
        description: 'Número de leads que necesitas generar para conseguir las ventas objetivo'
      }
    },
    {
      label: 'Coste por Compra Objetivo',
      value: formatCurrency(results.costoPorCompraObjetivo),
      tooltip: {
        title: 'Coste por Compra Objetivo',
        description: 'Máximo que puedes gastar en publicidad por cada venta conseguida'
      }
    },
    {
      label: 'ROAS Objetivo',
      value: `${results.roasObjetivo.toFixed(2)}x`,
      tooltip: {
        title: 'ROAS Objetivo',
        description: 'Return on Ad Spend - Por cada sol invertido en publicidad, cuántos soles generas en ventas'
      }
    }
  ];

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <CardTitle className="text-xl font-semibold text-blue-900 flex items-center gap-2">
          📊 Resultados del Cálculo
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        {/* Inversión Necesaria - Destacada */}
        <div className={cn(
          'p-4 rounded-lg border-2 transition-all duration-200',
          getROASColor(roasStatus)
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getROASIcon(roasStatus)}
              <div>
                <h3 className="font-semibold text-lg">Inversión Necesaria</h3>
                <p className="text-2xl font-bold">{formatCurrency(results.inversionNecesaria)}</p>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-5 w-5 opacity-70 hover:opacity-100 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="space-y-1">
                    <p className="font-medium">Inversión Necesaria</p>
                    <p className="text-sm">Total que necesitas invertir en publicidad para alcanzar tu objetivo de ventas</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Otros resultados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resultItems.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                  <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <div className="space-y-1">
                        <p className="font-medium">{item.tooltip.title}</p>
                        <p className="text-sm text-gray-600">{item.tooltip.description}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

