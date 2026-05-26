export type ImageItem = {
  id: string;
  title: string;
  creator: string;
  category: string;
  description: string;
  colors: [string, string, string];
  aspect: string;
  saves: string;
  views: string;
  tags: string[];
};

export const topicFilters = [
  "Editorial",
  "Interiors",
  "Street",
  "Objects",
  "Brand",
  "Travel",
  "Color",
  "Architecture",
];

export const imageItems: ImageItem[] = [
  {
    id: "black-frame-studio",
    title: "Black Frame Studio",
    creator: "Mira Chen",
    category: "Editorial",
    description:
      "A sharp studio reference built around high contrast, compact framing, and graphic negative space.",
    colors: ["#111111", "#f5c400", "#f6f1df"],
    aspect: "aspect-[4/5]",
    saves: "12.4k",
    views: "84k",
    tags: ["contrast", "studio", "layout", "yellow"],
  },
  {
    id: "signal-kitchen",
    title: "Signal Kitchen",
    creator: "Noah Vale",
    category: "Interiors",
    description:
      "A blocky interior board with hard edges, warm utility details, and a practical material palette.",
    colors: ["#f5c400", "#151515", "#d9d1bd"],
    aspect: "aspect-[3/4]",
    saves: "8.1k",
    views: "62k",
    tags: ["interiors", "utility", "wood", "grid"],
  },
  {
    id: "corner-market",
    title: "Corner Market",
    creator: "Aya Morgan",
    category: "Street",
    description:
      "Urban signage, deep blacks, and a strict rectangular crop for city reference boards.",
    colors: ["#202020", "#f4f4ef", "#f2b900"],
    aspect: "aspect-[5/7]",
    saves: "15.9k",
    views: "109k",
    tags: ["street", "signage", "city", "crop"],
  },
  {
    id: "object-index",
    title: "Object Index",
    creator: "Sana Park",
    category: "Objects",
    description:
      "Collected product shapes arranged as a clean index of rectangles, labels, and quiet spacing.",
    colors: ["#f8f8f2", "#0d0d0d", "#e6b900"],
    aspect: "aspect-square",
    saves: "6.7k",
    views: "45k",
    tags: ["objects", "archive", "product", "minimal"],
  },
  {
    id: "yellow-ticket",
    title: "Yellow Ticket",
    creator: "Inez Row",
    category: "Brand",
    description:
      "Bold campaign reference using a single yellow block as the anchor for type and layout.",
    colors: ["#f5c400", "#0a0a0a", "#ffffff"],
    aspect: "aspect-[2/3]",
    saves: "19.2k",
    views: "131k",
    tags: ["brand", "campaign", "type", "poster"],
  },
  {
    id: "north-platform",
    title: "North Platform",
    creator: "Theo Grant",
    category: "Travel",
    description:
      "A travel board with strong horizon lines, station geometry, and restrained color blocking.",
    colors: ["#171717", "#ebe6d7", "#f5c400"],
    aspect: "aspect-[4/3]",
    saves: "5.6k",
    views: "39k",
    tags: ["travel", "station", "horizon", "geometry"],
  },
  {
    id: "archive-wall",
    title: "Archive Wall",
    creator: "Lena Ortiz",
    category: "Architecture",
    description:
      "Facade rhythm, modular walls, and hard-edged reference blocks for architectural collecting.",
    colors: ["#0f0f0f", "#c9c1a9", "#f5c400"],
    aspect: "aspect-[3/5]",
    saves: "10.8k",
    views: "76k",
    tags: ["architecture", "facade", "module", "wall"],
  },
  {
    id: "desk-system",
    title: "Desk System",
    creator: "Jules Hart",
    category: "Objects",
    description:
      "A work surface reference with boxy compartments, precise shadows, and simple tool placement.",
    colors: ["#faf8ef", "#121212", "#e8bd00"],
    aspect: "aspect-[5/4]",
    saves: "7.4k",
    views: "58k",
    tags: ["desk", "tools", "system", "workspace"],
  },
  {
    id: "night-awning",
    title: "Night Awning",
    creator: "Priya Shah",
    category: "Street",
    description:
      "Night street reference with compressed contrast, rectangular awnings, and bright accent signage.",
    colors: ["#080808", "#f5c400", "#303030"],
    aspect: "aspect-[4/6]",
    saves: "13.1k",
    views: "91k",
    tags: ["night", "awning", "street", "sign"],
  },
  {
    id: "grid-lobby",
    title: "Grid Lobby",
    creator: "Owen Lee",
    category: "Interiors",
    description:
      "A lobby moodboard built from grid panels, dark structural lines, and compact yellow wayfinding.",
    colors: ["#1a1a1a", "#e7e0cf", "#f5c400"],
    aspect: "aspect-[4/5]",
    saves: "9.9k",
    views: "73k",
    tags: ["lobby", "grid", "interiors", "wayfinding"],
  },
  {
    id: "cover-study",
    title: "Cover Study",
    creator: "Marin Cole",
    category: "Editorial",
    description:
      "Editorial reference for block type, restrained photography, and a crisp cover system.",
    colors: ["#f7f3e8", "#111111", "#f5c400"],
    aspect: "aspect-[7/10]",
    saves: "17.6k",
    views: "118k",
    tags: ["editorial", "cover", "type", "system"],
  },
  {
    id: "warehouse-line",
    title: "Warehouse Line",
    creator: "Rae Kim",
    category: "Architecture",
    description:
      "Industrial visual reference with repeated bays, deep shadow, and simple color hierarchy.",
    colors: ["#161616", "#b8b09c", "#f5c400"],
    aspect: "aspect-[16/11]",
    saves: "4.8k",
    views: "33k",
    tags: ["industrial", "bays", "shadow", "structure"],
  },
];

export function getImageById(id: string) {
  return imageItems.find((item) => item.id === id) ?? imageItems[0];
}

export function getRelatedImages(id: string) {
  return imageItems.filter((item) => item.id !== id).slice(0, 6);
}
