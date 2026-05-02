import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-8 group">
              <div className="flex-shrink-0">
                <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 20L65 45L90 35L80 75H20L10 35L35 45L50 20Z" fill="#d4af37" />
                  <circle cx="50" cy="15" r="5" fill="#d4af37" />
                  <rect x="25" y="80" width="50" height="4" fill="#d4af37" rx="2" />
                </svg>
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-lg font-bold tracking-[0.25em] text-black leading-none">THE LUX</span>
                <span className="text-[9px] font-medium tracking-[0.4em] text-gold uppercase">Fashion</span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The Lux Fashion 🛍️. Your Personal Shopper in the US 🇺🇸. Trendy fits, shoes & must-haves. We find it. You wear it. ✨. Order via DM👇
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-6">Shop</h3>
            <ul className="space-y-4">
              <li><Link href="/shop?category=Clothing" className="text-gray-500 hover:text-gold text-sm transition-colors">Clothing</Link></li>
              <li><Link href="/shop?category=Bags" className="text-gray-500 hover:text-gold text-sm transition-colors">Bags</Link></li>
              <li><Link href="/shop?category=Watches" className="text-gray-500 hover:text-gold text-sm transition-colors">Watches</Link></li>
              <li><Link href="/shop?category=Jewelry" className="text-gray-500 hover:text-gold text-sm transition-colors">Jewelry</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-500 hover:text-gold text-sm transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-500 hover:text-gold text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-gray-500 hover:text-gold text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
            <p className="mt-8 text-xs text-gray-400 italic">
              THE LUX FASHION is an independent reseller of authentic fashion items. We are not an official brand representative.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} THE LUX FASHION. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <span className="text-gray-400 text-xs">Instagram</span>
            <span className="text-gray-400 text-xs">Twitter</span>
            <span className="text-gray-400 text-xs">Facebook</span>
          </div>
        </div>
      </div>
    </footer>
  );
}