interface BudgetRowProps {
  label: string;
  value: string | number;
  isHighlighted?: boolean;
}

export function BudgetRow({ label, value, isHighlighted = false }: BudgetRowProps) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className={isHighlighted ? 'font-medium' : 'text-sm'}>{value}</span>
    </div>
  );
}
