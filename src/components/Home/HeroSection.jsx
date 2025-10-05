export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white py-20">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-semibold">Perfect Gift Ideas</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Illuminate Your Special Moments
            </h1>
            <p className="text-xl mb-8 text-amber-50">
              Beautiful LED photo frames and decorative lights that bring warmth to every room
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transform hover:scale-105 transition-all shadow-2xl">
                Shop Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                View Gifts
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
              <div className="text-6xl mb-4">🦢</div>
              <h3 className="text-2xl font-bold mb-2">Swan LED Photo Frame</h3>
              <p className="text-amber-50">Wedding Gift Special</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
