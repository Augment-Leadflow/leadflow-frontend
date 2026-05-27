export type LeadStatus = 'NEW' | 'CONTACTED' | 'CONVERTED' | 'LOST';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
}

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    phone: '+91-98267-45678',
    email: 'priya.sharma@techcorp.in',
    source: 'LinkedIn',
    status: 'NEW',
    notes: 'Interested in enterprise plan. Follow up next week.',
    createdAt: '2026-05-01',
  },
  {
    id: '2',
    name: 'Rahul Verma',
    phone: '+91-91234-56789',
    email: 'rahul.v@startupxyz.com',
    source: 'Google Ads',
    status: 'CONTACTED',
    notes: 'Demo scheduled for Friday. Needs CRM integration.',
    createdAt: '2026-04-28',
  },
  {
    id: '3',
    name: 'Anjali Mehta',
    phone: '+91-87654-32109',
    email: 'anjali.mehta@bizpro.com',
    source: 'Referral',
    status: 'CONVERTED',
    notes: 'Onboarded successfully. Happy customer!',
    createdAt: '2026-04-20',
  },
  {
    id: '4',
    name: 'Sarthak Dev',
    phone: '+91-99876-54321',
    email: 'sarthak@devweb.io',
    source: 'Website',
    status: 'CONVERTED',
    notes: 'Annual plan. Ready for onboarding.',
    createdAt: '2026-04-15',
  },
  {
    id: '5',
    name: 'Kavya Reddy',
    phone: '+91-70123-45678',
    email: 'kavya.reddy@innovations.co',
    source: 'Cold Email',
    status: 'CONTACTED',
    notes: 'Requesting pricing for team of 20.',
    createdAt: '2026-05-03',
  },
  {
    id: '6',
    name: 'Arjun Kapoor',
    phone: '+91-80234-56789',
    email: 'arjun.k@enterprise.in',
    source: 'Trade Show',
    status: 'NEW',
    notes: 'Met at Tech Summit 2026. Very interested.',
    createdAt: '2026-05-05',
  },
  {
    id: '7',
    name: 'Sneha Patel',
    phone: '+91-90345-67890',
    email: 'sneha.patel@growthco.in',
    source: 'LinkedIn',
    status: 'LOST',
    notes: 'Chose competitor. Revisit in Q3.',
    createdAt: '2026-04-10',
  },
  {
    id: '8',
    name: 'Mahak Jaiswal',
    phone: '+91-98267-11111',
    email: 'mahak.j@softtech.com',
    source: 'Google',
    status: 'NEW',
    notes: 'Core Java focus. Looking for CRM automation.',
    createdAt: '2026-05-01',
  },
  {
    id: '9',
    name: 'Ishika Kag',
    phone: '+91-91234-22222',
    email: 'ishika.kag@datamail.com',
    source: 'LinkedIn',
    status: 'CONVERTED',
    notes: 'Excellent fit. Ready for onboarding.',
    createdAt: '2026-04-20',
  },
  {
    id: '10',
    name: 'Vikram Singh',
    phone: '+91-88765-43210',
    email: 'vikram.s@salespro.com',
    source: 'Webinar',
    status: 'CONTACTED',
    notes: 'Attended free webinar. High purchase intent.',
    createdAt: '2026-05-07',
  },
];

// ── Testimonials ──────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'VP of Sales',
    company: 'TechNova Inc.',
    quote:
      'LeadFlow transformed how we manage our pipeline. We saw a 3x increase in conversion rates within just 2 months.',
    rating: 5,
    avatar: 'SC',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Founder & CEO',
    company: 'GrowthHub',
    quote:
      'The automation features alone saved our team 15 hours per week. LeadFlow literally pays for itself in the first week.',
    rating: 5,
    avatar: 'MJ',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 3,
    name: 'Priya Nair',
    role: 'Sales Director',
    company: 'StartScale',
    quote:
      'Finally, a CRM that is actually intuitive. Our entire team adopted it within a day. The reporting is incredibly powerful.',
    rating: 5,
    avatar: 'PN',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Head of Business Dev',
    company: 'Apex Solutions',
    quote:
      "LeadFlow's lead scoring helped us identify high-intent leads instantly. Our close rate jumped by 40% in the first quarter.",
    rating: 5,
    avatar: 'DP',
    gradient: 'from-amber-500 to-orange-600',
  },
];

// ── Stats ─────────────────────────────────────────────────────
export const STATS = [
  { value: 50000, label: 'Businesses Worldwide', suffix: '+', decimals: 0 },
  { value: 5,     label: 'Leads Managed',        suffix: 'M+', decimals: 0 },
  { value: 98,    label: 'Customer Satisfaction', suffix: '%', decimals: 0 },
  { value: 99.9,  label: 'Platform Uptime',       suffix: '%', decimals: 1 },
];

// ── Features ──────────────────────────────────────────────────
export const FEATURES = [
  {
    icon: '🎯',
    title: 'Smart Lead Capture',
    description:
      'Auto-capture leads from web forms, social media, emails and 50+ integrations. Never miss a prospect again.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: '📊',
    title: 'Visual Pipeline',
    description:
      'Drag-and-drop Kanban boards give real-time visibility into every deal stage. Spot bottlenecks instantly.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: '📧',
    title: 'Email Automation',
    description:
      'Create smart sequences that nurture leads automatically. Personalized outreach at scale without manual effort.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: '🤖',
    title: 'AI Lead Scoring',
    description:
      'ML ranks leads by conversion probability so your team focuses on the highest-value opportunities.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: '📈',
    title: 'Advanced Analytics',
    description:
      'Deep-dive into conversion funnels, team performance and revenue forecasts with beautiful dashboards.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: '👥',
    title: 'Team Collaboration',
    description:
      'Assign leads, set reminders, leave notes and collaborate in real-time across your entire sales team.',
    color: 'from-violet-500 to-purple-600',
  },
];
