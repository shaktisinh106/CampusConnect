import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Download, Eye, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/page-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useAuth, displayName } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/knowledge")({ component: KnowledgePage });

const cats = ["All", "Notes", "Project Reports", "Internship Experiences", "Placement Preparation", "Research Papers", "Tutorials"];

function KnowledgePage() {
  const [cat, setCat] = useState("All");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["knowledge"],
    queryFn: async () => (await supabase.from("knowledge_documents").select("*").order("downloads", { ascending: false })).data ?? [],
  });
  const items = (data ?? []).filter(d => cat === "All" || d.category === cat);

  return (
    <>
      <PageHeader
        title="Knowledge Repository"
        subtitle="Preserve learning forever. Notes, reports, internship stories, research."
        action={<UploadDialog onDone={() => refetch()} />}
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${cat === c ? "gradient-brand text-primary-foreground" : "border border-border bg-card hover:bg-accent"}`}>
            {c}
          </button>
        ))}
      </div>

      {isLoading ? <div className="grid place-items-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div> : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map(d => (
            <div key={d.id} className="card-soft p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary"><BookOpen className="h-5 w-5" /></div>
              <h3 className="mt-3 font-semibold line-clamp-2">{d.title}</h3>
              <div className="mt-1 text-xs text-muted-foreground">{d.author} • {d.department}</div>
              <div className="mt-1 text-xs text-muted-foreground">{d.downloads} downloads</div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 rounded-lg"><Eye className="mr-1.5 h-4 w-4" />View</Button>
                <Button size="sm" className="flex-1 rounded-lg gradient-brand text-primary-foreground" onClick={() => toast.success("Download started")}>
                  <Download className="mr-1.5 h-4 w-4" />Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function UploadDialog({ onDone }: { onDone: () => void }) {
  const { user, profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Notes", department: "" });
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("knowledge_documents").insert({
      title: form.title, category: form.category, department: form.department || profile?.department || "General",
      author: displayName(profile, user), uploader_id: user.id,
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Uploaded! Thanks for contributing 🎉");
    setOpen(false); setForm({ title: "", category: "Notes", department: "" });
    onDone();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 rounded-xl gradient-brand text-primary-foreground"><Upload className="mr-2 h-4 w-4" />Upload</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Upload a knowledge document</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Title</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="h-11 rounded-xl mt-1.5" /></div>
          <div>
            <Label>Category</Label>
            <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
              <SelectTrigger className="h-11 rounded-xl mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>{cats.slice(1).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label>Department</Label><Input value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} placeholder="e.g. Computer Engineering" className="h-11 rounded-xl mt-1.5" /></div>
        </div>
        <DialogFooter>
          <Button onClick={submit} disabled={!form.title || saving} className="rounded-xl gradient-brand text-primary-foreground">
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
