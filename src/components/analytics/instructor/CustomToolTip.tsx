type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: number, name?: string) => string;
};

export const CustomTooltip = ({
  active,
  payload,
  label,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.name === "revenue" ? "₦" : ""}${entry.value}${entry.name === "revenue" ? "" : ""}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
