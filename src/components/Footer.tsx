import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white pt-24 pb-12 border-t border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">

            <p className="text-neutral-400 text-sm pe-4">
              The future of freshness. We believe in uncompromised quality,
              transparent nutrition, and incredible taste.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-6">Shop</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li><button className="hover:text-white transition-colors">All Flavors</button></li>
              <li><button className="hover:text-white transition-colors">Subscriptions</button></li>
              <li><button className="hover:text-white transition-colors">Merch</button></li>
              <li><button className="hover:text-white transition-colors">Gift Cards</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li><button className="hover:text-white transition-colors">FAQ</button></li>
              <li><button className="hover:text-white transition-colors">Shipping</button></li>
              <li><button className="hover:text-white transition-colors">Returns</button></li>
              <li><button className="hover:text-white transition-colors">Contact Us</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-6">Stay Fresh</h4>
            <p className="text-neutral-400 text-sm mb-4">
              Subscribe to our newsletter for early access to new flavors and exclusive perks.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-white/30 text-sm"
              />
              <button className="bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors text-sm">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
