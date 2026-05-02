import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success("Welcome back, Admin");
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-6">
            <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 20L65 45L90 35L80 75H20L10 35L35 45L50 20Z" fill="#d4af37" />
              <circle cx="50" cy="15" r="5" fill="#d4af37" />
              <rect x="25" y="80" width="50" height="4" fill="#d4af37" rx="2" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter uppercase mb-1">THE LUX FASHION</h1>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Admin Control Center</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gold transition-colors"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
