import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/page-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/users")({ component: UsersPage });

function UsersPage() {
  const [q, setQ] = useState("");
  const { data: profiles } = useQuery({
    queryKey: ["admin-all-profiles"],
    queryFn: async () => (await supabase.from("profiles").select("*").limit(100)).data ?? [],
  });
  const filtered = (profiles ?? []).filter(p =>
    (p.full_name ?? "").toLowerCase().includes(q.toLowerCase()) ||
    (p.email ?? "").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <PageHeader title="User Management" subtitle="Manage students, alumni and administrators." />

      <div className="card-soft p-4 md:p-6">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="alumni">Alumni</TabsTrigger>
              <TabsTrigger value="admins">Admins</TabsTrigger>
            </TabsList>
            <TabsContent value="all" />
          </Tabs>
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or email" className="h-10 rounded-xl sm:w-72" />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8"><AvatarFallback className="gradient-brand text-xs text-primary-foreground">{(p.full_name || "?").slice(0,2).toUpperCase()}</AvatarFallback></Avatar>
                      <span className="font-medium">{p.full_name || "(unnamed)"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{p.department || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{p.email}</TableCell>
                  <TableCell><span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">Active</span></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="rounded-lg">View</Button>
                      <Button size="sm" variant="outline" className="rounded-lg" onClick={() => toast.success("Role change requested")}>Change role</Button>
                      <Button size="sm" variant="outline" className="rounded-lg" onClick={() => toast.success("Password reset email sent")}>Reset</Button>
                      <Button size="sm" variant="outline" className="rounded-lg text-destructive" onClick={() => toast.success("User suspended")}>Suspend</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
