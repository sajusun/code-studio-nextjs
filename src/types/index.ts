export type ProductType = "web_app" | "android" | "ios" | "custom";

export interface DeveloperRole {
  id: number;
  name: string;
  slug: string;
  color: string;
  icon: string;
  description?: string | null;
  sort_order: number;
  developers_count?: number;
  published_count?: number;
}

export interface DeveloperProjectMember {
  id: number;
  name: string;
  slug: string;
  bio?: string | null;
  avatar?: string | null;
  experience_years: number;
  role_in_project: string;
  roles: DeveloperRole[];
}

export interface DeveloperProductSummary {
  id: number;
  title: string;
  slug: string;
  type: ProductType;
  category: string;
  price: string | number;
  short_description: string;
  thumbnail_url?: string | null;
  tech_stack?: string[] | null;
  role_in_project?: string | null;
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
  email?: string | null;
  phone?: string | null;
  bio?: string | null;
  avatar?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  portfolio_url?: string | null;
  twitter_url?: string | null;
  skills: string[];
  experience_years: number;
  status: "published" | "private" | "draft";
  sort_order: number;
  roles: DeveloperRole[];
  products?: DeveloperProductSummary[];
  products_count?: number;
  created_at: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  type: ProductType;
  category: string;
  price: string | number;
  short_description: string;
  description: string;
  demo_url?: string | null;
  admin_demo_url?: string | null;
  admin_demo_username?: string | null;
  admin_demo_password?: string | null;
  video_url?: string | null;
  apk_url?: string | null;
  testflight_url?: string | null;
  thumbnail?: string | null;
  thumbnail_url?: string | null;
  screenshots?: string[] | null;
  gallery_urls?: string[];
  tech_stack?: string[] | null;
  features?: string[] | null;
  contact_channels?: Record<string, string> | null;
  allow_custom_quotes: boolean;
  is_featured: boolean;
  is_active: boolean;
  developers?: DeveloperProjectMember[];
  created_at: string;
  updated_at: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  filters: {
    categories: string[];
    types: ProductType[];
    tech_stacks: string[];
  };
}

export interface ProductDetailResponse {
  success: boolean;
  product: Product;
  related: Product[];
}

export interface DeveloperDetailResponse {
  success: boolean;
  data: Developer;
}

export interface DevelopersResponse {
  success: boolean;
  data: Developer[];
  message?: string;
}

export interface DeveloperRolesResponse {
  success: boolean;
  data: DeveloperRole[];
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  platform_type?: string;
  budget?: string;
  timeline?: string;
  product_id?: number | string;
}

export interface ReverbNotificationPayload {
  id?: string | number;
  title: string;
  body: string;
  type?: string;
  link?: string;
  time?: string;
}

// ── Client Portal Types ───────────────────────────────────────────────────────

export interface ClientUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface ProjectMilestone {
  id: number;
  title: string;
  description?: string | null;
  status: "pending" | "in_progress" | "completed";
  due_date?: string | null;
  completed_at?: string | null;
  sort_order: number;
}

export interface ProjectMessage {
  id: number;
  sender_type: "client" | "admin" | "developer" | "system";
  sender_name: string;
  sender_avatar?: string | null;
  message: string;
  attachment_url?: string | null;
  attachment_name?: string | null;
  created_at: string;
  time?: string;
}

export interface ClientProjectAssignedDev {
  id: number;
  name: string;
  slug: string;
  avatar?: string | null;
  experience_years?: number;
  role_in_project: string;
  primary_role: string;
  primary_color: string;
}

export interface ClientProject {
  id: number;
  project_code: string;
  title: string;
  slug: string;
  description?: string | null;
  status: "discovery" | "in_progress" | "review" | "completed" | "on_hold";
  progress_percent: number;
  platform?: string | null;
  budget?: string | number | null;
  currency?: string;
  start_date?: string | null;
  delivery_deadline?: string | null;
  staging_url?: string | null;
  github_repo_url?: string | null;
  apk_build_url?: string | null;
  figma_url?: string | null;
  notes?: string | null;
  milestones?: ProjectMilestone[];
  milestones_count?: number;
  completed_milestones?: number;
  developers?: ClientProjectAssignedDev[];
  messages?: ProjectMessage[];
}

export interface ClientPortalProfileResponse {
  success: boolean;
  data: {
    user: ClientUser;
    stats: {
      total_projects: number;
      active_projects: number;
      completed_projects: number;
    };
  };
}

export interface ClientProjectsResponse {
  success: boolean;
  data: ClientProject[];
}

export interface ClientProjectDetailResponse {
  success: boolean;
  data: ClientProject;
}
