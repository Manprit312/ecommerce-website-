import { Package, Gift, Zap } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    { icon: <Package className="w-8 h-8" />, title: "Free Shipping", desc: "On orders over $50" },
    { icon: <Gift className="w-8 h-8" />, title: "Perfect Gifts", desc: "Ideal for weddings & anniversaries" },
    { icon: <Zap className="w-8 h-8" />, title: "Energy Efficient", desc: "LED technology saves power" },
  ];

  return (
    <section className="bg-gradient-to-r from-amber-500 to-orange-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        {features.map((f, i) => (
          <div key={i} className="text-center">
            <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-amber-50">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
