import { CalculatorInputs, CalculatorResults, KpiData } from '@/types/calculator';
import { formatCurrency, formatNumber, formatPercentage } from './formatters';

/**
 * Exporta los datos a formato CSV
 */
export const exportToCSV = (
  inputs: CalculatorInputs,
  results: CalculatorResults,
  kpiData: KpiData
): void => {
  const csvData = [
    // Header
    ['Categoría', 'Métrica', 'Valor'],
    
    // Inputs
    ['Entrada', 'Monto de Venta Objetivo', formatCurrency(inputs.montoVentaObjetivo)],
    ['Entrada', 'Ticket Promedio', formatCurrency(inputs.ticketPromedio)],
    ['Entrada', 'Porcentaje CAC', `${inputs.porcentajeCAC}%`],
    ['Entrada', 'Tasa de Conversión de Leads', `${inputs.tasaConversionLeads}%`],
    
    // Separator
    ['', '', ''],
    
    // Results
    ['Resultado', 'Ventas Necesarias', formatNumber(results.ventasNecesarias)],
    ['Resultado', 'Leads Necesarios', formatNumber(results.leadsNecesarios)],
    ['Resultado', 'Coste por Compra Objetivo', formatCurrency(results.costoPorCompraObjetivo)],
    ['Resultado', 'Inversión Necesaria', formatCurrency(results.inversionNecesaria)],
    ['Resultado', 'ROAS Objetivo', `${results.roasObjetivo.toFixed(2)}x`],
    
    // Separator
    ['', '', ''],
    
    // KPIs
    ['KPI', 'Mensajes por Semana', formatNumber(kpiData.mensajes.semanal)],
    ['KPI', 'Mensajes por Mes', formatNumber(kpiData.mensajes.mensual)],
    ['KPI', 'Coste por Mensaje', formatCurrency(kpiData.costePorMensaje)],
    ['KPI', 'Ventas Cerradas por Semana', formatNumber(kpiData.ventasCerradas.semanal)],
    ['KPI', 'Ventas Cerradas por Mes', formatNumber(kpiData.ventasCerradas.mensual)],
    ['KPI', 'Tasa de Conversión', formatPercentage(kpiData.tasaConversion)],
    ['KPI', 'Ventas Objetivo por Semana', formatCurrency(kpiData.ventasObjetivo.semanal)],
  ];

  // Convert to CSV string
  const csvContent = csvData
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `meta-ads-calculator-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

/**
 * Genera contenido HTML para el PDF
 */
export const generatePDFContent = (
  inputs: CalculatorInputs,
  results: CalculatorResults,
  kpiData: KpiData
): string => {
  const currentDate = new Date().toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Meta-Ads Budget & KPI Calculator - Reporte</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #2563eb;
          margin: 0;
          font-size: 28px;
        }
        .header p {
          color: #666;
          margin: 10px 0 0 0;
          font-size: 14px;
        }
        .section {
          margin-bottom: 30px;
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #2563eb;
        }
        .section h2 {
          color: #1e40af;
          margin-top: 0;
          font-size: 20px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 10px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 15px;
        }
        .metric {
          background: white;
          padding: 15px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }
        .metric-label {
          font-weight: 600;
          color: #475569;
          font-size: 14px;
          margin-bottom: 5px;
        }
        .metric-value {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
        }
        .highlight {
          background: #dcfce7;
          border-color: #16a34a;
          border-left-color: #16a34a;
        }
        .highlight .metric-value {
          color: #15803d;
          font-size: 24px;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 12px;
        }
        @media print {
          body { margin: 0; padding: 15px; }
          .section { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📊 Meta-Ads Budget & KPI Calculator</h1>
        <p>Reporte generado el ${currentDate}</p>
      </div>

      <div class="section">
        <h2>🎯 Datos de Entrada</h2>
        <div class="grid">
          <div class="metric">
            <div class="metric-label">Monto de Venta Objetivo</div>
            <div class="metric-value">${formatCurrency(inputs.montoVentaObjetivo)}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Ticket Promedio</div>
            <div class="metric-value">${formatCurrency(inputs.ticketPromedio)}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Porcentaje CAC</div>
            <div class="metric-value">${inputs.porcentajeCAC}%</div>
          </div>
          <div class="metric">
            <div class="metric-label">Tasa de Conversión de Leads</div>
            <div class="metric-value">${inputs.tasaConversionLeads}%</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>📈 Resultados del Cálculo</h2>
        <div class="grid">
          <div class="metric highlight">
            <div class="metric-label">Inversión Necesaria</div>
            <div class="metric-value">${formatCurrency(results.inversionNecesaria)}</div>
          </div>
          <div class="metric highlight">
            <div class="metric-label">ROAS Objetivo</div>
            <div class="metric-value">${results.roasObjetivo.toFixed(2)}x</div>
          </div>
          <div class="metric">
            <div class="metric-label">Ventas Necesarias</div>
            <div class="metric-value">${formatNumber(results.ventasNecesarias)}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Leads Necesarios</div>
            <div class="metric-value">${formatNumber(results.leadsNecesarios)}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Coste por Compra Objetivo</div>
            <div class="metric-value">${formatCurrency(results.costoPorCompraObjetivo)}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>📊 KPIs Operativos</h2>
        <div class="grid">
          <div class="metric">
            <div class="metric-label">Mensajes por Semana</div>
            <div class="metric-value">${formatNumber(kpiData.mensajes.semanal)}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Mensajes por Mes</div>
            <div class="metric-value">${formatNumber(kpiData.mensajes.mensual)}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Coste por Mensaje</div>
            <div class="metric-value">${formatCurrency(kpiData.costePorMensaje)}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Ventas Cerradas por Semana</div>
            <div class="metric-value">${formatNumber(kpiData.ventasCerradas.semanal)}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Ventas Cerradas por Mes</div>
            <div class="metric-value">${formatNumber(kpiData.ventasCerradas.mensual)}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Tasa de Conversión</div>
            <div class="metric-value">${formatPercentage(kpiData.tasaConversion)}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Ventas Objetivo por Semana</div>
            <div class="metric-value">${formatCurrency(kpiData.ventasObjetivo.semanal)}</div>
          </div>
        </div>
      </div>

      <div class="footer">
        <p>Meta-Ads Budget & KPI Calculator | Generado automáticamente</p>
      </div>
    </body>
    </html>
  `;
};

/**
 * Exporta los datos a formato PDF
 */
export const exportToPDF = (
  inputs: CalculatorInputs,
  results: CalculatorResults,
  kpiData: KpiData
): void => {
  const htmlContent = generatePDFContent(inputs, results, kpiData);
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
      // Close window after printing (optional)
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    };
  }
};

