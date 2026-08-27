export type ProductType = "web_app" | "android" | "ios" | "custom";

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

// ── Developer Team Types ──────────────────────────────────────────────────────

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
  created_at: string;
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
