import { Button } from '@/components/ui/button';

interface NavbarProps {
  username: string;
  teamName: string;
}

export function Navbar({ username, teamName }: NavbarProps) {
  return (
    <nav className="bg-background border-b px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/dashboard" className="font-medium">
            Dashboard
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">{username}</span>
            <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">{teamName}</span>
          </div>
          <Button variant="ghost" size="sm">
            Sign out
          </Button>
        </div>
      </div>
    </nav>
  );
}
