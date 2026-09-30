# CampusConnect
CampusConnect
A modern, full-stack campus collaboration platform designed to bridge the gap between students, peer mentors, and academic resources. CampusConnect centralizes campus life by providing peer-to-peer mentoring, academic resource hubs, event management, and secure student networking in a responsive, real-time environment.
📌 Table of Contents
Overview
Key Features
Tech Stack
System Architecture
Getting Started
Prerequisites
Local Installation
Environment Configuration
Deployment
Routing & SPA Configuration
Project Leadership
License
📖 Overview
CampusConnect was conceived to address fragmented communication channels across university campuses. Rather than relying on disparate chat groups and bulletin boards, students can utilize a single, authenticated platform to:
Connect with verified peer mentors.
Access course study materials, notes, and past examination papers.
Track upcoming workshops, club activities, and campus hackathons.
Engage in collaborative group study workflows.
✨ Key Features
1. Peer Mentorship Network
Mentor Discovery: Filter mentors by domain, department, course, or skills.
Booking & Consultations: Dedicated channels for one-on-one academic and career guidance.
Profile Ratings & Reviews: Community-driven feedback to ensure high-quality mentorship.
2. Academic Resource Sharing
Centralized Library: Upload and categorize lecture notes, question banks, and project guides.
Access Control: Role-based security ensuring authentic campus submissions.
3. Campus Events & Announcements
Event Feed: Real-time updates on departmental seminars, extracurricular activities, and club events.
RSVP & Participation: Direct registration and event calendar management.
4. Authentication & Security
Supabase Auth: Secure authentication with Row Level Security (RLS) policies protecting user profiles and private tables.
Protected Routes: Contextual state guarding authenticated views.
🛠 Tech Stack
Frontend
Framework: React 18 with TypeScript
Build Tool: Vite
UI & Styling: Tailwind CSS & shadcn/ui
Icons: Lucide React
Routing: Client-side SPA routing
Backend & Database
Platform: Supabase
Database: PostgreSQL (with Row-Level Security)
Authentication: Supabase Auth (JWT-based session handling)
Storage: Supabase Storage buckets for documents and profile media
Hosting & DevOps
Deployment Platform: Vercel Edge Network
Version Control: Git & GitHub
🏗 System Architecture
├── src/
│   ├── components/       # Reusable UI elements (Navigation, Modals, Cards)
│   ├── contexts/         # Authentication and Global state providers
│   ├── hooks/            # Custom React hooks for data fetching
│   ├── pages/            # Page views (Home, Mentors, Resources, Events, Auth)
│   ├── lib/              # Supabase client initialization & helper utilities
│   ├── types/            # TypeScript data definitions and DB schemas
│   ├── App.tsx           # Route declarations & global layout wrappers
│   └── main.tsx          # Application entrypoint
├── public/               # Static assets & icons
├── vercel.json           # Client-side SPA route rewrite configuration
├── vite.config.ts        # Vite bundling and alias configurations
└── package.json          # Project dependencies & scripts


🚀 Getting Started
Prerequisites
Node.js (v18.0.0 or higher recommended)
npm, pnpm, or yarn
A configured Supabase project instance
Local Installation
Clone the repository:
git clone https://github.com/shaktisinh106/CampusConnect.git
cd CampusConnect


Install dependencies:
npm install


Configure Environment Variables:
Create a .env file in the root directory and add your Supabase credentials:
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
VITE_SUPABASE_PROJECT_ID=your-project-id


Run the local development server:
npm run dev

Open http://localhost:5173 in your browser.
🌐 Deployment
The project is optimized for deployment on Vercel:
Connect the GitHub repository to your Vercel account.
Select the Vite application preset.
Configure the Build & Output Settings:
Build Command: vite build (or npm run build)
Output Directory: dist
Add all environment variables prefixed with VITE_ under project settings.
Trigger the production deployment.
Routing & SPA Configuration
To prevent 404 errors on deep linking or page refreshes, ensure a vercel.json file is present in the project root:
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}


👥 Project Leadership
Role
Name
Responsibilities
Project Lead & Ideator
Krutika Pradhan
Conceptualization, project management, system requirements, and UX vision

📄 License
This project is developed for academic and campus collaboration purposes. All rights reserved by the CampusConnect team.
