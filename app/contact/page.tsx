"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent. Our team will get back to you shortly.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h1 className="text-5xl font-bold tracking-tighter mb-8">Get in Touch.</h1>
          <p className="text-gray-500 text-lg mb-12 leading-relaxed">
            Have a question about a specific piece? Need help with sizing or shipping? Our concierge team is here to help.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="bg-gray-100 p-4 rounded-xl">
                <Mail size={24} className="text-black" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-1">Email Us</h4>
                <p className="text-gray-500">admin@theluxfashion.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="bg-gray-100 p-4 rounded-xl">
                <Phone size={24} className="text-black" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-1">WhatsApp</h4>
                <p className="text-gray-500">+1 (651) 356-4620</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="bg-gray-100 p-4 rounded-xl">
                <MapPin size={24} className="text-black" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-1">Global HQ</h4>
                <p className="text-gray-500">USA</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-10 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-black uppercase tracking-wider">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-gray-200 px-6 py-4 text-sm rounded-xl focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-black uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-gray-200 px-6 py-4 text-sm rounded-xl focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-black uppercase tracking-wider">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-white border border-gray-200 px-6 py-4 text-sm rounded-xl focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-black uppercase tracking-wider">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white border border-gray-200 px-6 py-4 text-sm rounded-xl focus:outline-none focus:border-black transition-colors resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors rounded-xl flex items-center justify-center group"
            >
              Send Message <Send size={18} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
