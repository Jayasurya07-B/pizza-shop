import React, { useState } from 'react';
import { Flame, ArrowRight, Sparkles, MapPin, Bike, ShoppingBag } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onCraftCustom: () => void;
  fulfillmentType: 'delivery' | 'pickup';
  onToggleFulfillment: (type: 'delivery' | 'pickup') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onCraftCustom,
  fulfillmentType,
  onToggleFulfillment,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#2c2825]">
      {/* Subtle background ambient warm glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#c94a29]/10 blur-[140px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Unboxed natural editorial subtitle (Zero-Pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#d99a4e] uppercase">
              <span>Napoli Tradition</span>
              <span className="text-[#574e45]">·</span>
              <span>72h Slow Ferment</span>
              <span className="text-[#574e45]">·</span>
              <span>Wood-Fired at 900°F</span>
            </div>

            {/* Headline with text-wrap balance to avoid single trailing words */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fbfaf8] leading-[1.08] [text-wrap:balance]">
              The Sacred Art of Neapolitan Sourdough.
            </h1>

            {/* Prose description */}
            <p className="text-base sm:text-lg text-[#b8ada0] leading-relaxed max-w-xl font-light">
              Milled Italian Caputo wheat leavened for three days, layered with hand-crushed 
              San Marzano D.O.P. tomatoes and fresh Campania Fior di Latte, then blistered to 
              charred leopard perfection in ninety seconds flat.
            </p>

            {/* Fulfillment Segmented Control */}
            <div className="pt-2">
              <div className="inline-flex p-1 bg-[#1e1b18] border border-[#332e29] rounded-lg">
                <button
                  type="button"
                  onClick={() => onToggleFulfillment('delivery')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    fulfillmentType === 'delivery'
                      ? 'bg-[#c94a29] text-white shadow-sm'
                      : 'text-[#a89d90] hover:text-[#fbfaf8]'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Delivery (35–45 min)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleFulfillment('pickup')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    fulfillmentType === 'pickup'
                      ? 'bg-[#c94a29] text-white shadow-sm'
                      : 'text-[#a89d90] hover:text-[#fbfaf8]'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Pickup (15–20 min)</span>
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onExploreMenu}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#c94a29] hover:bg-[#b23d1e] text-white text-sm font-semibold rounded-md transition-all shadow-md hover:shadow-[#c94a29]/20 cursor-pointer"
              >
                <span>View Artisanal Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                type="button"
                onClick={onCraftCustom}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#201d1a] hover:bg-[#2b2723] text-[#e6ded3] hover:text-white border border-[#38332c] text-sm font-medium rounded-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#d99a4e]" />
                <span>Craft Custom Pie</span>
              </button>
            </div>

            {/* Quick Proof Metrics adjacent to claim */}
            <div className="pt-6 border-t border-[#26221e] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="font-serif text-2xl font-bold text-[#fbfaf8] tabular-nums">72h</div>
                <div className="text-xs text-[#8c8275] mt-0.5">Cold Sourdough Ferment</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-[#fbfaf8] tabular-nums">900°F</div>
                <div className="text-xs text-[#8c8275] mt-0.5">Volcanic Stone Peel</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-[#fbfaf8] tabular-nums">100%</div>
                <div className="text-xs text-[#8c8275] mt-0.5">Campania D.O.P. Ingredients</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-xl overflow-hidden aspect-[16/10] sm:aspect-[16/10] border border-[#38322c] shadow-2xl bg-[#1a1715]">
              
              {/* Fallback container until image loads */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-[#1c1917] flex items-center justify-center">
                  <Flame className="w-10 h-10 text-[#c94a29] animate-pulse" />
                </div>
              )}

              <img
                src="/src/assets/images/hero_woodfired_pizza_1791195394162.jpg"
                alt="Neapolitan sourdough pizza with bubbling mozzarella and charred crust coming out of a blazing wood-fired oven"
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              />

              {/* Measured contrast scrim */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" 
                aria-hidden="true" 
              />

              {/* Hero overlay details */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="text-xs font-medium tracking-wide text-[#d99a4e] uppercase">
                    Oven Masterpiece
                  </p>
                  <p className="text-base sm:text-lg font-serif font-bold text-white">
                    Fiamma Speciale del Forno
                  </p>
                  <p className="text-xs text-[#d1c7bc] hidden sm:block">
                    Fennel pork sausage, charred sweet peppers, smoked provola
                  </p>
                </div>
                <div className="bg-[#121110]/80 backdrop-blur-md border border-[#3e3730] px-3 py-1.5 rounded text-right">
                  <span className="text-xs text-[#a89d90] block">Baked in</span>
                  <span className="font-mono text-sm font-bold text-[#fbfaf8] tabular-nums">90s @ 900°F</span>
                </div>
              </div>
            </div>

            {/* Location floating trust tag */}
            <div className="mt-3 flex items-center justify-between text-xs text-[#8c8275] px-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c94a29]" />
                428 Artisan Way, Little Italy
              </span>
              <span>Dine-In, Takeout & Delivery</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
