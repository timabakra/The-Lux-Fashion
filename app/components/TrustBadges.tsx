import { ShieldCheck, Truck, RotateCcw, Globe } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Authenticity Guaranteed",
      description: "Every item is verified by our experts."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Sourcing",
      description: "Curated from premium boutiques worldwide."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-2xl mx-auto">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 text-gold">{badge.icon}</div>
              <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-2">{badge.title}</h3>
              <p className="text-gray-500 text-sm">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
