"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "../types";
import { motion } from "framer-motion"; 
import { useAuth } from "../context/AuthContext";
import { Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { containsChinese } from "../lib/utils";

interface ProductCardProps {
  product: Product;
  onDelete?: (id: string) => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const { isAdmin } = useAuth();
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`/api/products/${product._id}`);
      toast.success("Product deleted");
      if (onDelete) onDelete(product._id);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/admin/edit-product/${product._id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link href={`/product/${product._id}`}>
        <div className="aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg mb-4 relative">
          <img
            src={product.images?.[0] || "https://placehold.co/600x800?text=No+Image"}
            alt={product.title || "Product"}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          
          {product.trending && (
            <span className="absolute top-4 left-4 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
              Trending
            </span>
          )}
          
          {isAdmin && (
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={handleEdit}
                className="p-2 bg-white rounded-full text-gray-600 hover:text-yellow-600 shadow-lg transition-colors"
                title="Edit Product"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 bg-white rounded-full text-gray-600 hover:text-red-500 shadow-lg transition-colors"
                title="Delete Product"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 
            className="text-xs font-medium text-black group-hover:underline"
            lang={containsChinese(product.title || "") ? "zh" : undefined}
          >
            {(product.title || "").length > 25 
              ? `${(product.title || "").substring(0, 25)}...` 
              : (product.title || "")}
          </h3>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            {product.designer?.name || "Designer"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}