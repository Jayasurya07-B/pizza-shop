import React, { useState } from 'react';
import { Search, Sparkles, Plus, SlidersHorizontal, Flame, Leaf, Award } from 'lucide-react';
import { Category, DietaryFilter, MenuItem, CartItem } from '../types/pizza';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import { ItemCustomizeModal } from './ItemCustomizeModal';

interface MenuSectionProps {
  onAddToCart: (cartItem: CartItem) => void;
  onCraftCustom: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, onCraftCustom }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (name: string) => {
    setToastMessage(`Added ${name} to order bag`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleQuickAdd = (item: MenuItem) => {
    const cartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      subtitle: item.defaultSize ? `${item.defaultSize} · Classic Sourdough` : undefined,
      price: item.price,
      quantity: 1,
      image: item.image,
      selectedSize: item.defaultSize,
      selectedCrust: '72h Sourdough Neapolitan',
    };
    onAddToCart(cartItem);
    showNotification(item.name);
  };

  // Filter items
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDietary =
      dietaryFilter === 'all' ||
      (dietaryFilter === 'vegetarian' && item.dietary.includes('vegetarian')) ||
      (dietaryFilter === 'spicy' && item.dietary.includes('spicy')) ||
      (dietaryFilter === 'chef_pick' && item.dietary.includes('chef_pick'));

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.italianName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(query));

    return matchesCategory && matchesDietary && matchesSearch;
  });

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#141210] border-b border-[#2c2825]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1917] border border-[#d99a4e]/40 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 transition-all animate-in fade-in slide-in-from-bottom-2">
          <Flame className="w-4 h-4 text-[#c94a29]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#d99a4e] uppercase mb-2">
              <span>Artisanal Wood-Fired Menu</span>
              <span className="text-[#574e45]">·</span>
              <span>San Marzano D.O.P.</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fbfaf8]">
              The Daily Hearth Bake
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#a89d90] max-w-xl">
              Each pie is stretched by hand upon order, dressed with ingredients imported 
              straight from Campania, and fired on volcanic stone.
            </p>
          </div>

          <button
            onClick={onCraftCustom}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 bg-[#211e1b] hover:bg-[#2b2723] text-[#f5f2eb] border border-[#3e3831] rounded-md text-sm font-medium transition-colors cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-[#d99a4e] group-hover:rotate-12 transition-transform" />
            <span>Or Build Custom Pie</span>
          </button>
        </div>

        {/* Controls Bar: Category tabs, search & dietary toggles */}
        <div className="space-y-4 mb-10">
          
          {/* Category Tabs (Segmented Control conforming to constitution) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#26221f]">
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as Category)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#c94a29] text-white shadow-sm'
                      : 'text-[#a89d90] hover:text-[#fbfaf8] hover:bg-[#1f1c19]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sub-bar: Search Input and Dietary toggles */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#786e64]" />
              <input
                type="text"
                placeholder="Search pizzas, ingredients, toppings..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#1b1916] border border-[#332e29] rounded-md text-xs sm:text-sm text-[#f5f2eb] placeholder-[#786e64] focus:outline-none focus:border-[#c94a29] transition-colors"
              />
            </div>

            {/* Dietary Toggle Filters (Zero-pill, button state) */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs text-[#8c8275] hidden md:inline">Dietary:</span>
              
              <button
                type="button"
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 text-xs rounded border transition-colors cursor-pointer whitespace-nowrap ${
                  dietaryFilter === 'all'
                    ? 'border-[#c94a29] bg-[#c94a29]/15 text-white'
                    : 'border-[#2d2824] bg-[#1a1715] text-[#8c8275] hover:text-[#c4b5a5]'
                }`}
              >
                All
              </button>

              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'vegetarian' ? 'all' : 'vegetarian')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-colors cursor-pointer whitespace-nowrap ${
                  dietaryFilter === 'vegetarian'
                    ? 'border-[#22c55e]/50 bg-[#22c55e]/15 text-[#86efac]'
                    : 'border-[#2d2824] bg-[#1a1715] text-[#8c8275] hover:text-[#c4b5a5]'
                }`}
              >
                <Leaf className="w-3 h-3 text-[#22c55e]" />
                <span>Vegetarian</span>
              </button>

              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'spicy' ? 'all' : 'spicy')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-colors cursor-pointer whitespace-nowrap ${
                  dietaryFilter === 'spicy'
                    ? 'border-[#ef4444]/50 bg-[#ef4444]/15 text-[#fca5a5]'
                    : 'border-[#2d2824] bg-[#1a1715] text-[#8c8275] hover:text-[#c4b5a5]'
                }`}
              >
                <Flame className="w-3 h-3 text-[#ef4444]" />
                <span>Spicy Piccante</span>
              </button>

              <button
                type="button"
                onClick={() => setDietaryFilter(dietaryFilter === 'chef_pick' ? 'all' : 'chef_pick')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-colors cursor-pointer whitespace-nowrap ${
                  dietaryFilter === 'chef_pick'
                    ? 'border-[#d99a4e]/50 bg-[#d99a4e]/15 text-[#fde047]'
                    : 'border-[#2d2824] bg-[#1a1715] text-[#8c8275] hover:text-[#c4b5a5]'
                }`}
              >
                <Award className="w-3 h-3 text-[#d99a4e]" />
                <span>Chef's Choice</span>
              </button>
            </div>

          </div>
        </div>

        {/* Empty Search State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 px-4 border border-dashed border-[#332e29] rounded-xl bg-[#191715]">
            <Flame className="w-10 h-10 text-[#574e45] mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#f5f2eb]">No matching pizzas found</h3>
            <p className="text-xs text-[#8c8275] mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or dietary filters, or craft your very own creation in our Pizza Studio.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#26221f] text-xs text-[#f5f2eb] rounded hover:bg-[#332e29] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Product Cards Grid: 3-column desktop layout with generous whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map(item => {
            return (
              <article
                key={item.id}
                className="group flex flex-col bg-[#1a1816] rounded-xl border border-[#2d2824] overflow-hidden hover:border-[#4a423a] transition-all duration-200 shadow-sm hover:shadow-lg"
              >
                {/* Product Imagery Slot (65-75% visual dominance with Fallback) */}
                <div className="relative aspect-[4/3] bg-[#211e1b] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" 
                    aria-hidden="true" 
                  />

                  {/* Clean unboxed editorial tags */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] text-[#f7f5f2] font-medium bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
                    {item.dietary.includes('chef_pick') && (
                      <span className="text-[#f59e0b] flex items-center gap-1">
                        <Award className="w-3 h-3" /> Chef's Cut
                      </span>
                    )}
                    {item.dietary.includes('vegetarian') && (
                      <span className="text-[#86efac] flex items-center gap-1">
                        <Leaf className="w-3 h-3" /> Veg
                      </span>
                    )}
                    {item.dietary.includes('spicy') && (
                      <span className="text-[#fca5a5] flex items-center gap-1">
                        <Flame className="w-3 h-3" /> Spicy
                      </span>
                    )}
                    {!item.dietary.length && <span>Wood-Fired</span>}
                  </div>

                  {/* Price Tag in Tabular Numeral */}
                  <div className="absolute bottom-3 right-3 bg-[#121110]/90 backdrop-blur-sm border border-[#3e3831] px-3 py-1 rounded">
                    <span className="font-mono text-base font-bold text-white tabular-nums">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    {/* Italian Name Subtitle */}
                    <p className="text-xs font-serif italic text-[#d99a4e] tracking-wide">
                      {item.italianName}
                    </p>

                    {/* Primary Title */}
                    <h3 className="font-serif text-lg font-bold text-[#fbfaf8] group-hover:text-[#d99a4e] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    {/* Ingredients Prose */}
                    <p className="text-xs text-[#a89d90] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Ingredients Clean Separators */}
                  <div className="text-[11px] text-[#786e64] pt-2 border-t border-[#26221f]">
                    <span className="font-medium text-[#8c8275]">Featured: </span>
                    {item.ingredients.slice(0, 3).join(' · ')}
                    {item.ingredients.length > 3 && ` · +${item.ingredients.length - 3} more`}
                  </div>

                  {/* Action Controls: Customize & Quick Add */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomizingItem(item)}
                      className="flex-1 py-2.5 px-3 bg-[#23201d] hover:bg-[#2e2a26] text-[#e6ded3] hover:text-white border border-[#38332c] text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#d99a4e]" />
                      <span>Customize</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickAdd(item)}
                      className="py-2.5 px-4 bg-[#c94a29] hover:bg-[#b23d1e] text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      title="Add directly with standard recipe"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Item Customization Modal */}
      {customizingItem && (
        <ItemCustomizeModal
          item={customizingItem}
          isOpen={!!customizingItem}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={item => {
            onAddToCart(item);
            showNotification(item.name);
          }}
        />
      )}
    </section>
  );
};
