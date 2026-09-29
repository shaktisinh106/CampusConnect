import type { AppRole } from "@/lib/auth";

// Default landing page per role after login.
export const roleHome: Record<AppRole, string> = {
  student: "/dashboard",
  alumnus: "/alumni-dashboard",
  admin: "/admin",
};

// Which roles may access a given route path.
// Routes not listed here default to "all signed-in roles allowed".
export const routePermissions: Record<string, AppRole[]> = {
  // Role-exclusive landing pages
  "/dashboard": ["student", "admin"],
  "/alumni-dashboard": ["alumnus", "admin"],
  "/admin": ["admin"],

  // Student-only feature pages
  "/career": ["student", "admin"],
  "/teams": ["student", "admin"],
  "/skills": ["student", "admin"],
  "/gamification": ["student", "admin"],
  "/resources": ["student", "admin"],
  "/components": ["student", "admin"],

  // Alumni / Admin
  "/referrals": ["alumnus", "admin"],
  "/career-talks": ["alumnus", "admin"],
  "/donations": ["alumnus", "admin"],

  // Admin-only management
  "/users": ["admin"],
  "/reports": ["admin"],

  // Shared (no entry needed but listed for clarity)
  "/mentorship": ["student", "alumnus", "admin"],
  "/knowledge": ["student", "alumnus", "admin"],
  "/alumni": ["student", "alumnus", "admin"],
  "/sustainability": ["student", "alumnus", "admin"],
  "/events": ["student", "alumnus", "admin"],
  "/profile": ["student", "alumnus", "admin"],
  "/settings": ["student", "alumnus", "admin"],
};

export function canAccess(path: string, role: AppRole | null): boolean {
  if (!role) return false;
  const allowed = routePermissions[path];
  if (!allowed) return true;
  return allowed.includes(role);
}
