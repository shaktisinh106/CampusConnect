import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, Package, Cpu, BookOpen, BarChart3, Calendar,
  UserCircle, Shield, Sparkles, Users2, GraduationCap, Leaf, Trophy,
  LogOut, Sun, Moon, Menu, Settings, Briefcase, Mic, Heart, FileText,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, displayName, type AppRole } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard };

const studentNav: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/mentorship", label: "Mentorship Hub", icon: Users },
  { to: "/resources", label: "Resource Marketplace", icon: Package },
  { to: "/components", label: "Component Bank", icon: Cpu },
  { to: "/knowledge", label: "Knowledge Repository", icon: BookOpen },
  { to: "/skills", label: "Skill Gap Analytics", icon: BarChart3 },
  { to: "/career", label: "AI Career Twin", icon: Sparkles },
  { to: "/teams", label: "Team Matchmaker", icon: Users2 },
  { to: "/alumni", label: "Alumni Bridge", icon: GraduationCap },
  { to: "/sustainability", label: "Sustainability", icon: Leaf },
  { to: "/gamification", label: "Legacy & Leaderboard", icon: Trophy },
  { to: "/events", label: "Events", icon: Calendar },
  { to: "/profile", label: "Profile", icon: UserCircle },
  { to: "/settings", label: "Settings", icon: Settings },
];

const alumniNav: NavItem[] = [
  { to: "/alumni-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/mentorship", label: "Student Mentorship", icon: Users },
  { to: "/referrals", label: "Internship Referrals", icon: Briefcase },
  { to: "/career-talks", label: "Career Talks", icon: Mic },
  { to: "/alumni", label: "Alumni Directory", icon: GraduationCap },
  { to: "/knowledge", label: "Knowledge Contributions", icon: BookOpen },
  { to: "/donations", label: "Resource Donations", icon: Heart },
  { to: "/sustainability", label: "Sustainability", icon: Leaf },
  { to: "/events", label: "Events", icon: Calendar },
  { to: "/profile", label: "Profile", icon: UserCircle },
  { to: "/settings", label: "Settings", icon: Settings },
];

const adminNav: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: Shield },
  { to: "/users", label: "User Management", icon: Users },
  { to: "/resources", label: "Resource Management", icon: Package },
  { to: "/components", label: "Component Management", icon: Cpu },
  { to: "/knowledge", label: "Knowledge Repository", icon: BookOpen },
  { to: "/mentorship", label: "Mentorship Management", icon: GraduationCap },
  { to: "/alumni", label: "Alumni Management", icon: Users2 },
  { to: "/events", label: "Event Management", icon: Calendar },
  { to: "/sustainability", label: "Sustainability Analytics", icon: Leaf },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];

function navFor(role: AppRole | null): NavItem[] {
  if (role === "admin") return adminNav;
  if (role === "alumnus") return alumniNav;
  return studentNav;
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { role } = useAuth();
  const items = navFor(role);
  return (
    <nav className="flex flex-col gap-1 px-3">
      {items.map((item) => {
        const active = path === item.to;
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
              active
                ? "gradient-brand text-primary-foreground shadow-soft"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <Icon className={cn("h-4 w-4 shrink-0", active && "text-primary-foreground")} />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5 px-5 py-5">
      <div className="grid h-9 w-9 place-items-center rounded-xl gradient-brand shadow-glow">
        <Sparkles className="h-5 w-5 text-primary-foreground" />
      </div>
      <div className="min-w-0">
        <div className="text-base font-bold tracking-tight">CampusConnect</div>
        <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Connect • Share • Grow</div>
      </div>
    </Link>
  );
}

function RoleBadge() {
  const { role } = useAuth();
  if (!role) return null;
  const label = role === "alumnus" ? "Alumni" : role === "admin" ? "Admin" : "Student";
  return (
    <div className="mx-5 mb-3 rounded-xl border border-sidebar-border bg-sidebar-accent/40 px-3 py-2">
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Workspace</div>
      <div className="text-sm font-semibold">{label}</div>
    </div>
  );
}

function UserMenu() {
  const { user, profile, role } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const name = displayName(profile, user);
  const initials = name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();
  const home = role === "admin" ? "/admin" : role === "alumnus" ? "/alumni-dashboard" : "/dashboard";

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Toggle theme"
        onClick={toggle}
        className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-foreground/80 transition-colors hover:bg-accent"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-xl border border-border bg-card py-1.5 pl-1.5 pr-3 transition-colors hover:bg-accent">
          <Avatar className="h-7 w-7">
            {profile?.avatar_url && <AvatarImage src={profile.avatar_url} alt={name} />}
            <AvatarFallback className="gradient-brand text-[11px] font-semibold text-primary-foreground">{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium md:inline-block max-w-[140px] truncate">{name}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="text-sm font-semibold">{name}</div>
            <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{role}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate({ to: home })}>Dashboard</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <Brand />
        <RoleBadge />
        <div className="flex-1 overflow-y-auto pb-6">
          <NavLinks />
        </div>
        <div className="border-t border-sidebar-border px-5 py-3 text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} CampusConnect
        </div>
      </aside>

      {/* Topbar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur lg:pl-[17rem]">
        <div className="flex items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card lg:hidden" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <Brand />
              <RoleBadge />
              <NavLinks onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
        <UserMenu />
      </header>

      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
