"use client";

import React, { useState } from "react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing to THE LUX FASHION.");
    setEmail("");
  };

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Join THE LUX Circle</h2>
        <p className="text-gray-400 max-w-lg mx-auto mb-10">
          Be the first to know about new drops, exclusive curated collections, and fashion insights.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/10 border border-white/20 px-6 py-4 text-sm focus:outline-none focus:border-white transition-colors"
            required
          />
          <button
            type="submit"
            className="bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-6 text-[10px] text-gray-500 uppercase tracking-[0.2em]">
          By subscribing, you agree to our Privacy Policy.
        </p>
      </div>
    </section>
  );
}
