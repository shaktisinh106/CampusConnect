# CampusConnect — Build Plan

This is a large 16-page SaaS platform. I'll build it in phases so we ship a polished, working product instead of 16 half-done screens. Each phase is independently usable.

## Stack & foundation (always)
- TanStack Start (already scaffolded) + TypeScript + Tailwind v4 + shadcn/ui + lucide-react
- Charts: **Recharts** (works better with React/SSR than Chart.js — same visual result)
- Animations: **Framer Motion**
- Font: **Inter** loaded via `<link>` in `__root.tsx`
- Design system in `src/styles.css` using your palette as oklch tokens, 20px radius, soft shadows, full dark mode (class-based toggle persisted to localStorage)
- Left sidebar shell (collapsible, mobile hamburger via shadcn Sidebar)
- Auth: **Lovable Cloud** (Supabase under the hood) — email/password + Google SSO, role stored in a separate `user_roles` table (student / alumnus / admin), profile table with full name. All greetings read `profile.full_name` — never hardcoded.

## Phase 1 — Foundation & Auth (this turn)
1. Enable Lovable Cloud
2. Design system + dark mode toggle + Inter font
3. App shell: sidebar nav + topbar with user menu
4. Auth pages: split-screen sign in / sign up with role tabs, forgot password, `/reset-password`, Google SSO
5. `profiles` + `user_roles` tables, trigger to auto-create profile, RLS + grants
6. Protected `_authenticated` layout, role-aware routing (student vs admin)
7. **Page 1 Landing** (hero, features, animated stat counters)
8. **Page 2 Student Dashboard** (welcome with real name, 4 analytics cards w/ mini trends, line chart, activity feed, quick access)
9. **Page 10 Admin Dashboard** (overview cards + 3 core charts + user management table)
10. **Page 9 Student Profile** (header, stats, skills, timeline)

## Phase 2 — Core collaboration
- Page 3 Mentorship Hub + booking modal
- Page 4 Resource Marketplace
- Page 5 Component Bank
- Page 6 Knowledge Repository (with upload to Cloud storage)
- Page 13 Alumni Bridge

## Phase 3 — Analytics & AI
- Page 7 Skill Gap Analytics
- Page 11 AI Career Twin (uses Lovable AI Gateway for recommendations)
- Page 12 Project Team Matchmaker
- Page 14 Sustainability Impact Dashboard
- Page 15 Gamification (legacy score, badges, leaderboards)
- Page 8 Events & Updates

## Data approach
- Phase 1 ships with seeded demo data in tables (mentors, resources, components, events) so every page looks alive immediately for any signed-in user. Real users add their own contributions on top.
- All reads go through RLS-respecting server functions or the browser client; no service-role usage in app code.

## What I'll confirm before starting
Answer the question below, then I'll execute Phase 1 end-to-end in one go.
