import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Bike, 
  ArrowRight, 
  Check, 
  Tag, 
  AlertCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { CartItem, Order } from '../types/pizza';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  fulfillmentType: 'delivery' | 'pickup';
  onToggleFulfillment: (type: 'delivery' | 'pickup') => void;
  onPlaceOrder: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  fulfillmentType,
  onToggleFulfillment,
  onPlaceOrder,
}) => {
  // Checkout form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [pickupTime, setPickupTime] = useState('As soon as ready (15–20 min)');
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent?: number; freeDelivery?: boolean; fixedDiscount?: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Pricing math
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = subtotal * (appliedCoupon.discountPercent / 100);
    } else if (appliedCoupon.fixedDiscount) {
      discount = appliedCoupon.fixedDiscount;
    }
  }

  const baseDeliveryFee = fulfillmentType === 'delivery' ? 4.5 : 0;
  const deliveryFee = appliedCoupon?.freeDelivery ? 0 : baseDeliveryFee;

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const tax = discountedSubtotal * 0.0825; // 8.25% local sales tax
  const tipAmount = (discountedSubtotal * tipPercentage) / 100;
  const total = discountedSubtotal + deliveryFee + tax + tipAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();

    if (code === 'WOODFIRE10') {
      setAppliedCoupon({ code: 'WOODFIRE10', discountPercent: 10 });
      setCouponCode('');
    } else if (code === 'FREEDELIVERY') {
      setAppliedCoupon({ code: 'FREEDELIVERY', freeDelivery: true });
      setCouponCode('');
    } else if (code === 'NAPOLI') {
      setAppliedCoupon({ code: 'NAPOLI', fixedDiscount: 5.0 });
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try WOODFIRE10 or FREEDELIVERY');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (cart.length === 0) {
      setFormError('Your order bag is empty.');
      return;
    }

    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 7) {
      setFormError('Please enter a valid phone number for order updates.');
      return;
    }

    if (fulfillmentType === 'delivery' && !deliveryAddress.trim()) {
      setFormError('Please enter your delivery street address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const newOrder: Order = {
        orderId: `FIA-${randomId}`,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: fulfillmentType,
        customerName: customerName.trim(),
        phone: customerPhone.trim(),
        address: fulfillmentType === 'delivery' ? deliveryAddress.trim() : undefined,
        pickupTime: fulfillmentType === 'pickup' ? pickupTime : undefined,
        items: [...cart],
        subtotal,
        discount,
        tax,
        deliveryFee,
        tip: tipAmount,
        total,
        status: 'received',
        estimatedMinutes: fulfillmentType === 'delivery' ? 40 : 18,
        estimatedDeliveryTime: new Date(Date.now() + (fulfillmentType === 'delivery' ? 40 : 18) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        couponApplied: appliedCoupon?.code,
      };

      setIsSubmitting(false);
      onPlaceOrder(newOrder);
      onClearCart();
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Slide-out Drawer Panel */}
      <div 
        className="relative z-10 w-full max-w-lg bg-[#161412] border-l border-[#2e2924] h-full flex flex-col shadow-2xl overflow-hidden text-[#f7f5f2]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#292420] flex items-center justify-between bg-[#1b1916]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#c94a29]" />
            <h2 className="font-serif text-lg font-bold text-white">Your Order Bag</h2>
            <span className="text-xs bg-[#2b2621] text-[#d99a4e] px-2 py-0.5 rounded font-mono tabular-nums">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#a89d90] hover:text-white hover:bg-[#2b2621] rounded-lg transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fulfillment Type Segmented Switcher */}
        <div className="p-4 bg-[#1e1c19] border-b border-[#292420]">
          <div className="grid grid-cols-2 p-1 bg-[#141210] border border-[#332e29] rounded-lg">
            <button
              type="button"
              onClick={() => onToggleFulfillment('delivery')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                fulfillmentType === 'delivery'
                  ? 'bg-[#c94a29] text-white shadow-sm'
                  : 'text-[#a89d90] hover:text-[#fbfaf8]'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Delivery (35–45m)</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleFulfillment('pickup')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                fulfillmentType === 'pickup'
                  ? 'bg-[#c94a29] text-white shadow-sm'
                  : 'text-[#a89d90] hover:text-[#fbfaf8]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Pickup (15–20m)</span>
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Empty Cart State */}
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#423c36] mx-auto" />
              <p className="font-serif text-lg font-bold text-white">Your bag is empty</p>
              <p className="text-xs text-[#8c8275] max-w-xs mx-auto">
                Explore our wood-fired Neapolitan menu or craft a custom pie to begin your feast.
              </p>
            </div>
          ) : (
            <>
              {/* Itemized Cart List */}
              <div className="space-y-3 divide-y divide-[#26221f]">
                {cart.map(item => {
                  return (
                    <div key={item.cartId} className="pt-3 first:pt-0 flex gap-3 items-start">
                      
                      {/* Item Thumbnail */}
                      {item.image && (
                        <div className="w-16 h-16 rounded-lg bg-[#24201d] overflow-hidden shrink-0 border border-[#332e29]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                          <span className="font-mono text-sm font-bold text-white tabular-nums shrink-0">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {item.subtitle && (
                          <p className="text-xs text-[#d99a4e] mt-0.5">{item.subtitle}</p>
                        )}

                        {item.addedToppings && item.addedToppings.length > 0 && (
                          <p className="text-[11px] text-[#8c8275] mt-1 leading-snug line-clamp-2">
                            {item.addedToppings.join(', ')}
                          </p>
                        )}

                        {item.removedIngredients && item.removedIngredients.length > 0 && (
                          <p className="text-[11px] text-[#f87171] mt-0.5">
                            Omit: {item.removedIngredients.join(', ')}
                          </p>
                        )}

                        {item.specialInstructions && (
                          <p className="text-[11px] text-[#a89d90] italic mt-0.5">
                            "{item.specialInstructions}"
                          </p>
                        )}

                        {/* Stepper & Delete */}
                        <div className="flex items-center justify-between mt-2 pt-1">
                          <div className="flex items-center border border-[#332e29] rounded bg-[#1c1916]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartId, -1)}
                              className="p-1 text-[#8c8275] hover:text-white transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-mono font-medium text-white tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartId, 1)}
                              className="p-1 text-[#8c8275] hover:text-white transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.cartId)}
                            className="text-[#8c8275] hover:text-[#ef4444] transition-colors p-1 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Promo Code Form */}
              <div className="pt-2 border-t border-[#26221f]">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-md text-xs text-[#86efac]">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>
                        Promo applied: <strong>{appliedCoupon.code}</strong>
                        {appliedCoupon.discountPercent && ` (${appliedCoupon.discountPercent}% Off)`}
                        {appliedCoupon.freeDelivery && ` (Free Delivery)`}
                        {appliedCoupon.fixedDiscount && ` ($${appliedCoupon.fixedDiscount} Off)`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAppliedCoupon(null)}
                      className="text-[#86efac] hover:text-white cursor-pointer underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. WOODFIRE10)"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      className="flex-1 bg-[#1c1916] border border-[#332e29] rounded px-3 py-1.5 text-xs text-white placeholder-[#786e64] focus:outline-none focus:border-[#c94a29]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#2b2621] hover:bg-[#38322c] text-white text-xs font-medium rounded transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-[#f87171] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {couponError}
                  </p>
                )}
              </div>

              {/* Tip Selection */}
              <div className="pt-2 border-t border-[#26221f] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#a89d90]">
                  <span>Pizzaiolo & Courier Gratuity</span>
                  <span className="font-mono text-white tabular-nums">${tipAmount.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[0, 10, 15, 18, 20].map(pct => {
                    const isSelected = tipPercentage === pct;
                    return (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setTipPercentage(pct)}
                        className={`py-1.5 text-xs font-mono rounded border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#c94a29] bg-[#c94a29]/20 text-white font-bold'
                            : 'border-[#332e29] bg-[#1a1715] text-[#8c8275] hover:text-white'
                        }`}
                      >
                        {pct === 0 ? 'None' : `${pct}%`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Customer Information Checkout Form */}
              <div className="pt-4 border-t border-[#26221f] space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e]">
                  Customer & Delivery Details
                </h4>

                <div className="space-y-2.5">
                  <div>
                    <label className="text-[11px] text-[#8c8275] block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marco Rossi"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full bg-[#1c1916] border border-[#332e29] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c94a29]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#8c8275] block mb-1">Mobile Phone (For oven SMS tracking) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 329-8472"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#1c1916] border border-[#332e29] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c94a29]"
                    />
                  </div>

                  {fulfillmentType === 'delivery' ? (
                    <div>
                      <label className="text-[11px] text-[#8c8275] block mb-1">Delivery Street Address & Apt *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                        value={deliveryAddress}
                        onChange={e => setDeliveryAddress(e.target.value)}
                        className="w-full bg-[#1c1916] border border-[#332e29] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c94a29]"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="text-[11px] text-[#8c8275] block mb-1">Pickup Time</label>
                      <select
                        value={pickupTime}
                        onChange={e => setPickupTime(e.target.value)}
                        className="w-full bg-[#1c1916] border border-[#332e29] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c94a29]"
                      >
                        <option>As soon as ready (15–20 min)</option>
                        <option>In 30 minutes</option>
                        <option>In 45 minutes</option>
                        <option>In 1 hour</option>
                      </select>
                    </div>
                  )}
                </div>

                {formError && (
                  <p className="text-xs text-[#f87171] bg-[#ef4444]/10 p-2 rounded border border-[#ef4444]/20 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formError}</span>
                  </p>
                )}
              </div>

              {/* Order Cost Breakdown */}
              <div className="pt-4 border-t border-[#26221f] space-y-1.5 text-xs text-[#a89d90]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#86efac]">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                {fulfillmentType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Courier Fee</span>
                    <span className="font-mono text-white tabular-nums">
                      {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax (8.25%)</span>
                  <span className="font-mono text-white tabular-nums">${tax.toFixed(2)}</span>
                </div>
                {tipAmount > 0 && (
                  <div className="flex justify-between">
                    <span>Gratuity</span>
                    <span className="font-mono text-white tabular-nums">${tipAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-2 border-t border-[#2d2824] text-sm font-bold text-white">
                  <span>Total Amount</span>
                  <span className="font-mono text-xl text-[#fbfaf8] tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Drawer Footer Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-[#292420] bg-[#1a1715]">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleCheckoutSubmit}
              className="w-full flex items-center justify-between px-5 py-3.5 bg-[#c94a29] hover:bg-[#b23d1e] text-white rounded-md text-sm font-semibold transition-all shadow-lg cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{isSubmitting ? 'Baking Your Ticket...' : 'Confirm & Place Order'}</span>
              </div>
              <span className="font-mono tabular-nums text-base">
                ${total.toFixed(2)}
              </span>
            </button>
            <p className="text-[11px] text-[#786e64] text-center mt-2">
              Payment handled upon {fulfillmentType === 'delivery' ? 'delivery arrival' : 'counter pickup'} (Card or Cash)
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
