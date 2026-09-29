import { createFileRoute } from "@tanstack/react-router";
import { useAuth, displayName } from "@/lib/auth";
import { PageHeader } from "@/components/page-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/settings")({ component: SettingsPage });

function SettingsPage() {
  const { user, profile, role } = useAuth();
  const name = displayName(profile, user);

  return (
    <>
      <PageHeader title="Settings" subtitle="Account, notifications and preferences." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-soft p-6 lg:col-span-2">
          <h2 className="text-base font-semibold">Account</h2>
          <p className="text-xs text-muted-foreground">Signed in as <span className="font-medium text-foreground">{role}</span></p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Full name</Label>
              <Input defaultValue={name} className="h-10 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input defaultValue={user?.email ?? ""} disabled className="h-10 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label>Department</Label>
              <Input defaultValue={profile?.department ?? ""} className="h-10 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label>Year</Label>
              <Input defaultValue={profile?.year ?? ""} className="h-10 rounded-xl" />
            </div>
          </div>
          <Separator className="my-6" />
          <h3 className="text-sm font-semibold mb-3">Notifications</h3>
          <div className="space-y-3">
            {[
              { l: "Email me about mentorship updates", d: true },
              { l: "Notify me when resources I borrowed are due", d: true },
              { l: "Weekly digest of campus activity", d: false },
              { l: "Event reminders", d: true },
            ].map(n => (
              <div key={n.l} className="flex items-center justify-between rounded-xl border border-border p-3">
                <Label className="text-sm font-normal">{n.l}</Label>
                <Switch defaultChecked={n.d} />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => toast.success("Settings saved")} className="h-10 rounded-xl gradient-brand text-primary-foreground">Save changes</Button>
          </div>
        </div>

        <div className="card-soft p-6 space-y-3">
          <h2 className="text-base font-semibold">Appearance</h2>
          <p className="text-xs text-muted-foreground">Toggle dark mode from the top bar.</p>
          <Separator />
          <h2 className="text-base font-semibold pt-2">Danger zone</h2>
          <Button variant="outline" className="w-full rounded-xl">Reset password</Button>
          <Button variant="outline" className="w-full rounded-xl text-destructive">Delete account</Button>
        </div>
      </div>
    </>
  );
}
