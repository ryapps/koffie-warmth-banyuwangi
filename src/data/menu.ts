import type { MenuCategory } from "@/types";

export const menu: MenuCategory[] = [
  {
    id: "coffee",
    label: "KOPI",
    icon: "Coffee",
    items: [
      {
        name: "Signature Espresso",
        price: "Rp 28.000",
        description: "Single origin, double shot, crema lembut",
        badge: "PALING DICARI",
        image:
          "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80",
        featured: true,
      },
      {
        name: "Ethiopian Pour Over",
        price: "Rp 42.000",
        description: "Yirgacheffe, cerah & floral, sentuhan melati",
        badge: "SINGLE ORIGIN",
        image:
          "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=80",
        featured: true,
      },
      {
        name: "Cold Brew Reserve",
        price: "Rp 48.000",
        description: "Diseduh 18 jam, disajikan dengan es ukir",
        badge: "MUSIMAN",
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
        featured: true,
      },
      {
        name: "Flat White",
        price: "Rp 35.000",
        description: "Basis ristretto, micro-foam susu sutra",
      },
      {
        name: "Amber Latte",
        price: "Rp 42.000",
        description: "Espresso house, susu oat, drizzle madu emas",
      },
      {
        name: "Cortado",
        price: "Rp 32.000",
        description: "Espresso dan susu hangat seimbang, berani",
      },
      {
        name: "Matcha Ceremonial",
        price: "Rp 45.000",
        description: "Matcha Jepang grade A, susu oat, madu",
      },
    ],
  },
  {
    id: "breakfast",
    label: "SARAPAN",
    icon: "Sun",
    items: [
      {
        name: "Smashed Avocado Toast",
        price: "Rp 78.000",
        description: "Sourdough, feta kocok, telur poach, cabai kering",
        badge: "FAVORIT PAGI",
        image:
          "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
        featured: true,
      },
      {
        name: "Croissant French Toast",
        price: "Rp 85.000",
        description: "Croissant butter, custard, sirup maple",
        image:
          "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80",
        featured: true,
      },
      {
        name: "Granola Bowl",
        price: "Rp 62.000",
        description: "Granola house, buah musiman, yoghurt kelapa",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
        featured: true,
      },
      {
        name: "Eggs Your Way",
        price: "Rp 72.000",
        description: "Telur ayam kampung, sourdough, tomat panggang",
      },
      {
        name: "Nasi Goreng KOFFIE",
        price: "Rp 68.000",
        description: "Resep rumahan, telur mata sapi, kerupuk",
      },
    ],
  },
  {
    id: "evening",
    label: "MALAM",
    icon: "Moon",
    items: [
      {
        name: "Charcuterie Board",
        price: "Rp 145.000",
        description: "Keju tua, daging asap, selai fig, kerupuk",
        badge: "UNTUK BERDUA",
        image:
          "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=900&q=80",
        featured: true,
      },
      {
        name: "Natural Wine Glass",
        price: "Rp 95.000",
        description: "Pilihan bergantian, tanya barista kami",
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80",
        featured: true,
      },
      {
        name: "Mezze Plate",
        price: "Rp 110.000",
        description: "Hummus, zaitun, paprika panggang, flatbread",
        image:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
        featured: true,
      },
    ],
  },
  {
    id: "pastries",
    label: "PASTRI",
    icon: "Cookie",
    items: [
      {
        name: "Almond Croissant",
        price: "Rp 38.000",
        description: "Dipanggang dua kali, isi frangipane, taburan almond",
        badge: "FAVORIT",
        image:
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
        featured: true,
      },
      {
        name: "Cardamom Knot",
        price: "Rp 32.000",
        description: "Resep house, ala Swedia, glaze gula",
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
        featured: true,
      },
      {
        name: "Lemon Tart",
        price: "Rp 42.000",
        description: "Pâte sablée, curd lemon, meringue panggang",
        image:
          "https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&w=900&q=80",
        featured: true,
      },
    ],
  },
];
