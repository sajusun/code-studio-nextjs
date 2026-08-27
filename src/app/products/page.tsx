import React from "react";
import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import { ProductCard } from "@/components/products/ProductCard";
import { Layers, Search, Filter, Globe, Smartphone, ShieldCheck, ArrowLeft } from "lucide-react";

export const revalidate = 30;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; category?: string; search?: string; sort?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const { data: products, meta } = await fetchProducts({
    type: resolvedParams.type,
    category: resolvedParams.category,
    search: resolvedParams.search,
    sort: resolvedParams.sort,
    page: resolvedParams.page ? parseInt(resolvedParams.page, 10) : 1,
    perPage: 15,
  });

  const currentType = resolvedParams.type || "all";

  const typeTabs = [
    { label: "All Software", value: "all", icon: Layers },
    { label: "Web Applications", value: "web_app", icon: Globe },
    { label: "Android APKs", value: "android", icon: Smartphone },
    { label: "iOS TestFlight", value: "ios", icon: Smartphone },
    { label: "Custom SaaS", value: "custom", icon: ShieldCheck },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-white/5">
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 font-bold mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Software Showcase & Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Browse our complete catalog of {meta.total} production-ready web apps, mobile builds, and SaaS tools.
          </p>
        </div>

        {/* Search Bar Form */}
        <form method="GET" action="/products" className="w-full md:w-80">
          <div className="relative">
            <input
              type="text"
              name="search"
              defaultValue={resolvedParams.search || ""}
              placeholder="Search software, tags, stack..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3" />
          </div>
          {resolvedParams.type && <input type="hidden" name="type" value={resolvedParams.type} />}
        </form>
      </div>

      {/* Platform Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {typeTabs.map((tab) => {
          const isActive = currentType === tab.value;
          return (
            <Link
              key={tab.value}
              href={`/products?type=${tab.value}${resolvedParams.search ? `&search=${encodeURIComponent(resolvedParams.search)}` : ""}`}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                isActive
                  ? "bg-blue-50 dark:bg-cyan-500/10 text-blue-700 dark:text-cyan-300 border-blue-300 dark:border-cyan-500/30 shadow-xs"
                  : "bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Product Grid */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-card rounded-3xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No matching products found</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
            Try adjusting your search criteria or platform filter to find what you are looking for.
          </p>
          <Link
            href="/products"
            className="inline-block px-5 py-2.5 rounded-xl btn-primary text-xs font-bold shadow-md transition-transform"
          >
            Clear All Filters
          </Link>
        </div>
      )}

    </div>
  );
}
