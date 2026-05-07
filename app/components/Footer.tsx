import Link from "next/link";
import Image from "next/image";


export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group mb-3">
              <div className="p-1.5 rounded-lg transition-transform group-hover:scale-110">
                <Image src="/lux-resized.jpg" alt="The Lux Fashion" width={60} height={50} className="text-gold rounded-full font-bold h-auto" priority />
              </div>
              <span className="font-bold tracking-[0.1em] text-black">THE LUX FASHION</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The Lux Fashion 🛍️. Your Global Personal Shopper. Trendy fits, shoes & must-haves. We find it. You wear it. Contact for Prices.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-4">
              <li><Link href="/shop?category=Clothing" className="text-gray-500 hover:text-gold text-sm transition-colors">Clothing</Link></li>
              <li><Link href="/shop?category=Bags" className="text-gray-500 hover:text-gold text-sm transition-colors">Bags</Link></li>
              <li><Link href="/shop?category=Watches" className="text-gray-500 hover:text-gold text-sm transition-colors">Watches</Link></li>
              <li><Link href="/shop?category=Jewelry" className="text-gray-500 hover:text-gold text-sm transition-colors">Jewelry</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-500 hover:text-gold text-sm transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-500 hover:text-gold text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4">Socials</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://www.instagram.com/theluxfashion/"
                  className="text-gray-500 hover:text-gold text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4">Legal</h3>
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
        </div>
      </div>
    </footer>
  );
}