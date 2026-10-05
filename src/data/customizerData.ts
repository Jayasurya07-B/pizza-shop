import { CustomTopping } from '../types/pizza';

export const DOUGH_OPTIONS = [
  { id: 'dough-sourdough', name: '72h Cold-Fermented Sourdough', price: 0, description: 'Naturally leavened with our 40-year mother culture. Light, airy, blistered crust.' },
  { id: 'dough-wholegrain', name: 'Ancient Stoneground Whole Wheat', price: 1.5, description: 'Nutty, rustic grain profile with crisp blistered cornicione.' },
  { id: 'dough-gf', name: 'Certified Gluten-Friendly Dough', price: 3.5, description: 'Prepared with Italian rice and chickpea flour with high hydration.' },
];

export const SAUCE_OPTIONS = [
  { id: 'sauce-marzano', name: 'San Marzano D.O.P. Red Pomodoro', price: 0, color: '#b91c1c', description: 'Sun-ripened volcanic tomatoes with sea salt & basil.' },
  { id: 'sauce-bianca', name: 'White Garlic & Herb Fonduta', price: 2.0, color: '#fef3c7', description: 'Creamy Taleggio cheese base with roasted garlic.' },
  { id: 'sauce-pesto', name: 'Genovese Basil Pesto Verde', price: 2.5, color: '#15803d', description: 'Pine nuts, aged Parmigiano, garlic and fragrant sweet basil.' },
  { id: 'sauce-diavola', name: 'Spicy Arrabbiata Chili Pomodoro', price: 1.0, color: '#991b1b', description: 'San Marzano infused with fiery Calabrian peperoncino.' },
  { id: 'sauce-oil', name: 'Olive Oil Bianco & Sea Salt (No Sauce)', price: 0, color: '#fef9c3', description: 'Extra virgin olive oil brush with cracked sea salt.' },
];

export const CHEESE_OPTIONS: CustomTopping[] = [
  { id: 'cheese-mozzarella', name: 'Campania Fior di Latte Mozzarella', category: 'cheese', price: 0, calories: 180, color: '#fef08a' },
  { id: 'cheese-provola', name: 'Smoked Provola Campana', category: 'cheese', price: 2.5, calories: 190, color: '#fde047' },
  { id: 'cheese-burrata', name: 'Creamy Puglia Burrata (Whole Ball)', category: 'cheese', price: 4.5, calories: 240, color: '#fffbeb' },
  { id: 'cheese-gorgonzola', name: 'Gorgonzola Dolce D.O.P.', category: 'cheese', price: 2.5, calories: 210, color: '#cbd5e1' },
  { id: 'cheese-pecorino', name: 'Shaved Pecorino Romano', category: 'cheese', price: 2.0, calories: 150, color: '#fef9c3' },
  { id: 'cheese-vegan', name: 'Artisan Cashew Mozzarella (Dairy-Free)', category: 'cheese', price: 3.0, calories: 140, color: '#fef3c7' },
];

export const MEAT_OPTIONS: CustomTopping[] = [
  { id: 'meat-pepperoni', name: 'Cup-and-Char Artisanal Pepperoni', category: 'meat', price: 3.0, calories: 190, color: '#dc2626' },
  { id: 'meat-nduja', name: 'Spicy Calabrian ’Nduja', category: 'meat', price: 3.5, calories: 210, color: '#b91c1c' },
  { id: 'meat-sausage', name: 'House Fennel Heritage Pork Sausage', category: 'meat', price: 3.0, calories: 180, color: '#78350f' },
  { id: 'meat-prosciutto', name: '24-Mo Prosciutto di Parma (Post-Oven)', category: 'meat', price: 4.5, calories: 160, color: '#f43f5e' },
  { id: 'meat-porchetta', name: 'Wood-Roasted Herb Porchetta', category: 'meat', price: 3.5, calories: 195, color: '#b45309' },
  { id: 'meat-anchovies', name: 'Cetara Anchovy Fillets in Olive Oil', category: 'meat', price: 2.5, calories: 90, color: '#475569' },
];

export const VEGGIE_OPTIONS: CustomTopping[] = [
  { id: 'veg-mushrooms', name: 'Roasted Portobello & Cremini Funghi', category: 'veggie', price: 2.0, calories: 45, color: '#713f12' },
  { id: 'veg-peppers', name: 'Wood-Fired Sweet Bell Peppers', category: 'veggie', price: 1.5, calories: 35, color: '#ea580c' },
  { id: 'veg-onions', name: 'Caramelized Cipollini Onions', category: 'veggie', price: 1.5, calories: 50, color: '#9a3412' },
  { id: 'veg-olives', name: 'Taggiasca Black Olives', category: 'veggie', price: 2.0, calories: 60, color: '#1e293b' },
  { id: 'veg-artichokes', name: 'Marinated Roman Artichoke Hearts', category: 'veggie', price: 2.5, calories: 55, color: '#4d7c0f' },
  { id: 'veg-arugula', name: 'Baby Wild Arugula (Post-Oven)', category: 'veggie', price: 1.5, calories: 20, color: '#16a34a' },
  { id: 'veg-chilis', name: 'Fresh Calabrian Chili Slivers', category: 'veggie', price: 1.5, calories: 15, color: '#ef4444' },
  { id: 'veg-basil', name: 'Fresh Sweet Genovese Basil Leaves', category: 'veggie', price: 1.0, calories: 10, color: '#22c55e' },
];

export const FINISHER_OPTIONS: CustomTopping[] = [
  { id: 'fin-honey', name: 'Fiamma Hot Wildflower Chili Honey', category: 'finisher', price: 1.5, calories: 70, color: '#f59e0b' },
  { id: 'fin-truffle', name: 'Shaved Black Summer Truffle & Oil', category: 'finisher', price: 5.0, calories: 45, color: '#09090b' },
  { id: 'fin-balsamic', name: '25-Year Modena Aged Balsamic Glaze', category: 'finisher', price: 1.5, calories: 35, color: '#450a0a' },
  { id: 'fin-evoo', name: 'Cold-Pressed Sicilian EVOO Drizzle', category: 'finisher', price: 0, calories: 60, color: '#84cc16' },
  { id: 'fin-maldon', name: 'Flaky Maldon Smoked Sea Salt', category: 'finisher', price: 0, calories: 0, color: '#f8fafc' },
];
