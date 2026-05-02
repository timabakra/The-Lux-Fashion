"use client";

import { useState, useEffect, useRef, useCallback } from "react";
// Replace react-router-dom with next/navigation and next/link
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import axios from "axios";
import { ChevronDown, X, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import { DESIGNERS_BY_CATEGORY, ALL_CATEGORIES } from "../constants";

export default function Shop() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  
  // Read params using Next.js useSearchParams
  const category = searchParams.get("category") || "All";
  const brand = searchParams.get("brand") || "All";
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort") || "newest";

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loadingMore || !hasMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loadingMore, hasMore]);

  const categories = ALL_CATEGORIES;

  const getDesigners = () => {
    if (category === "All") {
      const allDesigners = new Set<string>();
      Object.values(DESIGNERS_BY_CATEGORY).forEach(designerList => {
        designerList.forEach(d => allDesigners.add(d));
      });
      return ["All", ...Array.from(allDesigners)];
    }
    return ["All", ...(DESIGNERS_BY_CATEGORY[category] || [])];
  };

  const designers = getDesigners();

  // Reset when filters change
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [category, brand, search, sortBy]);

  useEffect(() => {
    const fetchItems = async () => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);
      
      try {
        const res = await axios.get("/api/products", {
          params: {
            page,
            limit: 24,
            category,
            brand,
            search,
            sort: sortBy
          }
        });
        
        const items = Array.isArray(res.data.items) ? res.data.items : [];
        setProducts(prev => page === 1 ? items : [...prev, ...items]);
        setHasMore(!!res.data.hasMore);
        setTotalItems(Number(res.data.total) || 0);
      } catch (e) {
        console.error("Failed to fetch items", e);
        if (page === 1) setProducts([]);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchItems();
  }, [page, category, brand, search, sortBy]);

  // Updated updateParams for Next.js navigation
  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "All" || !value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // router.push updates the URL, which triggers the useEffect reading searchParams
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search Header */}
      {search && (
        <div className="mb-8 flex items-center space-x-4 bg-gray-50 p-4 rounded-xl">
          <span className="text-sm text-gray-500">Search results for: <span className="font-bold text-black">"{search}"</span></span>
          <button 
            onClick={() => updateParams({ search: "" })}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Navigation Menu Bar */}
      <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-100 pb-8">
        <div className="w-full lg:w-auto">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => updateParams({ category: cat, brand: "All" })}
                className={cn(
                  "px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full border transition-all",
                  category === cat ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-200 hover:border-gold"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-auto">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Designers</h3>
          <div className="flex flex-wrap gap-2">
            {designers.map((d) => (
              <button
                key={d}
                onClick={() => updateParams({ brand: d })}
                className={cn(
                  "px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full border transition-all",
                  brand === d ? "bg-gold text-white border-gold" : "bg-white text-gray-500 border-gray-200 hover:border-gold"
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2">
            {category === "All" ? "Shop All" : category}
          </h1>
          <p className="text-gray-500 text-sm">
            Showing {products.length} of {totalItems} curated items
          </p>
        </div>

        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="relative group">
            <button className="flex items-center space-x-2 border border-gray-200 px-4 py-2 text-sm font-medium rounded-lg hover:border-black transition-colors">
              <span>Sort by: {sortBy === "newest" ? "Newest" : sortBy === "price-low" ? "Price: Low-High" : "Price: High-Low"}</span>
              <ChevronDown size={16} />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
              <button onClick={() => updateParams({ sort: "newest" })} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors">Newest</button>
              <button onClick={() => updateParams({ sort: "price-low" })} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors">Price: Low-High</button>
              <button onClick={() => updateParams({ sort: "price-high" })} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors">Price: High-Low</button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
            {products.map((product, index) => {
              if (!product) return null;
              return (
                <div key={index} ref={index === products.length - 1 ? lastElementRef : null}>
                  <ProductCard product={product} onDelete={handleDelete} />
                </div>
              );
            })}
          </div>
          
          {loadingMore && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="animate-spin text-gold" size={32} />
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Fetching next luxury batch...</p>
            </div>
          )}
        </>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-24">
          <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
          <button 
            onClick={() => router.push(pathname)}
            className="text-gold font-bold underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}