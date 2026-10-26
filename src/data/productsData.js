/**
 * Mock Product Database for SHRI METRO PRODUCTS
 * Categories:
 * - Plastic Chairs (Armrest)
 * - Plastic Chairs (Armless)
 * - Center Tables
 * - Dining Tables
 * - Stools
 * - Patlas
 */

export const productsData = [
  {
    id: "smp-001",
    name: "Metro Royal Elegance Armchair",
    category: "Plastic Chairs (Armrest)",
    modelCode: "SMP-CHR-901A",
    description: "Ergonomically engineered premium arm chair with rattan weave textured backrest and reinforced arm supports. Built for heavy-duty banquet, veranda, and office visitor seating.",
    image: "https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=800&q=80",
    dimensions: "H: 880mm x W: 580mm x D: 560mm",
    weightCapacity: "200 kg tested",
    material: "100% Virgin Polypropylene",
    colors: [
      { name: "Teak Wood", hex: "#5C3A21" },
      { name: "Marble Beige", hex: "#EADCC9" },
      { name: "Royal Blue", hex: "#1E3A8A" },
      { name: "Jet Black", hex: "#18181B" }
    ],
    isStackable: true,
    stackingLimit: "Up to 8 Units",
    isFeatured: true,
    warranty: "1 Year Commercial",
    suitableFor: "Indoor / Outdoor / Banquets"
  },
  {
    id: "smp-002",
    name: "Metro Comfort Grand Armchair",
    category: "Plastic Chairs (Armrest)",
    modelCode: "SMP-CHR-850A",
    description: "Classic high-back solid plastic armchair with ventilation slots and anti-slip rubber pads on legs. Highly popular for domestic dining and commercial tent-house rentals.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    dimensions: "H: 860mm x W: 560mm x D: 540mm",
    weightCapacity: "185 kg tested",
    material: "100% Virgin Polypropylene",
    colors: [
      { name: "Marble Blue", hex: "#1E40AF" },
      { name: "Ivory White", hex: "#F5F5DC" },
      { name: "Terracotta Red", hex: "#9E3A24" }
    ],
    isStackable: true,
    stackingLimit: "Up to 10 Units",
    isFeatured: false,
    warranty: "1 Year Commercial",
    suitableFor: "Living Room / Lawn / Events"
  },
  {
    id: "smp-003",
    name: "Metro Sleek Bistro Armless Chair",
    category: "Plastic Chairs (Armless)",
    modelCode: "SMP-CHR-402L",
    description: "Minimalist Scandinavian-inspired armless chair. Features smooth matte finish, contoured lumbar support, and quick-nesting profile for cafes, cafeterias, and auditoriums.",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    dimensions: "H: 820mm x W: 460mm x D: 490mm",
    weightCapacity: "160 kg tested",
    material: "100% Virgin Polypropylene",
    colors: [
      { name: "Mustard Gold", hex: "#D97706" },
      { name: "Slate Grey", hex: "#475569" },
      { name: "Ivory White", hex: "#F8FAFC" },
      { name: "Emerald Green", hex: "#065F46" }
    ],
    isStackable: true,
    stackingLimit: "Up to 12 Units",
    isFeatured: true,
    warranty: "1 Year Commercial",
    suitableFor: "Cafeteria / Study / Dining"
  },
  {
    id: "smp-004",
    name: "Metro Heavy-Duty Banquet Armless Chair",
    category: "Plastic Chairs (Armless)",
    modelCode: "SMP-CHR-310L",
    description: "Rugged ribbed spine chair designed for high traffic event setups, catering firms, and institutional seating. High impact resistance with ultra-compact stacking footprint.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
    dimensions: "H: 840mm x W: 470mm x D: 510mm",
    weightCapacity: "180 kg tested",
    material: "100% Virgin Polypropylene",
    colors: [
      { name: "Teak Brown", hex: "#4A2E18" },
      { name: "Royal Blue", hex: "#1E3A8A" },
      { name: "Granite Red", hex: "#881337" }
    ],
    isStackable: true,
    stackingLimit: "Up to 15 Units",
    isFeatured: false,
    warranty: "1 Year Commercial",
    suitableFor: "Institutions / Catering / Banquets"
  },
  {
    id: "smp-005",
    name: "Metro Deco Glass-Look Center Table",
    category: "Center Tables",
    modelCode: "SMP-TBL-705C",
    description: "Designer molded coffee table with dual-tier utility shelf and elegant printed gloss top effect. Sturdy detachable interlocking legs for effortless transit and assembly.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    dimensions: "H: 480mm x W: 810mm x D: 510mm",
    weightCapacity: "90 kg tested",
    material: "100% Virgin Polypropylene",
    colors: [
      { name: "Teak Wood", hex: "#5C3A21" },
      { name: "Marble Cream", hex: "#EADCC9" },
      { name: "Midnight Black", hex: "#0F172A" }
    ],
    isStackable: false,
    stackingLimit: "Non-Stackable (Knock-Down Legs)",
    isFeatured: true,
    warranty: "1 Year Commercial",
    suitableFor: "Living Room / Lounge / Office Reception"
  },
  {
    id: "smp-006",
    name: "Metro Imperial 6-Seater Dining Table",
    category: "Dining Tables",
    modelCode: "SMP-TBL-906D",
    description: "Heavy gauge rectangular family dining table with cross-ribbed reinforcement underneath to prevent sagging. Features a central parasol hole cover and leveling foot glides.",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    dimensions: "H: 740mm x W: 1400mm x D: 850mm",
    weightCapacity: "150 kg tested",
    material: "100% Virgin Polypropylene",
    colors: [
      { name: "Teak Wood", hex: "#5C3A21" },
      { name: "Marble Beige", hex: "#EADCC9" },
      { name: "Dark Walnut", hex: "#3B2219" }
    ],
    isStackable: false,
    stackingLimit: "Detachable Legs (Knock-Down)",
    isFeatured: true,
    warranty: "2 Years Structural",
    suitableFor: "Dining Halls / Restaurants / Homes"
  },
  {
    id: "smp-007",
    name: "Metro Quad 4-Seater Square Dining Table",
    category: "Dining Tables",
    modelCode: "SMP-TBL-604S",
    description: "Compact 4-seater square plastic dining table tailored for modern apartments, balcony dining, food courts, and resort poolside seating.",
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80",
    dimensions: "H: 730mm x W: 900mm x D: 900mm",
    weightCapacity: "120 kg tested",
    material: "100% Virgin Polypropylene",
    colors: [
      { name: "Marble Beige", hex: "#EADCC9" },
      { name: "Royal Blue", hex: "#1E3A8A" },
      { name: "Pure White", hex: "#FFFFFF" }
    ],
    isStackable: false,
    stackingLimit: "Detachable Legs (Knock-Down)",
    isFeatured: false,
    warranty: "1 Year Commercial",
    suitableFor: "Patio / Balcony / Food Courts"
  },
  {
    id: "smp-008",
    name: "Metro Sturdy Round Heavy Stool",
    category: "Stools",
    modelCode: "SMP-STL-201R",
    description: "Heavy duty circular utility stool with center finger grip hole for swift movement. Wide-stance conical legs prevent tipping under heavy industrial loads.",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    dimensions: "H: 460mm x W: 330mm x D: 330mm",
    weightCapacity: "175 kg tested",
    material: "100% Virgin Polypropylene",
    colors: [
      { name: "Bright Red", hex: "#DC2626" },
      { name: "Royal Blue", hex: "#1E3A8A" },
      { name: "Teak Brown", hex: "#4A2E18" },
      { name: "Forest Green", hex: "#166534" }
    ],
    isStackable: true,
    stackingLimit: "Up to 20 Units",
    isFeatured: true,
    warranty: "1 Year Commercial",
    suitableFor: "Workshops / Kitchens / Retail Counters"
  },
  {
    id: "smp-009",
    name: "Metro Grip Anti-Skid Large Patla",
    category: "Patlas",
    modelCode: "SMP-PTL-101L",
    description: "Traditional broad low-height seating patla with textured anti-skid rubber feet and non-slip top surface. Impervious to hot water, soaps, and high humidity.",
    image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80",
    dimensions: "H: 220mm x W: 360mm x D: 280mm",
    weightCapacity: "150 kg tested",
    material: "100% Virgin Polypropylene",
    colors: [
      { name: "Sky Blue", hex: "#0284C7" },
      { name: "Crimson Red", hex: "#B91C1C" },
      { name: "Pastel Pink", hex: "#F472B6" },
      { name: "Ivory White", hex: "#F5F5DC" }
    ],
    isStackable: true,
    stackingLimit: "Up to 15 Units",
    isFeatured: false,
    warranty: "1 Year Commercial",
    suitableFor: "Bathrooms / Pooja Rooms / Low Seating"
  },
  {
    id: "smp-010",
    name: "Metro Compact Utility Mini Patla",
    category: "Patlas",
    modelCode: "SMP-PTL-102M",
    description: "Lightweight, ultra-durable compact bathroom and laundry stool with high rib density for extreme rigidity. Moulded from 100% first-grade virgin plastic granules.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    dimensions: "H: 160mm x W: 310mm x D: 230mm",
    weightCapacity: "130 kg tested",
    material: "100% Virgin Polypropylene",
    colors: [
      { name: "Royal Blue", hex: "#1E3A8A" },
      { name: "Coral Orange", hex: "#EA580C" },
      { name: "Slate Grey", hex: "#475569" }
    ],
    isStackable: true,
    stackingLimit: "Up to 25 Units",
    isFeatured: false,
    warranty: "1 Year Commercial",
    suitableFor: "Kids Seating / Bathroom / Washing"
  }
];

export const productCategories = [
  "All Products",
  "Plastic Chairs (Armrest)",
  "Plastic Chairs (Armless)",
  "Center Tables",
  "Dining Tables",
  "Stools",
  "Patlas"
];

export default productsData;
