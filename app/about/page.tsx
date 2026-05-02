export default function About() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-12">Curating the World's Finest Fashion.</h1>
        
        <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-16">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop" 
            alt="About Aura" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="prose prose-lg text-gray-500 space-y-8 leading-relaxed">
          <p className="text-xl text-black font-medium leading-relaxed">
            THE LUX FASHION was founded on a simple premise: authentic, high-end fashion should be accessible to style enthusiasts worldwide, regardless of where the original items are sourced.
          </p>
          <p>
            We are a curated fashion marketplace. We don't manufacture clothing. Instead, our team of expert curators scours the globe—from luxury boutiques in Milan to streetwear hubs in Tokyo—to source authentic, high-quality fashion items.
          </p>
          <p>
            Every item listed on THE LUX FASHION is hand-selected for its quality, style, and authenticity. We act as an independent reseller, bridging the gap between global supply and discerning fashion lovers.
          </p>
          <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-gold my-12">
            <p className="text-black font-bold uppercase tracking-widest text-sm mb-4">Our Commitment</p>
            <p className="text-sm italic">
              "At The Lux Fashion, we are committed to providing a seamless and trustworthy personal shopping experience. We carefully source authentic fashion items from trusted retailers, ensuring quality and value in every order."
            </p>
          </div>
          <p>
            Our focus is on transparency, clear communication, and understanding your style and budget, so you get exactly what you need without the stress. With The Lux Fashion, you can expect reliability, simplicity, and a service that puts you first.
          </p>
        </div>
      </div>
    </div>
  );
}
