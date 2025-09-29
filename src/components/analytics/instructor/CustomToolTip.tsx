import React from "react";

type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: number, name?: string) => string;
};

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  formatter,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3 text-sm">
      <p className="font-semibold text-gray-900 mb-2">{label}</p>
      {payload.map((item, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="text-gray-600">{item.name}</span>
          <span className="font-medium text-gray-900">
            {formatter ? formatter(item.value, item.name) : item.value}
          </span>
        </div>
      ))}
    </div>
  );
};
