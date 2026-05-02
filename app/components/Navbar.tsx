"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, Menu, X, ChevronDown, Crown } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { DESIGNERS_BY_CATEGORY, ALL_CATEGORIES } from "../constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = ALL_CATEGORIES.filter(c => c !== "All");

  const getDesignersForCategory = (cat: string) => {
    return DESIGNERS_BY_CATEGORY[cat] || [];
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          {/* Top Row: Logo, Search, Actions */}
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-black p-1.5 rounded-lg transition-transform group-hover:scale-110">
                <Image src="/lux-resized.jpg" alt="The Lux Fashion" width={30} height={30} className="text-gold" />
              </div>
              <span className="text-xl font-bold tracking-[0.2em] text-black">THE LUX FASHION</span>
            </Link>

            {/* Search Bar (Desktop) */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8 relative">
              <input
                type="text"
                placeholder="Search for designers, items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </form>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                className="md:hidden p-2 text-gray-500 hover:text-gold transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Bottom Row: Categories (Desktop) */}
          <div className="hidden md:flex items-center justify-center space-x-8 h-12 border-t border-gray-50">
            {categories.map((cat) => (
              <div
                key={cat}
                className="relative h-full flex items-center group"
                onMouseEnter={() => setActiveDropdown(cat)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={`/shop?category=${encodeURIComponent(cat)}`}
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center",
                    searchParams.get('category') === cat ? "text-gold" : "text-gray-600 hover:text-gold"
                  )}
                >
                  {cat}
                  <ChevronDown size={12} className="ml-1 transition-transform group-hover:rotate-180" />
                </Link>

                <AnimatePresence>
                  {activeDropdown === cat && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-100 shadow-2xl rounded-b-xl py-6 px-8 z-50 grid grid-cols-2 gap-x-8 gap-y-3"
                    >
                      {getDesignersForCategory(cat).slice(0, 14).map((designer) => (
                        <Link
                          key={designer}
                          href={`/shop?category=${encodeURIComponent(cat)}&brand=${encodeURIComponent(designer)}`}
                          className="text-[10px] uppercase tracking-wider text-gray-500 hover:text-gold transition-colors whitespace-nowrap"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {designer}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </form>

              {/* Mobile Categories */}
              <div className="space-y-1">
                {categories.map((cat) => (
                  <div key={cat} className="space-y-1">
                    <Link
                      href={`/shop?category=${encodeURIComponent(cat)}`}
                      className={cn(
                        "block px-3 py-2 text-sm font-bold uppercase tracking-widest",
                        location.search.includes(encodeURIComponent(cat)) ? "text-gold bg-gray-50" : "text-gray-600"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {cat}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
