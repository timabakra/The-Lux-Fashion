"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
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

        <div className="bg-gray-50 p-10 rounded-3xl flex flex-col justify-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              Click the button below to send a message directly to our team.
            </p>
            <a
              href="mailto:admin@theluxfashion.com"
              className="w-full inline-flex items-center justify-center bg-black text-white py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors rounded-xl"
            >
              Contact via Email <Send size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
