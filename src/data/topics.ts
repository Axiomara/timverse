// src/data/topics.ts
import { Film, Laptop, Trophy, Landmark, TrendingUp, HeartPulse, Plane, Utensils, BookOpen, Leaf, Coffee, Car } from "lucide-react";

export interface TopicData {
  id: string;
  name: string;
  slug: string;
  icon: any; // Lucide icon component
  description: string;
  coverImage: string;
  postCount: number;
}

export const TOPICS_DATA: TopicData[] = [
  {
    id: "entertainment",
    name: "Hiburan",
    slug: "entertainment",
    icon: Film,
    description: "Ulasan film, kabar dunia video games, tren musik modern, serta budaya pop sosial terkini.",
    coverImage: "https://images7.alphacoders.com/107/1079478.jpg",
    postCount: 25
  },
  {
    id: "tech",
    name: "Tech",
    slug: "tech",
    icon: Laptop,
    description: "Inovasi, gadget terbaru, kecerdasan buatan, dan masa depan teknologi.",
    coverImage: "https://picsum.photos/seed/techfuture/1200/600",
    postCount: 15
  },
  {
    id: "sports",
    name: "Olahraga",
    slug: "sports",
    icon: Trophy,
    description: "Berita terkini, analisis pertandingan, dan sorotan utama dari dunia olahraga global.",
    coverImage: "https://picsum.photos/seed/sportsaction/1200/600",
    postCount: 20
  },
  {
    id: "politics",
    name: "Politik",
    slug: "politics",
    icon: Landmark,
    description: "Dinamika politik terkini, kebijakan pemerintah, dan isu-isu penting masyarakat.",
    coverImage: "https://picsum.photos/seed/politicsnews/1200/600",
    postCount: 18
  },
  {
    id: "economy",
    name: "Ekonomi",
    slug: "economy",
    icon: TrendingUp,
    description: "Tren pasar, investasi, bisnis startup, dan perkembangan finansial global.",
    coverImage: "https://picsum.photos/seed/businessmarket/1200/600",
    postCount: 14
  },
  {
    id: "health",
    name: "Kesehatan",
    slug: "health",
    icon: HeartPulse,
    description: "Tips gaya hidup sehat, penemuan medis, dan panduan kesehatan mental.",
    coverImage: "https://picsum.photos/seed/healthylife/1200/600",
    postCount: 9
  },
  {
    id: "travel",
    name: "Pariwisata",
    slug: "travel",
    icon: Plane,
    description: "Rekomendasi destinasi wisata, panduan jalan-jalan, dan pesona alam nusantara.",
    coverImage: "https://picsum.photos/seed/travelworld/1200/600",
    postCount: 11
  },
  {
    id: "culinary",
    name: "Kuliner",
    slug: "culinary",
    icon: Utensils,
    description: "Eksplorasi cita rasa, resep masakan, dan review restoran terbaik di kota Anda.",
    coverImage: "https://picsum.photos/seed/foody/1200/600",
    postCount: 7
  },
  {
    id: "education",
    name: "Pendidikan",
    slug: "education",
    icon: BookOpen,
    description: "Informasi seputar dunia akademis, beasiswa unggulan, dan pengembangan karir generasi muda.",
    coverImage: "https://picsum.photos/seed/eduu/1200/600",
    postCount: 12
  },
  {
    id: "environment",
    name: "Lingkungan",
    slug: "environment",
    icon: Leaf,
    description: "Terdepan menyoroti isu perubahan iklim, energi terbarukan, dan inisiatif hijau dari seluruh dunia.",
    coverImage: "https://picsum.photos/seed/greenplanet/1200/600",
    postCount: 16
  },
  {
    id: "lifestyle",
    name: "Gaya Hidup",
    slug: "lifestyle",
    icon: Coffee,
    description: "Menjelajahi tren fashion terkini, tips keseharian memukau, hobi, hingga inpirasi desain estetik.",
    coverImage: "https://picsum.photos/seed/lifestylehip/1200/600",
    postCount: 21
  },
  {
    id: "automotive",
    name: "Otomotif",
    slug: "automotive",
    icon: Car,
    description: "Ulasan jujur peluncuran kendaraan masa depan, industri transportasi, dan budaya roda dunia.",
    coverImage: "https://picsum.photos/seed/carspeed/1200/600",
    postCount: 10
  }
];
