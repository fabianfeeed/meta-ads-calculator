'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Edit3, Save, X, HelpCircle, BarChart3 } from 'lucide-react';
import { KpiData } from '@/types/calculator';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  data: KpiData;
  onUpdate: (data: KpiData) => void;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ 
  data, 
  onUpdate,
  className 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<KpiData>(data);

  const handleEdit = () => {
    setEditData(data);
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(data);
    setIsEditing(false);
  };

  const updateEditData = <T extends keyof KpiData>(
  field: T,
  value: KpiData[T]
) => {
  setEditData(prev => ({
    ...prev,
    [field]: value,
  }));
};
  const formatCurrency = (value: number): string => {
    return `S/. ${value.toFixed(2)}`;
  };

  const kpiItems = [
    {
      label: 'Mensajes/semana',
      value: isEditing ? editData.mensajes.semanal : data.mensajes.semanal,
      monthly: isEditing ? editData.mensajes.mensual : data.mensajes.mensual,
      field: 'mensajes',
      tooltip: 'Número de mensajes o leads que recibes por semana a través de tus anuncios',
      editable: true
    },
    {
      label: 'Coste por mensaje',
      value: isEditing ? editData.costePorMensaje : data.costePorMensaje,
      format: 'currency',
      field: 'costePorMensaje',
      tooltip: 'Cuánto te cuesta cada mensaje o lead generado (ideal ≤ S/. 2.00)',
      editable: true
    },
    {
      label: 'Ventas cerradas/semana',
      value: isEditing ? editData.ventasCerradas.semanal : data.ventasCerradas.semanal,
      monthly: isEditing ? editData.ventasCerradas.mensual : data.ventasCerradas.mensual,
      field: 'ventasCerradas',
      tooltip: 'Número de ventas que cierras por semana',
      editable: true
    },
    {
      label: 'Tasa de conversión',
      value: isEditing ? editData.tasaConversion : data.tasaConversion,
      format: 'percentage',
      field: 'tasaConversion',
      tooltip: 'Porcentaje de mensajes que se convierten en ventas',
      editable: false
    },
    {
      label: 'Ventas objetivo/semana',
      value: isEditing ? editData.ventasObjetivo.semanal : data.ventasObjetivo.semanal,
      format: 'currency',
      field: 'ventasObjetivo',
      tooltip: 'Objetivo de ventas semanales en soles',
      editable: true
    }
  ];

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="bg-green-50 border-b border-green-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-green-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Panel de KPIs Editables
          </CardTitle>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="text-green-700 border-green-300 hover:bg-green-50"
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Editar
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Guardar
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Metas base (S/ 600 en Ads/mes):</strong> Estos KPIs te ayudan a monitorear 
            el rendimiento de tus campañas publicitarias y optimizar tu inversión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpiItems.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-sm font-medium text-gray-700">
                  {item.label}
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-sm">{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {isEditing && item.editable ? (
                <div className="space-y-2">
                  {item.field === 'mensajes' || item.field === 'ventasCerradas' ? (
                    <>
                      <Input
                        type="number"
                        value={item.value}
                        onChange={(e) => updateEditData(item.field, {
                          ...editData[item.field],
                          semanal: parseFloat(e.target.value) || 0
                        })}
                        placeholder="Semanal"
                        className="text-sm"
                      />
                      <Input
                        type="number"
                        value={item.monthly}
                        onChange={(e) => updateEditData(item.field, {
                          ...editData[item.field],
                          mensual: parseFloat(e.target.value) || 0
                        })}
                        placeholder="Mensual"
                        className="text-sm"
                      />
                    </>
                  ) : item.field === 'ventasObjetivo' ? (
                    <Input
                      type="number"
                      value={item.value}
                      onChange={(e) => updateEditData(item.field, {
                        semanal: parseFloat(e.target.value) || 0
                      })}
                      placeholder="Semanal"
                      className="text-sm"
                    />
                  ) : (
                    <Input
                      type="number"
                      step="0.01"
                      value={item.value}
                      onChange={(e) => updateEditData(item.field, parseFloat(e.target.value) || 0)}
                      className="text-sm"
                    />
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-gray-900">
                    {item.format === 'currency' 
                      ? formatCurrency(item.value)
                      : item.format === 'percentage'
                      ? `${item.value.toFixed(1)}%`
                      : item.value.toLocaleString()
                    }
                  </p>
                  {item.monthly && (
                    <p className="text-sm text-gray-600">
                      ({item.monthly.toLocaleString()}/mes)
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

