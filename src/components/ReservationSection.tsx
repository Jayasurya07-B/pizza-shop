import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Check, 
  Sparkles, 
  Wine, 
  Flame, 
  ShieldCheck 
} from 'lucide-react';
import { Reservation } from '../types/pizza';

export const ReservationSection: React.FC = () => {
  const [guests, setGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('7:00 PM');
  const [seatingArea, setSeatingArea] = useState<'main_dining' | 'garden_patio' | 'pizza_counter'>('main_dining');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const timeSlots = [
    '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', 
    '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    const res: Reservation = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone,
      guests,
      date: selectedDate,
      time: selectedTime,
      seatingArea,
      notes,
      status: 'confirmed',
    };

    setConfirmedReservation(res);
  };

  return (
    <section id="reservations" className="py-20 sm:py-28 bg-[#11100f] border-b border-[#2c2825]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#d99a4e] uppercase mb-2">
              <span>Dine Under The Hearth</span>
              <span className="text-[#574e45]">·</span>
              <span>Table Bookings</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fbfaf8]">
              Reserve Your Table at Fiamma
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#a89d90]">
              Experience wood-fired pizzas pulled piping hot from our stone oven, paired with 
              Campanian natural wines and craft Italian aperitivi.
            </p>
          </div>

          {confirmedReservation ? (
            /* Confirmation Card */
            <div className="bg-[#181614] border border-[#d99a4e]/40 rounded-2xl p-8 sm:p-10 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e] mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#d99a4e]">
                  Confirmation Code: {confirmedReservation.id}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  Tavolo Confermato, {confirmedReservation.name}!
                </h3>
                <p className="text-sm text-[#a89d90] mt-2">
                  We look forward to welcoming you to the hearth. A confirmation email and SMS 
                  have been sent to {confirmedReservation.email}.
                </p>
              </div>

              <div className="bg-[#1f1b18] border border-[#2e2924] rounded-xl p-5 max-w-md mx-auto grid grid-cols-2 gap-4 text-left text-xs">
                <div>
                  <span className="text-[#8c8275] block">Date & Time</span>
                  <span className="font-medium text-white text-sm">
                    {confirmedReservation.date} @ {confirmedReservation.time}
                  </span>
                </div>
                <div>
                  <span className="text-[#8c8275] block">Party Size</span>
                  <span className="font-medium text-white text-sm">
                    {confirmedReservation.guests} Guests
                  </span>
                </div>
                <div>
                  <span className="text-[#8c8275] block">Seating Preference</span>
                  <span className="font-medium text-white capitalize text-sm">
                    {confirmedReservation.seatingArea.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-[#8c8275] block">Location</span>
                  <span className="font-medium text-white text-sm">
                    428 Artisan Way
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setConfirmedReservation(null)}
                className="px-6 py-2.5 bg-[#26221f] hover:bg-[#332e29] text-xs font-medium text-white rounded-md transition-colors cursor-pointer"
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form 
              onSubmit={handleSubmit}
              className="bg-[#181614] border border-[#2d2824] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6"
            >
              
              {/* Row 1: Party Size & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e] block mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Party Size</span>
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuests(num)}
                        className={`py-2 text-xs font-mono font-medium rounded-md border transition-all cursor-pointer ${
                          guests === num
                            ? 'border-[#c94a29] bg-[#c94a29] text-white shadow-sm'
                            : 'border-[#2d2824] bg-[#1d1a18] text-[#a89d90] hover:text-white hover:border-[#423a33]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e] block mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reservation Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="w-full bg-[#1d1a18] border border-[#2d2824] rounded-md px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#c94a29]"
                  />
                </div>
              </div>

              {/* Row 2: Time Slots */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e] block mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Seating Time</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {timeSlots.map(time => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 text-xs font-medium rounded-md border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#c94a29] bg-[#c94a29] text-white shadow-sm'
                            : 'border-[#2d2824] bg-[#1d1a18] text-[#a89d90] hover:text-white hover:border-[#423a33]'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Seating Atmosphere Preference */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#d99a4e] block mb-2">
                  Seating Ambiance
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'main_dining', name: 'Main Dining Hall', desc: 'Warm rustic candlelight & low hum' },
                    { id: 'garden_patio', name: 'Heated Pergola Garden', desc: 'Bistro lighting & open air terrace' },
                    { id: 'pizza_counter', name: 'Oven Chef’s Counter', desc: 'Front-row view of the 900°F hearth' },
                  ].map(area => {
                    const isSelected = seatingArea === area.id;
                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setSeatingArea(area.id as any)}
                        className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#c94a29] bg-[#c94a29]/10 text-white'
                            : 'border-[#2d2824] bg-[#1d1a18] text-[#a89d90] hover:border-[#423a33]'
                        }`}
                      >
                        <div className="font-semibold text-xs text-white">{area.name}</div>
                        <div className="text-[11px] text-[#8c8275] mt-1">{area.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-[11px] text-[#8c8275] block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Marco Rossi"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-[#1d1a18] border border-[#2d2824] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c94a29]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#8c8275] block mb-1">Email (For confirmation) *</label>
                  <input
                    type="email"
                    required
                    placeholder="marco@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#1d1a18] border border-[#2d2824] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c94a29]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#8c8275] block mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 728-1920"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-[#1d1a18] border border-[#2d2824] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c94a29]"
                  />
                </div>
              </div>

              {/* Row 5: Special requests */}
              <div>
                <label className="text-[11px] text-[#8c8275] block mb-1">
                  Special Notes or Celebrations (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Anniversary dinner, high chair needed, dietary allergies..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full bg-[#1d1a18] border border-[#2d2824] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c94a29]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#c94a29] hover:bg-[#b23d1e] text-white text-sm font-semibold rounded-md transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Table Reservation</span>
                </button>
                <p className="text-[11px] text-[#786e64] text-center mt-2">
                  No cancellation fees. We hold tables for 15 minutes past reserved time.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
