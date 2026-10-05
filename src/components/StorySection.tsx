import React, { useState } from 'react';
import { Flame, Clock, Award, ShieldCheck, Sparkles } from 'lucide-react';

export const StorySection: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="story" className="py-20 sm:py-28 bg-[#141210] border-b border-[#2c2825] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual: The Volcanic Stone Oven */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/11] border border-[#38332c] shadow-2xl bg-[#1b1916]">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-[#1b1916] flex items-center justify-center">
                  <Flame className="w-10 h-10 text-[#c94a29] animate-pulse" />
                </div>
              )}

              <img
                src="/src/assets/images/pizzeria_craft_oven_1791195457102.jpg"
                alt="Mosaic tiled Neapolitan wood-fired pizza oven glowing with oak firewood inside Fiamma pizzeria"
                referrerPolicy="no-referrer"
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" 
                aria-hidden="true" 
              />

              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-xs uppercase font-semibold text-[#d99a4e] tracking-wider block">
                  The Hearth of Napoli
                </span>
                <p className="font-serif text-lg font-bold text-white">
                  Hand-built by master fumisti using Mount Vesuvius Biscotto stone
                </p>
              </div>
            </div>

            {/* Adjacent qualitative proof badge */}
            <div className="mt-4 flex items-center justify-between text-xs text-[#8c8275]">
              <span>Heated exclusively with seasoned white oak and beechwood</span>
              <span className="font-mono text-[#d99a4e]">900°F / 480°C</span>
            </div>
          </div>

          {/* Editorial Story Prose */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#d99a4e] uppercase">
              <span>Authentic Disciplines</span>
              <span className="text-[#574e45]">·</span>
              <span>Generations of Tradition</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fbfaf8] leading-tight [text-wrap:balance]">
              We don't fast-track fermentation. We honor ninety seconds of heat.
            </h2>

            <p className="text-sm sm:text-base text-[#b8ada0] leading-relaxed font-light">
              Founded on the simple conviction that true pizza is a living organism, Fiamma 
              began with a forty-year sourdough starter brought over in a terracotta jar from Ischia. 
              Our dough ferments slowly at controlled cellar temperatures for three full days. 
              This converts heavy starches, yielding a cornicione (crust) that is shatteringly crisp, 
              cloud-light inside, and naturally gentle on digestion.
            </p>

            <p className="text-sm sm:text-base text-[#b8ada0] leading-relaxed font-light">
              Every afternoon, our pizzaioli ignite logs of split oak. When the dome turns pearl-white 
              at 900°F, our pies bake in just 90 seconds—locking in moisture, blistering the dough into 
              celebrated leopard spots, and caramelizing the fresh mozzarella sugars.
            </p>

            {/* Trust Markers */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#26221f]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#c94a29]/15 flex items-center justify-center text-[#c94a29] shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    D.O.P. Certified
                  </h4>
                  <p className="text-xs text-[#8c8275] mt-0.5">
                    Certified San Marzano tomatoes & Campania buffalo mozzarella.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#c94a29]/15 flex items-center justify-center text-[#c94a29] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    72-Hour Sourdough
                  </h4>
                  <p className="text-xs text-[#8c8275] mt-0.5">
                    Slow cold maturation for honeycomb alveoli and zero bloating.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* The 4 Pillars of Fiamma Grid */}
        <div className="mt-20 pt-16 border-t border-[#26221f]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#d99a4e] uppercase tracking-wider block mb-1">
              Zero Shortcuts
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              The Four Pillars of Fiamma
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: '01',
                title: 'Wild Mother Leaven',
                subtitle: 'Natural Fermentation',
                desc: 'No commercial baker’s yeast. We use living sourdough culture that infuses complex lactic acidity into every bite.',
              },
              {
                number: '02',
                title: 'Volcanic Soil Tomatoes',
                subtitle: 'San Marzano D.O.P.',
                desc: 'Hand-milled without metal pureeing blades. Low acidity, rich natural sweetness, seasoned simply with sea salt.',
              },
              {
                number: '03',
                title: 'Biscotto Sorrentino',
                subtitle: 'Mount Vesuvius Stone',
                desc: 'Porous clay hearth stones that radiate 900°F heat without scorching the bottom of delicate high-hydration dough.',
              },
              {
                number: '04',
                title: 'Touch & Slap Technique',
                subtitle: 'Art of the Pizzaiolo',
                desc: 'Shaped strictly by palm and forearm slaps (schiaffo), pushing air gently toward the cornicione rather than rolling it flat.',
              },
            ].map(pillar => (
              <div 
                key={pillar.number}
                className="bg-[#181614] border border-[#2b2723] rounded-xl p-6 hover:border-[#423a33] transition-colors"
              >
                <div className="font-mono text-xs font-bold text-[#d99a4e] mb-3">
                  {pillar.number}.
                </div>
                <h4 className="font-serif text-lg font-bold text-white mb-1">
                  {pillar.title}
                </h4>
                <div className="text-xs text-[#c94a29] font-medium mb-2">
                  {pillar.subtitle}
                </div>
                <p className="text-xs text-[#a89d90] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
