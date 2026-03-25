export interface TrendingPost {
  id: number;
  kategori: string;
  judul: string;
  ringkasan: string;
  gambar: string;
  tanggal: string;
  waktuBaca: string;
  views: string;
}

export const trendingPosts: TrendingPost[] = [
  {
    id: 1,
    kategori: "Technology",
    judul: "Artificial Intelligence: Ancaman atau Peluang untuk Papua?",
    ringkasan: "Seiring masifnya perkembangan AI global, talenta muda Papua mulai mempersiapkan diri menghadapi era disruptif dengan membangun komunitas pengembang lokal...",
    gambar: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80",
    tanggal: "25 Mar 2026",
    waktuBaca: "5 menit",
    views: "125K"
  },
  {
    id: 2,
    kategori: "Economy",
    judul: "Pusat UMKM Baru di Timika Berhasil Raup Omzet Fantastis",
    ringkasan: "Pembangunan pusat inkubasi bisnis bagi pengusaha lokal Mimika menunjukkan hasil positif dengan peningkatan penjualan komoditas lokal yang menembus pasar nasional...",
    gambar: "https://images.unsplash.com/photo-1556740749-887f6717defa?auto=format&fit=crop&q=80",
    tanggal: "24 Mar 2026",
    waktuBaca: "4 menit",
    views: "98K"
  },
  {
    id: 3,
    kategori: "Culture",
    judul: "Seni Ukir Asmat Memukau Pameran Seni Eksklusif di Eropa",
    ringkasan: "Sebuah pengakuan internasional bagi karya seni luhur Papua, di mana puluhan masterpiece ukiran kayu khas pesisir selatan dipamerkan secara besar-besaran...",
    gambar: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?auto=format&fit=crop&q=80",
    tanggal: "22 Mar 2026",
    waktuBaca: "7 menit",
    views: "85K"
  },
  {
    id: 4,
    kategori: "Sports",
    judul: "Papua Tengah Siap Jadi Tuan Rumah Kejuaraan Atletik Nasional 2026",
    ringkasan: "Fasilitas olahraga standar internasional di Mimika Sport Complex kembali menjadi arena utama untuk menjaring bibit-bibit atlet berprestasi masa depan Indonesia...",
    gambar: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80",
    tanggal: "20 Mar 2026",
    waktuBaca: "3 menit",
    views: "72K"
  }
];

export const trendingCategories = ["All Topics", "Technology", "Economy", "Culture", "Sports"];
