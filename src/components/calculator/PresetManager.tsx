'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Save, FolderOpen, Trash2, Download, Upload, RotateCcw } from 'lucide-react';
import { KpiPreset } from '@/types/calculator';
import { cn } from '@/lib/utils';

interface PresetManagerProps {
  presets: KpiPreset[];
  onSavePreset: (name: string) => void;
  onLoadPreset: (presetId: string) => void;
  onDeletePreset: (presetId: string) => void;
  onResetToDefault: () => void;
  onExportData: () => KpiData | KpiPreset[];
  onImportData: (data: KpiData | KpiPreset[]) => boolean;
  className?: string;
}

export const PresetManager: React.FC<PresetManagerProps> = ({
  presets,
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
  onResetToDefault,
  onExportData,
  onImportData,
  className,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePreset = async () => {
    if (!presetName.trim()) return;
    
    setIsSaving(true);
    try {
      onSavePreset(presetName.trim());
      setPresetName('');
      setIsDialogOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = () => {
    const data = onExportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meta-ads-calculator-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data: KpiData | KpiPreset[] = JSON.parse(e.target?.result as string);
        const success = onImportData(data);
        if (success) {
          alert('Datos importados exitosamente');
        } else {
          alert('Error al importar los datos');
        }
      } catch (error) {
        console.error("Error reading or parsing file:", error);
        alert("Error al leer el archivo");
      }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="bg-purple-50 border-b border-purple-100">
        <CardTitle className="text-lg font-semibold text-purple-900 flex items-center gap-2">
          <FolderOpen className="h-5 w-5" />
          Gestión de Presets
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        {/* Botones de acción */}
        <div className="flex flex-wrap gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-green-700 border-green-300 hover:bg-green-50">
                <Save className="h-4 w-4 mr-1" />
                Guardar Preset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Guardar Preset de KPIs</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="preset-name">Nombre del Preset</Label>
                  <Input
                    id="preset-name"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    placeholder="Ej: Campaña Q1 2024"
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleSavePreset} 
                    disabled={!presetName.trim() || isSaving}
                  >
                    {isSaving ? 'Guardando...' : 'Guardar'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={onResetToDefault}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Restaurar valores por defecto</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-1" />
                  Exportar
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Descargar backup de datos</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="import-file" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-1" />
                    Importar
                    <input
                      id="import-file"
                      type="file"
                      accept=".json"
                      onChange={handleImportData}
                      className="hidden"
                    />
                  </label>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cargar backup de datos</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Lista de presets */}
        {presets.length > 0 ? (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Presets Guardados</h4>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{preset.name}</p>
                    <p className="text-xs text-gray-500">
                      Guardado: {formatDate(preset.createdAt)}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onLoadPreset(preset.id)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <FolderOpen className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Cargar preset</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeletePreset(preset.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Eliminar preset</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <FolderOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No hay presets guardados</p>
            <p className="text-xs">Guarda tu primer preset para acceso rápido</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

