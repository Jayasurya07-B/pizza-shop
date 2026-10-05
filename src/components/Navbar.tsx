import React, { useState } from 'react';
import { ShoppingBag, Flame, Clock, Menu as MenuIcon, X } from 'lucide-react';
import { CartItem, Order } from '../types/pizza';

interface NavbarProps {
  cart: CartItem[];
  activeOrder: Order | null;
  onOpenCart: () => void;
  onOpenOrderTracker: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  activeOrder,
  onOpenCart,
  onOpenOrderTracker,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#121110]/95 backdrop-blur-md border-b border-[#2c2825]">
      {/* Operating Status Bar */}
      <div className="bg-[#1c1917] border-b border-[#26221f] py-1 px-4 text-center text-xs text-[#a8a29e] hidden sm:block">
        <span className="text-[#e27d60] font-medium">Open Tonight</span>
        <span className="mx-2 text-[#44403c]">·</span>
        <span>900°F Wood-Fire Oven Blazing</span>
        <span className="mx-2 text-[#44403c]">·</span>
        <span>Pickup in 15–20m · Delivery in 35–45m</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('hero')}
          className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#fbfaf8] hover:text-[#d99a4e] transition-colors focus:outline-none flex items-center gap-2 group cursor-pointer"
        >
          <span className="text-[#c94a29] transition-transform group-hover:scale-110 duration-200">
            <Flame className="w-6 h-6 inline fill-[#c94a29]" />
          </span>
          Fiamma
        </button>

        {/* Zone 2: 4-6 clean text navigation links (single line) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#c4b5a5]">
          <button
            onClick={() => handleNavClick('menu')}
            className={`cursor-pointer transition-colors hover:text-[#fbfaf8] ${
              activeSection === 'menu' ? 'text-[#fbfaf8] font-semibold border-b-2 border-[#c94a29] pb-0.5' : ''
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => handleNavClick('builder')}
            className={`cursor-pointer transition-colors hover:text-[#fbfaf8] ${
              activeSection === 'builder' ? 'text-[#fbfaf8] font-semibold border-b-2 border-[#c94a29] pb-0.5' : ''
            }`}
          >
            Craft Custom
          </button>
          <button
            onClick={() => handleNavClick('story')}
            className={`cursor-pointer transition-colors hover:text-[#fbfaf8] ${
              activeSection === 'story' ? 'text-[#fbfaf8] font-semibold border-b-2 border-[#c94a29] pb-0.5' : ''
            }`}
          >
            Our Heritage
          </button>
          <button
            onClick={() => handleNavClick('reservations')}
            className={`cursor-pointer transition-colors hover:text-[#fbfaf8] ${
              activeSection === 'reservations' ? 'text-[#fbfaf8] font-semibold border-b-2 border-[#c94a29] pb-0.5' : ''
            }`}
          >
            Reserve Table
          </button>
          {activeOrder && (
            <button
              onClick={onOpenOrderTracker}
              className="cursor-pointer text-[#e27d60] hover:text-[#ff9270] flex items-center gap-1.5 transition-colors animate-pulse"
            >
              <Clock className="w-4 h-4" />
              <span>Track Order</span>
            </button>
          )}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {activeOrder && (
            <button
              onClick={onOpenOrderTracker}
              className="md:hidden p-2 text-[#e27d60] hover:bg-[#24201d] rounded-lg transition-colors"
              title="Track Active Order"
            >
              <Clock className="w-5 h-5 animate-pulse" />
            </button>
          )}

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-4 py-2 bg-[#c94a29] hover:bg-[#b23d1e] text-white rounded-md text-sm font-medium transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Order Bag</span>
            <span className="bg-[#8b2b13] text-xs px-2 py-0.5 rounded font-mono tabular-nums">
              {totalItems}
            </span>
            {totalItems > 0 && (
              <span className="hidden lg:inline text-xs font-mono tabular-nums text-white/90 border-l border-white/20 pl-2">
                ${cartSubtotal.toFixed(2)}
              </span>
            )}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#c4b5a5] hover:text-white hover:bg-[#24201d] rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181614] border-b border-[#2c2825] px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => handleNavClick('menu')}
            className="block w-full text-left py-2 px-3 text-sm text-[#e6dfd5] hover:bg-[#26221f] rounded"
          >
            Artisanal Menu
          </button>
          <button
            onClick={() => handleNavClick('builder')}
            className="block w-full text-left py-2 px-3 text-sm text-[#e6dfd5] hover:bg-[#26221f] rounded"
          >
            Craft Custom Pie
          </button>
          <button
            onClick={() => handleNavClick('story')}
            className="block w-full text-left py-2 px-3 text-sm text-[#e6dfd5] hover:bg-[#26221f] rounded"
          >
            Our Heritage & Oven
          </button>
          <button
            onClick={() => handleNavClick('reservations')}
            className="block w-full text-left py-2 px-3 text-sm text-[#e6dfd5] hover:bg-[#26221f] rounded"
          >
            Reserve Table
          </button>
          {activeOrder && (
            <button
              onClick={() => {
                onOpenOrderTracker();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 text-sm text-[#e27d60] font-medium hover:bg-[#26221f] rounded"
            >
              Track Active Order (# {activeOrder.orderId})
            </button>
          )}
        </div>
      )}
    </header>
  );
};
