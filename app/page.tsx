"use client";

import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import TrustBadges from "./components/TrustBadges";
import { Product } from "./types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const res = await fetch("/api/products/homepage");
        const data = await res.json();
        setTrendingProducts(data.trending);
        setNewProducts(data.newArrivals);
      } catch (e) {
        console.error("Failed to fetch homepage products", e);
      }
    };
    fetchHomepageData();
  }, []);

  const [newProducts, setNewProducts] = useState<Product[]>([]);

  const handleDelete = (id: string) => {
    setTrendingProducts(trendingProducts.filter(p => p._id !== id));
    setNewProducts(newProducts.filter(p => p._id !== id));
  };

  return (
    <>
      <div className="pt-16">
        <Hero />
        
        {/* Featured Collections */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/shop?category=Clothing&brand=Men clothing" className="group relative h-[600px] overflow-hidden bg-gray-100 rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1000&auto=format&fit=crop" 
                alt="Men's Collection" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/40 transition-colors" />
              <div className="absolute bottom-12 left-12 text-white">
                <h2 className="text-4xl font-bold tracking-tighter mb-4">Men's Clothing</h2>
                <span className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-gold">
                  Explore Now <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </div>
            </Link>
            <Link href="/shop?category=Clothing&brand=Women clothes" className="group relative h-[600px] overflow-hidden bg-gray-100 rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop" 
                alt="Women's Collection" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/40 transition-colors" />
              <div className="absolute bottom-12 left-12 text-white">
                <h2 className="text-4xl font-bold tracking-tighter mb-4">Women's Clothing</h2>
                <span className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-gold">
                  Explore Now <ArrowRight className="ml-2 w-3 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Secondary Categories */}
        <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Bags", 
                img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop", 
                link: "/shop?category=Bags" 
              },
              { 
                name: "Wrist Watches", 
                img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop", 
                link: "/shop?category=Watches" 
              },
              { 
                name: "Jewelry", 
                img: "https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
                link: "/shop?category=Jewelry" 
              }
            ].map((cat) => (
              <Link key={cat.name} href={cat.link} className="group relative h-[400px] overflow-hidden bg-gray-100 rounded-2xl">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-bold tracking-tight mb-2">{cat.name}</h3>
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    View Collection <ArrowRight className="ml-2 w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Shortlisted Items (Trending) */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-xs font-bold text-gold uppercase tracking-[0.3em] mb-2">Curated Selection</p>
              <h2 className="text-4xl font-bold tracking-tighter">Shortlisted Items</h2>
            </div>
            <Link href="/shop" className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gold hover:border-gold transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
            {trendingProducts.map((product) => {
              if (!product) return null;
              return <ProductCard key={product._id} product={product} onDelete={handleDelete} />;
            })}
          </div>
        </section>

        {/* New Items */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-xs font-bold text-gold uppercase tracking-[0.3em] mb-2">Just Arrived</p>
                <h2 className="text-4xl font-bold tracking-tighter">New Items</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
              {newProducts.map((product) => {
                if (!product) return null;
                return <ProductCard key={product._id} product={product} onDelete={handleDelete} />;
              })}
            </div>
          </div>
        </section>

        <TrustBadges />
      </div>
    </>
  );
}
