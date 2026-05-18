// ============================================================
// LEADFLOW — API SERVICE LAYER
// ============================================================
// This file defines the complete structure for connecting the
// frontend to the Java Spring Boot backend.
//
// SETUP STEPS FOR BACKEND INTEGRATION:
//  1. Create a .env.local file at project root with:
//       NEXT_PUBLIC_API_URL=http://localhost:8080/api
//  2. Remove demo mode and enable real API calls per method below.
//  3. Swap MOCK_LEADS usage in components with LeadAPI methods.
// ============================================================

// ── Base Configuration ────────────────────────────────────────
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Set to false when backend is ready
const USE_DEMO_MODE = false;

// ── Generic Fetch Wrapper ─────────────────────────────────────
interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const token = typeof window !== 'undefined'
    ? localStorage.getItem('leadflow_token')
    : null;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      (errorData as { message?: string }).message ||
      `Request failed: ${response.status} ${response.statusText}`
    );
  }

  // Handle 204 No Content
  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}

// ── Types (mirror your Java DTOs) ────────────────────────────
export interface LeadDTO {
  id?: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  status: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'LOST';
  notes: string;
  createdAt?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: string;
}

// ── Lead API ──────────────────────────────────────────────────
// BACKEND ENDPOINT MAP (Spring Boot):
//   GET    /api/leads         → getAllLeads()
//   GET    /api/leads/{id}    → getLeadById(id)
//   POST   /api/leads         → createLead(data)
//   PUT    /api/leads/{id}    → updateLead(id, data)
//   DELETE /api/leads/{id}    → deleteLead(id)
export const LeadAPI = {
  getAll: () =>
    fetchAPI<LeadDTO[]>('/leads'),

  getById: (id: string) =>
    fetchAPI<LeadDTO>(`/leads/${id}`),

  create: (data: Omit<LeadDTO, 'id' | 'createdAt'>) =>
    fetchAPI<LeadDTO>('/leads', { method: 'POST', body: data }),

  update: (id: string, data: Partial<LeadDTO>) =>
    fetchAPI<LeadDTO>(`/leads/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) =>
    fetchAPI<void>(`/leads/${id}`, { method: 'DELETE' }),
};

// ── Auth API ──────────────────────────────────────────────────
// BACKEND ENDPOINT MAP (Spring Boot):
//   POST /api/auth/login     → login(credentials)
//   POST /api/auth/register  → register(data)
//   POST /api/auth/logout    → logout()
//   GET  /api/auth/me        → getCurrentUser()
export const AuthAPI = {
  login: (credentials: AuthCredentials) =>
    fetchAPI<AuthResponse>('/auth/login', {
      method: 'POST',
      body: credentials,
    }),

  register: (data: RegisterData) =>
    fetchAPI<AuthResponse>('/auth/register', {
      method: 'POST',
      body: data,
    }),

  logout: () =>
    fetchAPI<void>('/auth/logout', { method: 'POST' }),
};

// ── Token Helpers ─────────────────────────────────────────────
export const TokenService = {
  save: (token: string) => localStorage.setItem('leadflow_token', token),
  get: () => localStorage.getItem('leadflow_token'),
  remove: () => localStorage.removeItem('leadflow_token'),
  isLoggedIn: () => !!localStorage.getItem('leadflow_token'),
};

// ── Export Demo Mode Flag ─────────────────────────────────────
export { USE_DEMO_MODE };
