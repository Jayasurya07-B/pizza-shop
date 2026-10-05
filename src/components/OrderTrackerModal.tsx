import React, { useEffect, useState } from 'react';
import { 
  X, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Bike, 
  ShoppingBag, 
  ChefHat, 
  Sparkles, 
  PhoneCall, 
  MapPin,
  FastForward,
  Check
} from 'lucide-react';
import { Order, OrderStatus } from '../types/pizza';

interface OrderTrackerModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateOrderStatus: (status: OrderStatus) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateOrderStatus,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(
    order?.type === 'delivery' ? 1800 : 900
  );

  useEffect(() => {
    if (!isOpen || !order) return;

    // Countdown interval
    const timer = setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, order]);

  // Automatic progress simulation every 20 seconds
  useEffect(() => {
    if (!isOpen || !order || order.status === 'completed') return;

    const stages: OrderStatus[] = [
      'received',
      'preparing_dough',
      'wood_firing',
      'quality_check',
      order.type === 'delivery' ? 'out_for_delivery' : 'ready_for_pickup',
      'completed'
    ];

    const currentIdx = stages.indexOf(order.status);
    if (currentIdx < stages.length - 1) {
      const autoProgress = setTimeout(() => {
        onUpdateOrderStatus(stages[currentIdx + 1]);
      }, 25000); // 25s auto progress

      return () => clearTimeout(autoProgress);
    }
  }, [isOpen, order, onUpdateOrderStatus]);

  if (!isOpen || !order) return null;

  const isDelivery = order.type === 'delivery';

  const stages: {
    status: OrderStatus;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
  }[] = [
    {
      status: 'received',
      title: 'Order Queued',
      subtitle: 'Kitchen ticket verified by Head Pizzaiolo',
      icon: <ChefHat className="w-4 h-4" />,
    },
    {
      status: 'preparing_dough',
      title: 'Dough Stretched & Sauced',
      subtitle: '72h leavened dough tossed with San Marzano D.O.P.',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      status: 'wood_firing',
      title: '900°F Stone Hearth',
      subtitle: 'Blistering in volcanic stone oven with oak firewood',
      icon: <Flame className="w-4 h-4" />,
    },
    {
      status: 'quality_check',
      title: 'Boxed & Inspected',
      subtitle: 'Fresh herbs dressed and packed in thermal insulated box',
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    {
      status: isDelivery ? 'out_for_delivery' : 'ready_for_pickup',
      title: isDelivery ? 'Courier En Route' : 'Ready for Counter Pickup',
      subtitle: isDelivery
        ? `Driver approaching ${order.address || 'your destination'}`
        : 'Fresh and steaming at 428 Artisan Way counter',
      icon: isDelivery ? <Bike className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />,
    },
  ];

  const currentStageIdx = stages.findIndex(s => s.status === order.status);
  const activeIdx = currentStageIdx === -1 && order.status === 'completed' ? stages.length : currentStageIdx;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const handleFastForward = () => {
    const allStages: OrderStatus[] = [
      'received',
      'preparing_dough',
      'wood_firing',
      'quality_check',
      isDelivery ? 'out_for_delivery' : 'ready_for_pickup',
      'completed'
    ];
    const nextIdx = allStages.indexOf(order.status) + 1;
    if (nextIdx < allStages.length) {
      onUpdateOrderStatus(allStages[nextIdx]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-[#181614] border border-[#332e29] rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-[#f7f5f2]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Tracker Header */}
        <div className="p-6 border-b border-[#2b2723] bg-[#1f1c19] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#d99a4e]">
                Order {order.orderId}
              </span>
              <span className="text-[#574e45]">·</span>
              <span className="text-xs text-[#a89d90] capitalize">{order.type}</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-white mt-1">
              Live Wood-Fire Kitchen Tracker
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {order.status !== 'completed' && (
              <button
                type="button"
                onClick={handleFastForward}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2b2723] hover:bg-[#38332c] text-xs text-[#d99a4e] rounded-md transition-colors cursor-pointer"
                title="Advance to next stage (Simulator)"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Next Stage</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#a89d90] hover:text-white hover:bg-[#2b2723] rounded-lg transition-colors cursor-pointer"
              aria-label="Close tracker"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Tracker Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Estimated ETA Banner */}
          <div className="bg-[#1f1b18] border border-[#38322b] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#c94a29]/15 border border-[#c94a29]/30 flex items-center justify-center text-[#c94a29] shrink-0">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e]">
                  Estimated Arrival
                </div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {order.status === 'completed'
                    ? 'Order Complete & Delivered!'
                    : `Around ${order.estimatedDeliveryTime}`}
                </div>
              </div>
            </div>

            {order.status !== 'completed' && (
              <div className="bg-[#141210] border border-[#2e2924] px-4 py-2 rounded-lg text-right">
                <span className="text-[11px] text-[#8c8275] block">Countdown</span>
                <span className="font-mono text-lg font-bold text-[#fbfaf8] tabular-nums">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
              </div>
            )}
          </div>

          {/* Vertical Stepper Timeline */}
          <div className="space-y-4 py-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e]">
              Hearth Stages
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#2b2621]">
              {stages.map((stage, idx) => {
                const isPassed = activeIdx > idx;
                const isCurrent = activeIdx === idx;

                return (
                  <div key={stage.status} className="relative flex items-start gap-4">
                    {/* Stage Bullet */}
                    <div 
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors ${
                        isPassed
                          ? 'bg-[#22c55e] text-black font-bold'
                          : isCurrent
                          ? 'bg-[#c94a29] text-white ring-4 ring-[#c94a29]/20'
                          : 'bg-[#26221f] text-[#6b6257] border border-[#332e29]'
                      }`}
                    >
                      {isPassed ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                    </div>

                    {/* Stage Label */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span 
                          className={`text-sm font-semibold transition-colors ${
                            isCurrent ? 'text-white' : isPassed ? 'text-[#e6dfd5]' : 'text-[#786e64]'
                          }`}
                        >
                          {stage.title}
                        </span>
                        {isCurrent && (
                          <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-wider text-[#c94a29] bg-[#c94a29]/15 px-2 py-0.5 rounded">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className={`text-xs mt-0.5 ${isCurrent ? 'text-[#c4b5a5]' : 'text-[#6b6257]'}`}>
                        {stage.subtitle}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Route / Destination card */}
          <div className="p-4 bg-[#1b1916] rounded-xl border border-[#2b2723] space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] text-[#8c8275] uppercase tracking-wider block">
                  {isDelivery ? 'Delivery Destination' : 'Pickup Store Counter'}
                </span>
                <p className="text-sm font-medium text-white mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#c94a29] shrink-0" />
                  <span>
                    {isDelivery ? order.address : 'Fiamma Pizzeria, 428 Artisan Way, Little Italy'}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#8c8275] block">Customer</span>
                <span className="text-xs font-medium text-[#e6dfd5]">{order.customerName}</span>
              </div>
            </div>

            {/* Courier contact line */}
            <div className="pt-2 border-t border-[#26221f] flex items-center justify-between text-xs text-[#a89d90]">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#d99a4e]" />
                Kitchen Direct: (555) 749-9231
              </span>
              <span>Need help? We're on it</span>
            </div>
          </div>

          {/* Itemized Order Receipt Summary */}
          <div className="border border-[#2b2723] rounded-xl p-4 space-y-3 bg-[#171513]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e]">
              Itemized Receipt ({order.items.length} items)
            </h4>
            <div className="space-y-2 text-xs divide-y divide-[#26221f]">
              {order.items.map(item => (
                <div key={item.cartId} className="pt-2 first:pt-0 flex justify-between items-start">
                  <div>
                    <span className="font-medium text-white">{item.quantity}x {item.name}</span>
                    {item.subtitle && <p className="text-[11px] text-[#a89d90]">{item.subtitle}</p>}
                    {item.addedToppings && item.addedToppings.length > 0 && (
                      <p className="text-[11px] text-[#8c8275]">{item.addedToppings.join(', ')}</p>
                    )}
                  </div>
                  <span className="font-mono tabular-nums text-white shrink-0 ml-3">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#26221f] flex justify-between text-sm font-bold text-white">
              <span>Total Paid / Due</span>
              <span className="font-mono text-base tabular-nums text-[#d99a4e]">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>

        </div>

        {/* Tracker Footer */}
        <div className="p-4 border-t border-[#2b2723] bg-[#1a1715] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-[#282420] hover:bg-[#332e29] text-white text-xs font-medium rounded-md transition-colors cursor-pointer"
          >
            Keep Exploring Menu
          </button>
        </div>

      </div>
    </div>
  );
};
