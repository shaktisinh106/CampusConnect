import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "student" | "alumnus" | "admin";

export interface Profile {
  id: string;
  full_name: string;
  email: string | null;
  avatar_url: string | null;
  department: string | null;
  year: string | null;
  skills: string[] | null;
  bio: string | null;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: AppRole | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const AuthCtx = createContext<AuthState>({
  user: null, session: null, profile: null, role: null, loading: true, refresh: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (uid: string) => {
    const [{ data: prof }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", uid).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", uid),
    ]);
    setProfile(prof as Profile | null);
    const rolesList = (roles ?? []).map((r: { role: AppRole }) => r.role);
    setRole(rolesList.includes("admin") ? "admin" : rolesList.includes("alumnus") ? "alumnus" : rolesList[0] ?? "student");
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        setTimeout(() => { void loadProfile(s.user.id); }, 0);
      } else {
        setProfile(null); setRole(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) void loadProfile(s.user.id).finally(() => setLoading(false));
      else setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const refresh = async () => { if (user) await loadProfile(user.id); };

  return (
    <AuthCtx.Provider value={{ user, session, profile, role, loading, refresh }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);

export const displayName = (p: Profile | null, u: User | null) =>
  p?.full_name?.trim() ||
  (u?.user_metadata?.full_name as string | undefined) ||
  (u?.user_metadata?.name as string | undefined) ||
  u?.email?.split("@")[0] ||
  "Friend";
