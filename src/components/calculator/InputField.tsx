'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatInputCurrency, formatInputPercentage, formatInputNumber, parseNumericValue } from '@/utils/formatters';

interface InputFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  type?: 'currency' | 'percentage' | 'number';
  tooltip?: {
    title: string;
    description: string;
  };
  error?: string;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'number',
  tooltip,
  error,
  className,
}) => {
  const formatValue = (val: number): string => {
    if (val === 0) return '';
    
    switch (type) {
      case 'currency':
        return formatInputCurrency(val);
      case 'percentage':
        return formatInputPercentage(val);
      default:
        return formatInputNumber(val);
    }
  };

  const parseValue = (val: string): number => {
    return parseNumericValue(val);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseValue(e.target.value);
    onChange(newValue);
  };

  const getPrefix = () => {
    switch (type) {
      case 'currency':
        return 'S/.';
      case 'percentage':
        return '';
      default:
        return '';
    }
  };

  const getSuffix = () => {
    switch (type) {
      case 'percentage':
        return '%';
      default:
        return '';
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-2">
        <Label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-medium">{tooltip.title}</p>
                  <p className="text-sm text-gray-600">{tooltip.description}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      <div className="relative">
        {getPrefix() && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            {getPrefix()}
          </span>
        )}
        
        <Input
          id={id}
          type="text"
          value={formatValue(value)}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={cn(
            'transition-all duration-200',
            getPrefix() && 'pl-12',
            getSuffix() && 'pr-8',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
          )}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        
        {getSuffix() && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            {getSuffix()}
          </span>
        )}
      </div>
      
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

