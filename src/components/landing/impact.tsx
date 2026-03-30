import { Clock, FileText, Quote } from "lucide-react";

export default function Impact() {
  return (
    <section id="impact" className="py-20 bg-lime-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-125 object-cover"
                alt="senyum penerima manfaat"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 md:-bottom-7 md:-right-5 bg-white rounded-2xl shadow-2xl p-5 max-w-55 border border-white/40">
              <div className="flex items-center gap-3">
                <Quote className="text-lime-600" />
                <div>
                  <span className="block font-bold text-gray-800 text-lg">+230%</span>
                  <span className="text-sm text-gray-500">increase in regular donations</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <span className="text-lime-500 font-semibold text-sm uppercase tracking-wider">
              Real impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 leading-tight">
              Every contribution <br />
              is the <span className="text-lime-500">future</span>
            </h2>
            <p className="text-foreground/80 text-lg mt-4">
              We believe transparency builds trust. Every donation is reported in detail and
              its progress can be tracked through your personal dashboard.
            </p>
            <div className="grid grid-cols-2 gap-5 mt-8">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-lime-100">
                <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center text-lime-600 mb-2">
                  <FileText />
                </div>
                <span className="block font-bold text-2xl">100%</span>
                <span className="text-sm text-gray-500">routine program report</span>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-lime-100">
                <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center text-lime-600 mb-2">
                  <Clock />
                </div>
                <span className="block font-bold text-2xl">14 days</span>
                <span className="text-sm text-gray-500">average distribution update</span>
              </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-amber-400 mb-3">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="text-gray-700 text-lg italic">
                "I can see photos of the scholarship recipients directly, and I can even send
                messages. It's incredibly transparent."
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/placeholder-avatars/extra-large.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64"
                    className="object-cover"
                    alt=""
                  />
                </div>
                <div>
                  <span className="font-bold block">Jane Maharani</span>
                  <span className="text-sm text-gray-400">Regular donors, Jakarta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
