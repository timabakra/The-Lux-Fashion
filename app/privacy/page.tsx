"use client";


import { motion } from "motion/react";

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">Privacy Policy.</h1>
        
        <div className="prose prose-lg text-gray-500 space-y-12 leading-relaxed">
          <p className="text-xl text-black font-medium leading-relaxed">
            At The Lux Fashion, your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use our services.
          </p>

          <section>
            <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-6">1. INFORMATION WE COLLECT</h2>
            <p className="mb-4 text-gray-600">We may collect the following information when you interact with us:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Delivery address</li>
              <li>Order details and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-6">2. HOW WE USE YOUR INFORMATION</h2>
            <p className="mb-4 text-gray-600">Your information is used to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-500">
              <li>Process and manage your orders</li>
              <li>Communicate with you regarding your requests and updates</li>
              <li>Improve our services and customer experience</li>
            </ul>
            <p className="mt-6 text-gray-600 font-medium">We do not sell or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-6">3. SHARING OF INFORMATION</h2>
            <p className="text-gray-600">We may share necessary information with trusted service providers (such as delivery or payment partners) only for the purpose of completing your order.</p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-6">4. DATA SECURITY</h2>
            <p className="text-gray-600">We take reasonable steps to protect your personal information and ensure it is handled securely.</p>
          </section>

          <p className="pt-12 text-black font-bold border-t border-gray-100 flex items-center">
            <span className="w-8 h-px bg-gold mr-4"></span>
            By using our services, you agree to this Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}