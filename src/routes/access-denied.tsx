import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/access-denied")({ component: AccessDenied });

function AccessDenied() {
  return (
    <div className="min-h-screen grid place-items-center bg-background px-6">
      <div className="card-soft max-w-md w-full p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-destructive/10 text-destructive mb-4">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Access denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You don't have permission to view this page. Head back to your dashboard to keep exploring.
        </p>
        <Button asChild className="mt-6 h-11 w-full rounded-xl gradient-brand text-primary-foreground">
          <Link to="/">Back to safety</Link>
        </Button>
      </div>
    </div>
  );
}
