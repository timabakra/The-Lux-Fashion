"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Product } from "../../types";
import axios from "axios";
import { cn } from "../../lib/utils";
import { toast } from "sonner";
import { ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion"; // or "motion/react" if you prefer
import { containsChinese } from "../../lib/utils";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Next.js handles scroll restoration, but manual override is fine
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (e) {
        console.error("Failed to fetch product", e);
        toast.error("Could not load product details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 text-center">
        <p className="mb-4">Product not found.</p>
        <Link href="/shop" className="text-gold underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Changed 'to' to 'href' */}
      <Link href="/shop" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors">
        <ChevronLeft size={16} className="mr-1" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden relative group">
            <img 
              src={product.images[activeImageIndex]} 
              alt={product.title} 
              className="w-full h-full object-cover transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={() => setActiveImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setActiveImageIndex(prev => (prev + 1) % product.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          <div className="grid grid-cols-5 gap-3">
            {product.images.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setActiveImageIndex(i)}
                className={cn(
                  "aspect-square rounded-lg overflow-hidden cursor-pointer transition-all border-2",
                  activeImageIndex === i ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={img} alt={`${product.title} ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-sm font-bold text-gold uppercase tracking-[0.2em] mb-2">{product.designer?.name}</p>
          <h1 
            className="text-2xl tracking-tighter mb-4"
            lang={containsChinese(product.title || "") ? "zh" : undefined}
          >
            {product.title}
          </h1>
          <div className="flex items-center space-x-4 mb-8">
            <span className="bg-gold text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded text-white">Authentic Curated</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest">{product.category?.name}</span>
          </div>

          <div className="text-[10px] text-gray-400 mb-10 leading-relaxed uppercase tracking-wider">
            <p lang={containsChinese(product.description || "") ? "zh" : undefined}>
              {product.description || product.message}
            </p>
          </div>

          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-black uppercase tracking-wider">Select Size</h3>
              <button className="text-xs text-gray-400 underline uppercase tracking-wider">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(product.sizes || []).length > 0 ? product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "py-3 text-sm font-medium border transition-all rounded-lg",
                    selectedSize === size 
                      ? "border-black bg-black text-white" 
                      : "border-gray-200 text-gray-500 hover:border-black"
                  )}
                >
                  {size}
                </button>
              )) : (
                <div className="col-span-4 text-xs text-gray-400">One Size / Universal Fit</div>
              )}
            </div>
          </div>

          <a
            href={`https://wa.me/16513564620?text=${encodeURIComponent(`Hello, I'm interested in the ${product.title} (${product.designer?.name}) ${selectedSize ? `in size ${selectedSize}` : ''}. Could you please provide the price and ordering details?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-black text-white py-5 text-sm font-bold uppercase tracking-widest hover:bg-gold transition-colors mb-8 rounded-xl flex items-center justify-center"
          >
            Contact to Order
          </a>

          <div className="space-y-6 border-t border-gray-100 pt-8">
            <div className="flex items-start space-x-4">
              <ShieldCheck size={20} className="text-black mt-1" />
              <div>
                <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-1">Authenticity Guaranteed</h4>
                <p className="text-xs text-gray-500">We are an independent reseller of authentic items. Every piece is verified.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}