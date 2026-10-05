import React, { useState } from 'react';
import { Flame, MapPin, Phone, Mail, Clock, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#0e0d0c] border-t border-[#26221f] text-[#a89d90] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#211e1b]">
          
          {/* Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#c94a29] fill-[#c94a29]" />
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Fiamma
              </span>
            </div>
            <p className="text-xs text-[#8c8275] leading-relaxed max-w-sm">
              Artisanal Neapolitan wood-fired pizzeria. 72-hour slow-fermented sourdough, 
              San Marzano D.O.P. tomatoes, fresh Campania mozzarella, baked at 900°F on volcanic stone.
            </p>
            <div className="text-[11px] text-[#786e64]">
              Est. Napoli 1984 · Preserving AVPN Traditional Standards
            </div>
          </div>

          {/* Opening Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#d99a4e]" />
              <span>Oven Hearth Hours</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-[#a89d90]">
              <li className="flex justify-between">
                <span>Mon – Thu</span>
                <span className="font-mono text-white tabular-nums">12:00 PM – 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Fri – Sat</span>
                <span className="font-mono text-white tabular-nums">12:00 PM – 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="font-mono text-white tabular-nums">1:00 PM – 9:30 PM</span>
              </li>
            </ul>
            <div className="pt-2 text-[11px] text-[#22c55e]">
              ● Wood-fire oven blazing now
            </div>
          </div>

          {/* Location & Contact */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              Find Us
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c94a29] shrink-0 mt-0.5" />
                <span>428 Artisan Way, Little Italy District</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#d99a4e] shrink-0" />
                <span>(555) 749-9231</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#d99a4e] shrink-0" />
                <span>ciao@fiammaoven.com</span>
              </p>
            </div>
          </div>

          {/* Secret Hearth Menu Club */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              The Pizzaiolo Secret Club
            </h4>
            <p className="text-xs text-[#8c8275]">
              Receive announcements of rare seasonal flour batches, white truffle deliveries, 
              and VIP weekend booking releases.
            </p>

            {subscribed ? (
              <div className="p-2.5 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded text-xs text-[#86efac] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Benvenuto! Check your inbox for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 bg-[#181614] border border-[#2e2924] rounded px-3 py-2 text-xs text-white placeholder-[#685e54] focus:outline-none focus:border-[#c94a29]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#c94a29] hover:bg-[#b23d1e] text-white text-xs font-medium rounded transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Allergen Statement & Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6b6257]">
          <p>
            Allergen Notice: Our kitchen handles wheat flour, tree nuts, and dairy products. 
            Gluten-friendly dough is baked in a shared wood-fired oven.
          </p>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Fiamma Wood-Fired Pizzeria</span>
            <span>·</span>
            <span>All Rights Reserved</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
