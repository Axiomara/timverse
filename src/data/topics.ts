// src/data/topics.ts
import { Film, Gamepad2, Music, Laptop, Trophy, Landmark, TrendingUp, HeartPulse, Plane, Utensils } from "lucide-react";

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
    id: "movies",
    name: "Movies",
    slug: "movies",
    icon: Film,
    description: "Ulasan, berita, dan wawasan terdalam dari dunia perfilman dan sinema global.",
    coverImage: "https://images7.alphacoders.com/107/1079478.jpg",
    postCount: 12
  },
  {
    id: "gaming",
    name: "Games",
    slug: "gaming",
    icon: Gamepad2,
    description: "Update terbaru, rumor, dan review eksklusif industri video games.",
    coverImage: "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FJason_and_Lucia_02_With_Logos_landscape.93ab5523.jpg&w=1920&q=75",
    postCount: 8
  },
  {
    id: "music",
    name: "Music",
    slug: "music",
    icon: Music,
    description: "Eksplorasi industri musik modern, teknologi sound, hingga musisi pendatang baru.",
    coverImage: "https://picsum.photos/seed/musicai/1200/600",
    postCount: 5
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
  }
];
