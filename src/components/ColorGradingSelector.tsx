import * as React from "react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const colorGradingOptions = [
  { label: 'Film Velvia', value: 'film-velvia' },
  { label: 'Film Portra', value: 'film-portra' },
  { label: 'Ektar', value: 'ektar' },
];

interface ColorGradingSelectorProps {
  value?: string;
  onChange?: (grading: string) => void;
  className?: string;
}

const ColorGradingSelector: React.FC<ColorGradingSelectorProps> = ({
  value = 'film-velvia',
  onChange,
  className = '',
}) => {
  const handleValueChange = (grading: string) => {
    onChange?.(grading);
  };

  return (
    <div className={cn("color-grading-selector flex flex-col", className)}>
      <label htmlFor="color-grading" className="text-gray-700 text-sm font-medium mb-2">
        Color Grading
      </label>
      <Select
        onValueChange={handleValueChange}
        defaultValue={value}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select grading..." />
        </SelectTrigger>
        <SelectContent>
          {colorGradingOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ColorGradingSelector;