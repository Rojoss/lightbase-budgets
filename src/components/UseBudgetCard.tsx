import { UseBudgetForm } from './UseBudgetForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface UseBudgetCardProps {
  teamId: string;
  onSubmit: (formData: FormData) => Promise<void>;
}

export function UseBudgetCard({ teamId, onSubmit }: UseBudgetCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Use Budget</CardTitle>
        <CardDescription>Record a new expense against a budget</CardDescription>
      </CardHeader>
      <CardContent>
        <UseBudgetForm teamId={teamId} onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
}
