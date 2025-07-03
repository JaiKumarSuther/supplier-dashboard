export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string; // We'll use emojis or SVG icons as placeholders
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Hotel",
    description: "List your hotel, lodge, homestay or guesthouse",
    icon: "🏨",
  },
  {
    id: 2,
    name: "Tour operator",
    description: "Offer guided multi-day tours, treks, and expeditions",
    icon: "🗺️",
  },
  {
    id: 3,
    name: "Activity operator",
    description: "Provide activities like rafting, paragliding, or skiing",
    icon: "🎿",
  },
  {
    id: 4,
    name: "Rental provider",
    description: "Rent out cars, bikes, or other vehicles to travelers",
    icon: "🚗",
  },
  {
    id: 5,
    name: "Tour guide",
    description: "Register as a guide & offer guided experiences",
    icon: "👨‍🏫",
  },
];
