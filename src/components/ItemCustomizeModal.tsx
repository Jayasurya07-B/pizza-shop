import React, { useState } from 'react';
import { X, Plus, Minus, Check, Flame } from 'lucide-react';
import { MenuItem, CartItem } from '../types/pizza';
import { CHEESE_OPTIONS, MEAT_OPTIONS, VEGGIE_OPTIONS, FINISHER_OPTIONS } from '../data/customizerData';

interface ItemCustomizeModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(item.defaultSize || '12"');
  const [selectedCrust, setSelectedCrust] = useState<string>(
    item.crustOptions ? item.crustOptions[0].id : 'neapolitan'
  );
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [addedToppings, setAddedToppings] = useState<{ id: string; name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!isOpen) return null;

  // Calculate pricing
  const sizeMultiplier = item.sizes?.find(s => s.name === selectedSize)?.priceMultiplier ?? 1.0;
  const baseSizePrice = item.price * sizeMultiplier;
  const crustExtra = item.crustOptions?.find(c => c.id === selectedCrust)?.extraPrice ?? 0;
  const toppingsExtra = addedToppings.reduce((sum, t) => sum + t.price, 0);
  const singleUnitPrice = baseSizePrice + crustExtra + toppingsExtra;
  const totalPrice = singleUnitPrice * quantity;

  const toggleRemoveIngredient = (ing: string) => {
    if (removedIngredients.includes(ing)) {
      setRemovedIngredients(removedIngredients.filter(i => i !== ing));
    } else {
      setRemovedIngredients([...removedIngredients, ing]);
    }
  };

  const toggleTopping = (topping: { id: string; name: string; price: number }) => {
    const exists = addedToppings.some(t => t.id === topping.id);
    if (exists) {
      setAddedToppings(addedToppings.filter(t => t.id !== topping.id));
    } else {
      setAddedToppings([...addedToppings, topping]);
    }
  };

  const handleConfirm = () => {
    const crustName = item.crustOptions?.find(c => c.id === selectedCrust)?.name || 'Classic Sourdough';
    const cartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      menuItemId: item.id,
      name: item.name,
      subtitle: `${selectedSize} · ${crustName}`,
      price: singleUnitPrice,
      quantity,
      image: item.image,
      selectedSize,
      selectedCrust: crustName,
      addedToppings: addedToppings.map(t => `${t.name} (+$${t.price.toFixed(2)})`),
      removedIngredients,
      specialInstructions: specialInstructions.trim() || undefined,
    };

    onAddToCart(cartItem);
    onClose();
  };

  const popularAddons = [
    ...CHEESE_OPTIONS.slice(1, 3),
    ...MEAT_OPTIONS.slice(0, 3),
    ...VEGGIE_OPTIONS.slice(0, 3),
    ...FINISHER_OPTIONS.slice(0, 2),
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-[#181614] border border-[#332e29] rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#f7f5f2]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#2b2723] flex items-center justify-between bg-[#1f1c19]">
          <div>
            <h2 className="font-serif text-xl font-bold text-white">{item.name}</h2>
            <p className="text-xs text-[#a89d90] italic">{item.italianName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#a89d90] hover:text-white hover:bg-[#2b2723] rounded-lg transition-colors cursor-pointer"
            aria-label="Close customization modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 divide-y divide-[#26221f]">
          
          {/* Sizing options if available */}
          {item.sizes && item.sizes.length > 1 && (
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e] block">
                Choose Size
              </label>
              <div className="grid grid-cols-2 gap-3">
                {item.sizes.map(size => {
                  const isSelected = selectedSize === size.name;
                  const price = (item.price * size.priceMultiplier).toFixed(2);
                  return (
                    <button
                      key={size.name}
                      type="button"
                      onClick={() => setSelectedSize(size.name)}
                      className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#c94a29] bg-[#c94a29]/10 text-white'
                          : 'border-[#332e29] bg-[#1e1c19] text-[#a89d90] hover:border-[#4a423a]'
                      }`}
                    >
                      <div className="font-medium text-sm text-white">{size.label}</div>
                      <div className="text-xs font-mono tabular-nums text-[#d99a4e] mt-1">${price}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Crust options */}
          {item.crustOptions && item.crustOptions.length > 0 && (
            <div className="space-y-3 pt-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e] block">
                Select Crust Style
              </label>
              <div className="space-y-2">
                {item.crustOptions.map(crust => {
                  const isSelected = selectedCrust === crust.id;
                  return (
                    <button
                      key={crust.id}
                      type="button"
                      onClick={() => setSelectedCrust(crust.id)}
                      className={`w-full p-3 text-left rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#c94a29] bg-[#c94a29]/10 text-white'
                          : 'border-[#332e29] bg-[#1e1c19] text-[#a89d90] hover:border-[#4a423a]'
                      }`}
                    >
                      <span className="text-sm font-medium text-white">{crust.name}</span>
                      <span className="text-xs font-mono tabular-nums text-[#d99a4e]">
                        {crust.extraPrice > 0 ? `+$${crust.extraPrice.toFixed(2)}` : 'Standard'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Modify standard ingredients */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e] block">
                  Original Recipe Ingredients
                </label>
                <span className="text-xs text-[#8c8275]">Click to omit</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map(ing => {
                  const isRemoved = removedIngredients.includes(ing);
                  return (
                    <button
                      key={ing}
                      type="button"
                      onClick={() => toggleRemoveIngredient(ing)}
                      className={`px-3 py-1.5 text-xs rounded-md border transition-all cursor-pointer ${
                        isRemoved
                          ? 'border-[#ef4444]/40 bg-[#ef4444]/10 text-[#fca5a5] line-through'
                          : 'border-[#38332c] bg-[#211e1b] text-[#e6ded3] hover:border-[#4f483e]'
                      }`}
                    >
                      {ing} {isRemoved ? '(Omit)' : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add extra artisanal toppings */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e] block">
                Add Premium Toppings
              </label>
              <span className="text-xs text-[#8c8275]">Wood-fired on top</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {popularAddons.map(addon => {
                const isAdded = addedToppings.some(t => t.id === addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleTopping(addon)}
                    className={`p-2.5 text-left rounded-lg border flex items-center justify-between text-xs transition-all cursor-pointer ${
                      isAdded
                        ? 'border-[#c94a29] bg-[#c94a29]/15 text-white'
                        : 'border-[#332e29] bg-[#1e1c19] text-[#c4b5a5] hover:border-[#4a423a]'
                    }`}
                  >
                    <span className="truncate pr-2">{addon.name}</span>
                    <span className="font-mono tabular-nums text-[#d99a4e] shrink-0">
                      {isAdded ? '✓ Added' : `+$${addon.price.toFixed(2)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kitchen notes */}
          <div className="space-y-2 pt-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e] block">
              Kitchen Instructions
            </label>
            <input
              type="text"
              placeholder="e.g. Extra crispy cornicione, cut in 8 slices, sauce on the side..."
              value={specialInstructions}
              onChange={e => setSpecialInstructions(e.target.value)}
              className="w-full bg-[#141210] border border-[#38332c] rounded-md px-3.5 py-2.5 text-sm text-[#f5f2eb] placeholder-[#6e665d] focus:outline-none focus:border-[#c94a29]"
            />
          </div>

        </div>

        {/* Modal Footer with live price & action */}
        <div className="p-4 sm:p-6 border-t border-[#2b2723] bg-[#1f1c19] flex items-center justify-between gap-4">
          
          {/* Quantity stepper */}
          <div className="flex items-center border border-[#38332c] rounded-md bg-[#141210]">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2.5 text-[#a89d90] hover:text-white transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 text-sm font-mono font-bold text-white tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2.5 text-[#a89d90] hover:text-white transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to order button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 flex items-center justify-between px-5 py-3 bg-[#c94a29] hover:bg-[#b23d1e] text-white rounded-md text-sm font-semibold transition-all shadow-md cursor-pointer"
          >
            <span>Add to Order</span>
            <span className="font-mono tabular-nums text-white text-base">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
