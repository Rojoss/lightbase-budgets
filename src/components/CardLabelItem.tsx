interface CardLabelItemProps {
  label: string;
  value: string | number;
  isCurrency?: boolean;
  isHighlighted?: boolean;
}

export function CardLabelItem({ label, value, isCurrency = false, isHighlighted = false }: CardLabelItemProps) {
  const formattedValue = isCurrency
    ? `€${Number(value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : value;

  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className={isHighlighted ? 'font-medium' : 'text-sm'}>{formattedValue}</span>
    </div>
  );
}
