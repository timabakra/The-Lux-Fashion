import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Product } from "../types";
import { Edit, Trash2, Plus, LogOut, ExternalLink, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../lib/utils";

export default function AdminDashboard() {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products", { params: { limit: 1000 } });
        setProducts(res.data.items || []);
        setLoading(false);
      } catch (e) {
        toast.error("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isAdmin, navigate]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (e) {
      toast.error("Failed to delete product");
    }
  };

  const filteredProducts = products.filter((p) => {
    const title = p.title || "";
    const designerName = p.designer?.name || "";
    const categoryName = p.category?.name || "";
    
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          designerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || categoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Clothing", "Bags", "Watches", "Jewelry"];

  if (loading) return <div className="pt-32 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div></div>;

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter">Inventory Management</h1>
          <p className="text-gray-500 mt-2">Manage your curated collection of luxury items.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-black text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold transition-colors flex items-center"
          >
            <Plus size={16} className="mr-2" /> Add New Item
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="border border-gray-200 text-gray-500 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-colors flex items-center"
          >
            <LogOut size={16} className="mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold transition-colors"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-gold transition-colors appearance-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
        <div className="flex items-center justify-end text-sm text-gray-500">
          Showing {filteredProducts.length} items
        </div>
      </div>

      {/* Inventory Table/Grid */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Item</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Brand</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => {
                if (!product) return null;
                return (
                  <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 mr-4 flex-shrink-0">
                          <img 
                            src={product.images?.[0] || "https://placehold.co/100x100?text=No+Img"} 
                            alt={product.title || "Product"} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer" 
                          />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-black">{product.title || "Untitled"}</div>
                          <div className="text-[10px] text-gray-400 uppercase tracking-wider">ID: {product.product_id || product._id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-gray-500">{product.category?.name || "Uncategorized"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-gold uppercase tracking-wider">{product.designer?.name || "Designer"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {product.trending && <span className="w-2 h-2 rounded-full bg-gold" title="Trending" />}
                        {product.new && <span className="w-2 h-2 rounded-full bg-black" title="New" />}
                        <span className="text-[10px] uppercase tracking-widest text-gray-400">
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/product/${product._id}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-black transition-colors"
                          title="View Live"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        <button
                          onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                          className="p-2 text-gray-400 hover:text-gold transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-gray-400 text-sm">No items found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
