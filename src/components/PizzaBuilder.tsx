import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Plus, 
  Check, 
  Flame, 
  Info,
  ChevronRight,
  Pizza
} from 'lucide-react';
import { CartItem, CustomPizzaState } from '../types/pizza';
import { 
  DOUGH_OPTIONS, 
  SAUCE_OPTIONS, 
  CHEESE_OPTIONS, 
  MEAT_OPTIONS, 
  VEGGIE_OPTIONS, 
  FINISHER_OPTIONS 
} from '../data/customizerData';

interface PizzaBuilderProps {
  onAddToCart: (cartItem: CartItem) => void;
}

type BuilderTab = 'crust' | 'sauce' | 'cheese' | 'meat' | 'veggie' | 'finisher';

export const PizzaBuilder: React.FC<PizzaBuilderProps> = ({ onAddToCart }) => {
  const [activeTab, setActiveTab] = useState<BuilderTab>('crust');
  
  const [pizzaState, setPizzaState] = useState<CustomPizzaState>({
    size: '12"',
    dough: 'dough-sourdough',
    sauce: 'sauce-marzano',
    cheese: ['cheese-mozzarella'],
    toppings: ['meat-pepperoni', 'veg-basil'],
    finishers: ['fin-evoo'],
    notes: '',
    customName: "Chef's Artisanal Creation",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Price calculations
  const basePrice = pizzaState.size === '12"' ? 15.0 : 21.5;
  const doughExtra = DOUGH_OPTIONS.find(d => d.id === pizzaState.dough)?.price || 0;
  const sauceExtra = SAUCE_OPTIONS.find(s => s.id === pizzaState.sauce)?.price || 0;
  
  const cheeseExtra = pizzaState.cheese.reduce((sum, id) => {
    const item = CHEESE_OPTIONS.find(c => c.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const meatExtra = pizzaState.toppings.reduce((sum, id) => {
    const meat = MEAT_OPTIONS.find(m => m.id === id);
    const veg = VEGGIE_OPTIONS.find(v => v.id === id);
    return sum + (meat ? meat.price : 0) + (veg ? veg.price : 0);
  }, 0);

  const finisherExtra = pizzaState.finishers.reduce((sum, id) => {
    const item = FINISHER_OPTIONS.find(f => f.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const totalPrice = basePrice + doughExtra + sauceExtra + cheeseExtra + meatExtra + finisherExtra;

  // Selected object lookups
  const selectedDough = DOUGH_OPTIONS.find(d => d.id === pizzaState.dough);
  const selectedSauce = SAUCE_OPTIONS.find(s => s.id === pizzaState.sauce);

  const toggleCheese = (id: string) => {
    setPizzaState(prev => {
      const exists = prev.cheese.includes(id);
      if (exists) {
        // keep at least one cheese or allow none
        return { ...prev, cheese: prev.cheese.filter(c => c !== id) };
      } else {
        return { ...prev, cheese: [...prev.cheese, id] };
      }
    });
  };

  const toggleTopping = (id: string) => {
    setPizzaState(prev => {
      const exists = prev.toppings.includes(id);
      if (exists) {
        return { ...prev, toppings: prev.toppings.filter(t => t !== id) };
      } else {
        return { ...prev, toppings: [...prev.toppings, id] };
      }
    });
  };

  const toggleFinisher = (id: string) => {
    setPizzaState(prev => {
      const exists = prev.finishers.includes(id);
      if (exists) {
        return { ...prev, finishers: prev.finishers.filter(f => f !== id) };
      } else {
        return { ...prev, finishers: [...prev.finishers, id] };
      }
    });
  };

  const handleReset = () => {
    setPizzaState({
      size: '12"',
      dough: 'dough-sourdough',
      sauce: 'sauce-marzano',
      cheese: ['cheese-mozzarella'],
      toppings: [],
      finishers: ['fin-evoo'],
      notes: '',
      customName: "Chef's Artisanal Creation",
    });
  };

  const handleAddCustomToBag = () => {
    const doughName = selectedDough?.name || '72h Sourdough';
    const cheeseNames = pizzaState.cheese
      .map(id => CHEESE_OPTIONS.find(c => c.id === id)?.name)
      .filter(Boolean) as string[];
    const meatNames = pizzaState.toppings
      .map(id => MEAT_OPTIONS.find(m => m.id === id)?.name || VEGGIE_OPTIONS.find(v => v.id === id)?.name)
      .filter(Boolean) as string[];
    const finisherNames = pizzaState.finishers
      .map(id => FINISHER_OPTIONS.find(f => f.id === id)?.name)
      .filter(Boolean) as string[];

    const cartItem: CartItem = {
      cartId: `custom-${Date.now()}`,
      name: pizzaState.customName || 'Custom Wood-Fired Pie',
      subtitle: `${pizzaState.size} · ${doughName}`,
      price: totalPrice,
      quantity: 1,
      image: '/src/assets/images/hero_woodfired_pizza_1791195394162.jpg',
      selectedSize: pizzaState.size,
      selectedCrust: doughName,
      customDetails: pizzaState,
      addedToppings: [
        `Sauce: ${selectedSauce?.name || 'San Marzano'}`,
        ...cheeseNames.map(c => `Cheese: ${c}`),
        ...meatNames,
        ...finisherNames.map(f => `Finisher: ${f}`)
      ],
      specialInstructions: pizzaState.notes || undefined,
    };

    onAddToCart(cartItem);
    setToastMessage(`Custom Pie "${pizzaState.customName}" added to order!`);
    setTimeout(() => setToastMessage(null), 3200);
  };

  return (
    <section id="builder" className="py-16 sm:py-24 bg-[#11100f] border-b border-[#2c2825] relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1917] border border-[#d99a4e]/40 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 transition-all">
          <Flame className="w-4 h-4 text-[#c94a29]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#d99a4e] uppercase mb-2">
            <span>Pizzaiolo Craft Studio</span>
            <span className="text-[#574e45]">·</span>
            <span>Interactive Builder</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fbfaf8]">
            Craft Your Custom Wood-Fired Pie
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#a89d90]">
            Choose your slow-fermented dough, simmered sauce, melted cheeses, and farm-sourced toppings. 
            We bake your personalized creation on 900°F volcanic stone.
          </p>
        </div>

        {/* Builder Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Pizza Visualizer */}
          <div className="lg:col-span-5 bg-[#181614] border border-[#2d2824] rounded-2xl p-6 sm:p-8 flex flex-col items-center sticky top-24">
            
            {/* Visual Header */}
            <div className="w-full flex items-center justify-between pb-4 border-b border-[#26221f]">
              <div className="flex items-center gap-2">
                <Pizza className="w-5 h-5 text-[#d99a4e]" />
                <span className="text-xs uppercase tracking-wider font-semibold text-[#a89d90]">Live Oven Mockup</span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-[#8c8275] hover:text-[#d99a4e] flex items-center gap-1 transition-colors cursor-pointer"
                title="Reset to default Margherita"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Interactive Visual Canvas Container */}
            <div className="relative my-8 w-64 h-64 sm:w-80 sm:h-80 rounded-full flex items-center justify-center shadow-2xl p-3 bg-[#241f1c] border-4 border-[#332b25]">
              
              {/* Outer Charred Cornicione Crust */}
              <div 
                className={`w-full h-full rounded-full transition-all duration-300 relative flex items-center justify-center overflow-hidden ${
                  pizzaState.dough === 'dough-wholegrain'
                    ? 'bg-[#8a572a] shadow-inner'
                    : pizzaState.dough === 'dough-gf'
                    ? 'bg-[#b88c54] shadow-inner'
                    : 'bg-[#c5823e] shadow-inner'
                }`}
                style={{
                  boxShadow: 'inset 0 0 25px rgba(0,0,0,0.6), 0 10px 25px rgba(0,0,0,0.5)',
                }}
              >
                {/* Charred blister spots (leopard spots on crust) */}
                <div className="absolute top-2 left-12 w-3 h-2 rounded-full bg-[#291708] opacity-80" />
                <div className="absolute bottom-3 right-14 w-4 h-2.5 rounded-full bg-[#1e1005] opacity-85" />
                <div className="absolute top-10 right-4 w-3.5 h-2 rounded-full bg-[#241206] opacity-75" />
                <div className="absolute bottom-8 left-6 w-4 h-2 rounded-full bg-[#2b1607] opacity-85" />
                <div className="absolute top-1/2 left-2 w-3 h-2 rounded-full bg-[#2b1607] opacity-80" />
                <div className="absolute top-1/2 right-2 w-3.5 h-2 rounded-full bg-[#201006] opacity-85" />

                {/* Inner Sauce Reservoir */}
                <div 
                  className="w-[82%] h-[82%] rounded-full relative transition-colors duration-500 overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundColor: selectedSauce?.color || '#b91c1c',
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Sauce texture flecks */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-black" />

                  {/* Cheese Melt Layer */}
                  {pizzaState.cheese.length > 0 && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Random organic melted cheese islands */}
                      <div className="absolute top-4 left-6 w-12 h-10 rounded-full bg-[#fef08a]/90 blur-[1px] opacity-90" />
                      <div className="absolute top-8 right-8 w-14 h-12 rounded-full bg-[#fef08a]/85 blur-[1px] opacity-90" />
                      <div className="absolute bottom-6 left-10 w-16 h-12 rounded-full bg-[#fef08a]/90 blur-[1px] opacity-90" />
                      <div className="absolute bottom-8 right-6 w-12 h-10 rounded-full bg-[#fef08a]/85 blur-[1px] opacity-90" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-14 rounded-full bg-[#fef08a]/90 blur-[1px] opacity-90" />
                      
                      {/* Secondary cheeses */}
                      {pizzaState.cheese.includes('cheese-provola') && (
                        <div className="absolute inset-2 rounded-full bg-[#fef9c3]/30 blur-[2px]" />
                      )}
                      {pizzaState.cheese.includes('cheese-burrata') && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-md border-2 border-white/80" />
                      )}
                      {pizzaState.cheese.includes('cheese-gorgonzola') && (
                        <>
                          <div className="absolute top-6 left-12 w-4 h-4 rounded-full bg-[#94a3b8] opacity-75 blur-[0.5px]" />
                          <div className="absolute bottom-10 right-14 w-4 h-4 rounded-full bg-[#94a3b8] opacity-75 blur-[0.5px]" />
                        </>
                      )}
                    </div>
                  )}

                  {/* Render Toppings Visually */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    
                    {/* Pepperoni cups */}
                    {pizzaState.toppings.includes('meat-pepperoni') && (
                      <>
                        <div className="absolute top-6 left-12 w-7 h-7 rounded-full bg-[#991b1b] border-2 border-[#7f1d1d] shadow-sm transform -rotate-12" />
                        <div className="absolute top-12 right-10 w-7 h-7 rounded-full bg-[#991b1b] border-2 border-[#7f1d1d] shadow-sm transform rotate-45" />
                        <div className="absolute bottom-8 left-14 w-7 h-7 rounded-full bg-[#991b1b] border-2 border-[#7f1d1d] shadow-sm transform rotate-12" />
                        <div className="absolute bottom-12 right-12 w-7 h-7 rounded-full bg-[#991b1b] border-2 border-[#7f1d1d] shadow-sm transform -rotate-45" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#991b1b] border-2 border-[#7f1d1d] shadow-sm" />
                      </>
                    )}

                    {/* Spicy Nduja spots */}
                    {pizzaState.toppings.includes('meat-nduja') && (
                      <>
                        <div className="absolute top-10 left-16 w-5 h-4 rounded-full bg-[#b91c1c] shadow" />
                        <div className="absolute bottom-14 left-8 w-6 h-5 rounded-full bg-[#b91c1c] shadow" />
                        <div className="absolute top-14 right-16 w-5 h-5 rounded-full bg-[#b91c1c] shadow" />
                        <div className="absolute bottom-8 right-16 w-6 h-4 rounded-full bg-[#b91c1c] shadow" />
                      </>
                    )}

                    {/* Fennel Sausage chunks */}
                    {pizzaState.toppings.includes('meat-sausage') && (
                      <>
                        <div className="absolute top-8 left-8 w-5 h-5 rounded-md bg-[#78350f] shadow transform rotate-45" />
                        <div className="absolute top-16 right-8 w-6 h-4 rounded-md bg-[#78350f] shadow transform -rotate-12" />
                        <div className="absolute bottom-10 left-18 w-5 h-5 rounded-md bg-[#78350f] shadow transform rotate-12" />
                        <div className="absolute bottom-16 right-10 w-5 h-4 rounded-md bg-[#78350f] shadow transform -rotate-45" />
                      </>
                    )}

                    {/* Prosciutto ribbons */}
                    {pizzaState.toppings.includes('meat-prosciutto') && (
                      <>
                        <div className="absolute top-10 left-10 w-12 h-4 rounded-full bg-[#f43f5e]/80 transform rotate-25 shadow-sm" />
                        <div className="absolute bottom-10 right-10 w-14 h-4 rounded-full bg-[#f43f5e]/80 transform -rotate-30 shadow-sm" />
                        <div className="absolute top-1/2 right-6 w-10 h-4 rounded-full bg-[#f43f5e]/80 transform rotate-75 shadow-sm" />
                      </>
                    )}

                    {/* Roasted Mushrooms */}
                    {pizzaState.toppings.includes('veg-mushrooms') && (
                      <>
                        <div className="absolute top-14 left-10 w-6 h-4 rounded-t-full bg-[#523315] shadow-sm transform -rotate-15" />
                        <div className="absolute top-8 right-14 w-6 h-4 rounded-t-full bg-[#523315] shadow-sm transform rotate-45" />
                        <div className="absolute bottom-14 right-12 w-6 h-4 rounded-t-full bg-[#523315] shadow-sm transform -rotate-45" />
                        <div className="absolute bottom-8 left-12 w-6 h-4 rounded-t-full bg-[#523315] shadow-sm transform rotate-15" />
                      </>
                    )}

                    {/* Sweet Peppers */}
                    {pizzaState.toppings.includes('veg-peppers') && (
                      <>
                        <div className="absolute top-12 left-14 w-8 h-2 rounded-full bg-[#ea580c] transform -rotate-45" />
                        <div className="absolute bottom-12 left-10 w-8 h-2 rounded-full bg-[#eab308] transform rotate-30" />
                        <div className="absolute top-14 right-10 w-7 h-2 rounded-full bg-[#ea580c] transform rotate-60" />
                      </>
                    )}

                    {/* Black Olives */}
                    {pizzaState.toppings.includes('veg-olives') && (
                      <>
                        <div className="absolute top-7 left-14 w-3.5 h-3.5 rounded-full border-2 border-[#0f172a] bg-black/60" />
                        <div className="absolute bottom-9 right-14 w-3.5 h-3.5 rounded-full border-2 border-[#0f172a] bg-black/60" />
                        <div className="absolute top-16 right-9 w-3.5 h-3.5 rounded-full border-2 border-[#0f172a] bg-black/60" />
                        <div className="absolute bottom-14 left-16 w-3.5 h-3.5 rounded-full border-2 border-[#0f172a] bg-black/60" />
                      </>
                    )}

                    {/* Fresh Basil Leaves */}
                    {pizzaState.toppings.includes('veg-basil') && (
                      <>
                        <div className="absolute top-10 left-12 w-6 h-4 rounded-full bg-[#16a34a] transform -rotate-30 shadow" />
                        <div className="absolute top-12 right-12 w-6 h-4 rounded-full bg-[#16a34a] transform rotate-45 shadow" />
                        <div className="absolute bottom-10 left-12 w-6 h-4 rounded-full bg-[#16a34a] transform rotate-15 shadow" />
                        <div className="absolute bottom-10 right-10 w-6 h-4 rounded-full bg-[#16a34a] transform -rotate-60 shadow" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-4 rounded-full bg-[#16a34a] transform rotate-10 shadow" />
                      </>
                    )}

                    {/* Hot Honey Drizzle / EVOO */}
                    {pizzaState.finishers.includes('fin-honey') && (
                      <div className="absolute inset-4 rounded-full border border-[#f59e0b]/40 pointer-events-none" />
                    )}

                    {/* Shaved Truffles */}
                    {pizzaState.finishers.includes('fin-truffle') && (
                      <>
                        <div className="absolute top-12 left-1/2 w-3 h-2 rounded bg-black/90 transform rotate-12" />
                        <div className="absolute bottom-12 left-1/2 w-3 h-2 rounded bg-black/90 transform -rotate-12" />
                      </>
                    )}

                  </div>

                </div>

              </div>

            </div>

            {/* Custom Pie Title & Specifications */}
            <div className="w-full text-center space-y-2">
              <input
                type="text"
                value={pizzaState.customName}
                onChange={e => setPizzaState({ ...pizzaState, customName: e.target.value })}
                className="font-serif text-lg font-bold text-center text-white bg-transparent border-b border-[#38322c] focus:border-[#c94a29] focus:outline-none w-full pb-1"
                placeholder="Name your pizza..."
              />
              <div className="text-xs text-[#a89d90] space-x-1">
                <span>{pizzaState.size}</span>
                <span>·</span>
                <span>{selectedDough?.name.split(' ')[0]}</span>
                <span>·</span>
                <span>{pizzaState.toppings.length + pizzaState.cheese.length} toppings</span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="w-full mt-6 pt-4 border-t border-[#26221f] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8c8275] block">Total Artisanal Price</span>
                <span className="font-mono text-2xl font-bold text-[#fbfaf8] tabular-nums">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddCustomToBag}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#c94a29] hover:bg-[#b23d1e] text-white rounded-md text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
            </div>

          </div>

          {/* Right Column: Step-by-Step Customization Options */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step Selection Navigation Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-[#2d2824]">
              {[
                { id: 'crust', label: '1. Crust & Size' },
                { id: 'sauce', label: '2. Sauce Base' },
                { id: 'cheese', label: '3. Cheeses' },
                { id: 'meat', label: '4. Meats & Proteins' },
                { id: 'veggie', label: '5. Farm Veggies' },
                { id: 'finisher', label: '6. Post-Oven Finishers' },
              ].map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-2 text-xs font-medium rounded-t transition-colors whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'border-b-2 border-[#c94a29] text-white font-semibold'
                        : 'text-[#8c8275] hover:text-[#d1c7bc]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Crust & Size */}
            {activeTab === 'crust' && (
              <div className="space-y-6 animate-in fade-in">
                {/* Size Selection */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e] mb-3">
                    Select Pizza Diameter
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { size: '12"', name: '12" Personal Hearth Pie', desc: '6 generous slices · Perfect for 1', price: 15.0 },
                      { size: '16"', name: '16" Sharing Hearth Pie', desc: '8 generous slices · Feeds 2 to 3', price: 21.5 },
                    ].map(s => {
                      const isSelected = pizzaState.size === s.size;
                      return (
                        <button
                          key={s.size}
                          type="button"
                          onClick={() => setPizzaState({ ...pizzaState, size: s.size as '12"' | '16"' })}
                          className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#c94a29] bg-[#c94a29]/10 text-white'
                              : 'border-[#2d2824] bg-[#171513] text-[#a89d90] hover:border-[#423a33]'
                          }`}
                        >
                          <div className="font-semibold text-sm text-white">{s.name}</div>
                          <div className="text-xs text-[#8c8275] mt-1">{s.desc}</div>
                          <div className="font-mono text-sm font-bold text-[#d99a4e] mt-2 tabular-nums">
                            Base: ${s.price.toFixed(2)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dough Selection */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e] mb-3">
                    Dough Fermentation Style
                  </h4>
                  <div className="space-y-2.5">
                    {DOUGH_OPTIONS.map(d => {
                      const isSelected = pizzaState.dough === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setPizzaState({ ...pizzaState, dough: d.id })}
                          className={`w-full p-4 text-left rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#c94a29] bg-[#c94a29]/10 text-white'
                              : 'border-[#2d2824] bg-[#171513] text-[#a89d90] hover:border-[#423a33]'
                          }`}
                        >
                          <div>
                            <div className="font-medium text-sm text-white flex items-center gap-2">
                              <span>{d.name}</span>
                              {isSelected && <Check className="w-4 h-4 text-[#c94a29]" />}
                            </div>
                            <div className="text-xs text-[#8c8275] mt-0.5">{d.description}</div>
                          </div>
                          <span className="font-mono text-xs tabular-nums text-[#d99a4e] shrink-0 ml-3">
                            {d.price > 0 ? `+$${d.price.toFixed(2)}` : 'Included'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Sauce Base */}
            {activeTab === 'sauce' && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e] mb-2">
                  Choose Slow-Simmered Sauce Base
                </h4>
                <div className="space-y-2.5">
                  {SAUCE_OPTIONS.map(s => {
                    const isSelected = pizzaState.sauce === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setPizzaState({ ...pizzaState, sauce: s.id })}
                        className={`w-full p-4 text-left rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#c94a29] bg-[#c94a29]/10 text-white'
                            : 'border-[#2d2824] bg-[#171513] text-[#a89d90] hover:border-[#423a33]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full border border-black/40 shrink-0" 
                            style={{ backgroundColor: s.color }} 
                          />
                          <div>
                            <div className="font-medium text-sm text-white flex items-center gap-2">
                              <span>{s.name}</span>
                              {isSelected && <Check className="w-4 h-4 text-[#c94a29]" />}
                            </div>
                            <div className="text-xs text-[#8c8275] mt-0.5">{s.description}</div>
                          </div>
                        </div>
                        <span className="font-mono text-xs tabular-nums text-[#d99a4e] shrink-0 ml-3">
                          {s.price > 0 ? `+$${s.price.toFixed(2)}` : 'Included'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Cheeses */}
            {activeTab === 'cheese' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e]">
                    Artisanal Italian Cheeses
                  </h4>
                  <span className="text-xs text-[#8c8275]">Select multiple</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CHEESE_OPTIONS.map(c => {
                    const isSelected = pizzaState.cheese.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleCheese(c.id)}
                        className={`p-3.5 text-left rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#c94a29] bg-[#c94a29]/10 text-white'
                            : 'border-[#2d2824] bg-[#171513] text-[#a89d90] hover:border-[#423a33]'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-xs sm:text-sm text-white">{c.name}</div>
                          <div className="text-[11px] text-[#8c8275] mt-0.5">{c.calories} cal</div>
                        </div>
                        <span className="font-mono text-xs tabular-nums text-[#d99a4e] shrink-0 ml-2">
                          {isSelected ? '✓ Added' : c.price > 0 ? `+$${c.price.toFixed(2)}` : 'Free'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 4: Meats & Proteins */}
            {activeTab === 'meat' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e]">
                    Heritage Meats & Cured Specialties
                  </h4>
                  <span className="text-xs text-[#8c8275]">Wood-fired on pie</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MEAT_OPTIONS.map(m => {
                    const isSelected = pizzaState.toppings.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleTopping(m.id)}
                        className={`p-3.5 text-left rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#c94a29] bg-[#c94a29]/10 text-white'
                            : 'border-[#2d2824] bg-[#171513] text-[#a89d90] hover:border-[#423a33]'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-xs sm:text-sm text-white">{m.name}</div>
                          <div className="text-[11px] text-[#8c8275] mt-0.5">{m.calories} cal</div>
                        </div>
                        <span className="font-mono text-xs tabular-nums text-[#d99a4e] shrink-0 ml-2">
                          {isSelected ? '✓ Added' : `+$${m.price.toFixed(2)}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 5: Farm Veggies */}
            {activeTab === 'veggie' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e]">
                    Farm-Fresh Vegetables & Herbs
                  </h4>
                  <span className="text-xs text-[#8c8275]">Seasonal organic harvest</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VEGGIE_OPTIONS.map(v => {
                    const isSelected = pizzaState.toppings.includes(v.id);
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => toggleTopping(v.id)}
                        className={`p-3.5 text-left rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#c94a29] bg-[#c94a29]/10 text-white'
                            : 'border-[#2d2824] bg-[#171513] text-[#a89d90] hover:border-[#423a33]'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-xs sm:text-sm text-white">{v.name}</div>
                          <div className="text-[11px] text-[#8c8275] mt-0.5">{v.calories} cal</div>
                        </div>
                        <span className="font-mono text-xs tabular-nums text-[#d99a4e] shrink-0 ml-2">
                          {isSelected ? '✓ Added' : `+$${v.price.toFixed(2)}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 6: Post-Oven Finishers */}
            {activeTab === 'finisher' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e]">
                    Post-Oven Finishers & Glazes
                  </h4>
                  <span className="text-xs text-[#8c8275]">Drizzled fresh off stone</span>
                </div>
                <div className="space-y-2.5">
                  {FINISHER_OPTIONS.map(f => {
                    const isSelected = pizzaState.finishers.includes(f.id);
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => toggleFinisher(f.id)}
                        className={`w-full p-3.5 text-left rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#c94a29] bg-[#c94a29]/10 text-white'
                            : 'border-[#2d2824] bg-[#171513] text-[#a89d90] hover:border-[#423a33]'
                        }`}
                      >
                        <div className="font-medium text-sm text-white">{f.name}</div>
                        <span className="font-mono text-xs tabular-nums text-[#d99a4e] shrink-0 ml-2">
                          {isSelected ? '✓ Added' : f.price > 0 ? `+$${f.price.toFixed(2)}` : 'Free'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Additional instructions */}
                <div className="pt-4">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e] block mb-2">
                    Special Baking Instructions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Light char on crust, extra basil after bake, sliced in 6..."
                    value={pizzaState.notes}
                    onChange={e => setPizzaState({ ...pizzaState, notes: e.target.value })}
                    className="w-full bg-[#171513] border border-[#2d2824] rounded-md px-3.5 py-2.5 text-xs sm:text-sm text-[#f5f2eb] placeholder-[#6e665d] focus:outline-none focus:border-[#c94a29]"
                  />
                </div>
              </div>
            )}

            {/* Quick Step Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#26221f]">
              <span className="text-xs text-[#8c8275]">
                Step {['crust', 'sauce', 'cheese', 'meat', 'veggie', 'finisher'].indexOf(activeTab) + 1} of 6
              </span>
              
              <div className="flex items-center gap-2">
                {activeTab !== 'finisher' ? (
                  <button
                    type="button"
                    onClick={() => {
                      const steps: BuilderTab[] = ['crust', 'sauce', 'cheese', 'meat', 'veggie', 'finisher'];
                      const next = steps[steps.indexOf(activeTab) + 1];
                      if (next) setActiveTab(next);
                    }}
                    className="flex items-center gap-1 px-4 py-2 bg-[#211e1b] hover:bg-[#2b2723] text-xs font-medium text-white border border-[#3e3831] rounded-md cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddCustomToBag}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#c94a29] hover:bg-[#b23d1e] text-xs font-semibold text-white rounded-md cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Complete & Add to Bag</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
