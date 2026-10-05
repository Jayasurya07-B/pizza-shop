export type Category = 
  | 'all'
  | 'rosse'
  | 'bianche'
  | 'calzones'
  | 'antipasti'
  | 'drinks_desserts';

export type DietaryFilter = 'all' | 'vegetarian' | 'spicy' | 'chef_pick';

export interface MenuItem {
  id: string;
  name: string;
  italianName: string;
  category: 'rosse' | 'bianche' | 'calzones' | 'antipasti' | 'drinks_desserts';
  description: string;
  price: number;
  image: string;
  dietary: ('vegetarian' | 'spicy' | 'chef_pick')[];
  calories?: number;
  ingredients: string[];
  sizes?: { name: string; label: string; priceMultiplier: number }[];
  defaultSize?: string;
  crustOptions?: { id: string; name: string; extraPrice: number }[];
}

export interface CustomTopping {
  id: string;
  name: string;
  category: 'crust' | 'sauce' | 'cheese' | 'meat' | 'veggie' | 'finisher';
  price: number;
  color?: string;
  calories: number;
}

export interface CustomPizzaState {
  size: '12"' | '16"';
  dough: string;
  sauce: string;
  cheese: string[];
  toppings: string[];
  finishers: string[];
  notes: string;
  customName: string;
}

export interface CartItem {
  cartId: string;
  menuItemId?: string;
  name: string;
  subtitle?: string;
  price: number;
  quantity: number;
  image?: string;
  selectedSize?: string;
  selectedCrust?: string;
  addedToppings?: string[];
  removedIngredients?: string[];
  customDetails?: CustomPizzaState;
  specialInstructions?: string;
}

export type OrderStatus = 
  | 'received'
  | 'preparing_dough'
  | 'wood_firing'
  | 'quality_check'
  | 'out_for_delivery'
  | 'ready_for_pickup'
  | 'completed';

export interface Order {
  orderId: string;
  createdAt: string;
  type: 'delivery' | 'pickup';
  customerName: string;
  phone: string;
  address?: string;
  pickupTime?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  deliveryFee: number;
  tip: number;
  total: number;
  status: OrderStatus;
  estimatedMinutes: number;
  estimatedDeliveryTime: string;
  couponApplied?: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: 'main_dining' | 'garden_patio' | 'pizza_counter';
  notes?: string;
  status: 'confirmed';
}
