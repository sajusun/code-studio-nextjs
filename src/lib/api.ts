import { ProductDetailResponse, ProductsResponse, QuoteRequest, DevelopersResponse, DeveloperRolesResponse } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://backend.test/api/v1";

export async function fetchProducts(params: {
  type?: string;
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  perPage?: number;
  featured?: boolean;
} = {}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();
  if (params.type && params.type !== "all") searchParams.set("type", params.type);
  if (params.category && params.category !== "all") searchParams.set("category", params.category);
  if (params.search) searchParams.set("search", params.search);
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.page) searchParams.set("page", params.page.toString());
  if (params.perPage) searchParams.set("per_page", params.perPage.toString());
  if (params.featured) searchParams.set("featured", "1");

  const url = `${API_BASE}/public/products?${searchParams.toString()}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 30 }, // ISR cache revalidation
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("fetchProducts error:", err);
    return {
      success: false,
      data: [],
      meta: { current_page: 1, last_page: 1, per_page: 12, total: 0 },
      filters: { categories: [], types: [], tech_stacks: [] },
    };
  }
}

export async function fetchFeaturedProducts() {
  const url = `${API_BASE}/public/products/featured`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch featured products");
    return await res.json();
  } catch (err) {
    console.error("fetchFeaturedProducts error:", err);
    return { success: false, data: [] };
  }
}

export async function fetchProductBySlug(slug: string): Promise<ProductDetailResponse | null> {
  const url = `${API_BASE}/public/products/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 30 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`fetchProductBySlug error for slug ${slug}:`, err);
    return null;
  }
}

export async function submitQuoteRequest(data: QuoteRequest) {
  const url = `${API_BASE}/public/support/contact`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject || "Project Quote Request",
      message: `[Platform: ${data.platform_type || "General"}] [Budget: ${data.budget || "Flexible"}] ${data.message}`,
    }),
  });
  return await res.json();
}

export async function subscribeNewsletter(email: string) {
  const url = `${API_BASE}/newsletter/subscribe`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return await res.json();
}

// ── Developer Team API ────────────────────────────────────────────────────────

export async function fetchDevelopers(params: {
  role?: string;
  search?: string;
} = {}): Promise<DevelopersResponse> {
  const searchParams = new URLSearchParams();
  if (params.role) searchParams.set("role", params.role);
  if (params.search) searchParams.set("search", params.search);

  const url = `${API_BASE}/public/developers?${searchParams.toString()}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch developers");
    return await res.json();
  } catch (err) {
    console.error("fetchDevelopers error:", err);
    return { success: false, data: [] };
  }
}

export async function fetchDeveloperRoles(): Promise<DeveloperRolesResponse> {
  const url = `${API_BASE}/public/developer-roles`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch developer roles");
    return await res.json();
  } catch (err) {
    console.error("fetchDeveloperRoles error:", err);
    return { success: false, data: [] };
  }
}

