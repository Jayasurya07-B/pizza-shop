import React from 'react';
import { Star, Award } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      author: 'Matteo Bellini',
      role: 'Culinary Editor, Epicurean Metro',
      quote:
        'The cornicione alveoli structure here is nothing short of miraculous. You can eat an entire 12-inch Diavola without that heavy stone feeling in your stomach—a testament to their uncompromised 72-hour cold leavening.',
      favorite: 'Diavola Hot Honey & Nduja',
      rating: 5,
    },
    {
      author: 'Elena Vance-Moretti',
      role: 'Naples Certified Sommelier & Critic',
      quote:
        'San Marzano tomatoes can be faked in ninety percent of pizzerias outside Italy. Fiamma gets the real D.O.P. harvest from the Agro Sarnese-Nocerino volcanic plain. The sauce has that pure, sun-drenched minerality you only taste in Campania.',
      favorite: 'Margherita Verace D.O.P.',
      rating: 5,
    },
    {
      author: 'David Zhang',
      role: 'Verified Local Diner',
      quote:
        'The Custom Crafter builder let me create a white pie with smoked provola, roasted chanterelles, and hot honey drizzle. Arrived in 35 minutes piping hot, with the crust still crisp and blistered. Best pizza delivery in the city.',
      favorite: 'Tartufo Nero & Wild Forest Funghi',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-[#141210] border-b border-[#2c2825]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#d99a4e] uppercase mb-2">
            <span>Diner Accolades</span>
            <span className="text-[#574e45]">·</span>
            <span>Unbiased Reviews</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#fbfaf8]">
            Celebrated by Pizzaioli & Neighbors Alike
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#181614] border border-[#2b2723] rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#3e3831] transition-colors"
            >
              <div>
                {/* 5-Star Row */}
                <div className="flex items-center gap-1 mb-4 text-[#d99a4e]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d99a4e]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-[#c4b5a5] leading-relaxed italic font-light">
                  "{rev.quote}"
                </blockquote>
              </div>

              {/* Attribution */}
              <div className="pt-6 mt-6 border-t border-[#26221f]">
                <div className="font-semibold text-sm text-white">{rev.author}</div>
                <div className="text-xs text-[#8c8275] mt-0.5">{rev.role}</div>
                <div className="text-xs text-[#d99a4e] mt-2 flex items-center gap-1">
                  <span>Favorite:</span>
                  <span className="font-medium text-[#e6ded3]">{rev.favorite}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
