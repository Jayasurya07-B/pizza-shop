/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartItem, Order, OrderStatus } from './types/pizza';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { PizzaBuilder } from './components/PizzaBuilder';
import { StorySection } from './components/StorySection';
import { ReservationSection } from './components/ReservationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackerModal } from './components/OrderTrackerModal';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fiamma_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Order state persisted to localStorage
  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem('fiamma_active_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Sync cart to storage
  useEffect(() => {
    try {
      localStorage.setItem('fiamma_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync active order to storage
  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem('fiamma_active_order', JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem('fiamma_active_order');
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeOrder]);

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => {
      // Check if identical item already in cart
      const existingIdx = prev.findIndex(
        i =>
          i.name === item.name &&
          i.selectedSize === item.selectedSize &&
          i.selectedCrust === item.selectedCrust &&
          JSON.stringify(i.addedToppings || []) === JSON.stringify(item.addedToppings || []) &&
          JSON.stringify(i.removedIngredients || []) === JSON.stringify(item.removedIngredients || [])
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handlePlaceOrder = (order: Order) => {
    setActiveOrder(order);
    setIsOrderTrackerOpen(true);
  };

  const handleUpdateOrderStatus = (status: OrderStatus) => {
    if (activeOrder) {
      setActiveOrder({ ...activeOrder, status });
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#f7f5f2] flex flex-col font-sans selection:bg-[#c94a29] selection:text-white">
      
      {/* Strict 3-zone Top Bar Contract */}
      <Navbar
        cart={cart}
        activeOrder={activeOrder}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Campaign Hero Section */}
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onCraftCustom={() => scrollToSection('builder')}
          fulfillmentType={fulfillmentType}
          onToggleFulfillment={setFulfillmentType}
        />

        {/* Curated Artisanal Menu Section */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onCraftCustom={() => scrollToSection('builder')}
        />

        {/* Interactive Pizza Crafting Studio */}
        <PizzaBuilder
          onAddToCart={handleAddToCart}
        />

        {/* Our Heritage & 900°F Stone Oven */}
        <StorySection />

        {/* Table Reservations */}
        <ReservationSection />

        {/* Diner Reviews & Testimonials */}
        <ReviewsSection />

      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Slide-out Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        fulfillmentType={fulfillmentType}
        onToggleFulfillment={setFulfillmentType}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Live Order Tracker Modal */}
      <OrderTrackerModal
        order={activeOrder}
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

    </div>
  );
}
