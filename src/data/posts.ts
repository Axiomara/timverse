// src/data/posts.ts

export interface Post {
  slug: string;
  category: string;
  title: string;
  titleAccent: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
  tags: string[]; 
}

export const BLOG_POSTS: Post[] = [
  {
    slug: "marvel-cinematic-universe-phase-7",
    category: "Movies",
    title: "Marvel Cinematic Universe Phase 7:",
    titleAccent: "The Mutant Era",
    author: "Scott Summers",
    date: "Feb 16, 2026",
    readTime: "8 Min",
    image: "https://images7.alphacoders.com/107/1079478.jpg",
    tags: ["Marvel", "MCU", "Superhero", "X-Men", "Movies", "Cinematic"],
    excerpt: "Setelah satu dekade penuh antisipasi, Kevin Feige akhirnya mengonfirmasi bahwa mutan akan menjadi poros utama dalam masa depan MCU.",
    content: `
      <p>Dunia pahlawan super akan mengalami pergeseran tektonik yang tak terelakkan. Dalam presentasi mendadak di Hall H pagi ini, Kevin Feige secara resmi mengumumkan bahwa Phase 7 akan bertajuk <strong>"The Mutant Era"</strong>.</p>
      
      <h3>Kebangkitan X-Gene</h3>
      <p>Berbeda dengan pendekatan di fase-fase sebelumnya di mana mutan hanya muncul sebagai cameo atau referensi samar, Phase 7 akan menempatkan X-Gene sebagai elemen sentral dalam narasi global. "Kami ingin mengeksplorasi apa artinya menjadi 'berbeda' di dunia yang sudah terbiasa dengan Avengers," ujar Feige.</p>
      
      <p>Fokus utama akan beralih dari ancaman kosmik antar dimensi menuju konflik sosial dan politik yang terjadi di bumi. Ini membawa kita kembali ke akar komik X-Men yang legendaris.</p>
      
      <h3>Sekolah Baru untuk Generasi Baru</h3>
      <p>Salah satu bocoran yang paling membuat penggemar histeris adalah konfirmasi pembangunan Xavier Institute for Higher Learning di Westchester. Kabarnya, tim X-Men pertama tidak akan langsung berisi nama-nama besar, melainkan sekumpulan remaja berbakat.</p>
    `
  },
  {
    slug: "gta-vi-trailer-2-rumors",
    category: "Gaming",
    title: "GTA VI Trailer 2:",
    titleAccent: "Coming Sooner Than Expected?",
    author: "Popverse Team",
    date: "Feb 18, 2026",
    readTime: "5 Min",
    image: "https://picsum.photos/seed/gta6/1200/600",
    tags: ["GTA VI", "Rockstar Games", "Gaming", "Rumors", "Open World", "PS5"],
    excerpt: "Rumor terbaru mengenai trailer kedua GTA VI mulai membanjiri internet. Apakah Rockstar siap memberikan kejutan besar?",
    content: `
      <p>Antisipasi terhadap Grand Theft Auto VI telah mencapai titik didih. Setelah trailer pertama memecahkan rekor dunia di YouTube dua tahun lalu, para penggemar kini mencari petunjuk mengenai keberadaan trailer kedua.</p>
      
      <h3>Fokus pada Dinamika Jason dan Lucia</h3>
      <p>Jika trailer pertama memberikan kita pandangan luas tentang Vice City, rumor mengatakan bahwa trailer kedua akan jauh lebih personal. Kita akan melihat lebih dalam dinamika hubungan "Bonnie & Clyde" antara Jason dan Lucia.</p>
      
      <h3>Teknologi Rendering yang Gila</h3>
      <p>Bocoran teknis menunjukkan bahwa GTA VI akan memperkenalkan sistem cuaca dinamis yang sangat kompleks—dari badai tropis hingga kelembapan yang memengaruhi visual karakter secara real-time.</p>
    `
  },
  {
    slug: "the-future-of-ai-music",
    category: "Music",
    title: "AI in Music Production:",
    titleAccent: "Threat or Tool?",
    author: "Alex Rivera",
    date: "Feb 20, 2026",
    readTime: "6 Min",
    image: "https://picsum.photos/seed/musicai/1200/600",
    tags: ["Music", "AI", "Technology", "Production", "Future", "Industry"],
    excerpt: "Bagaimana kecerdasan buatan mendefinisikan ulang cara musisi menciptakan karya di tahun 2026.",
    content: `
      <p>Industri musik sedang berada di persimpangan jalan. Teknologi AI generatif kini mampu menciptakan komposisi simfoni yang rumit hanya dalam hitungan detik.</p>
      
      <h3>Kolaborasi Manusia dan Mesin</h3>
      <p>Banyak produser ternama mulai mengadopsi AI bukan untuk menggantikan kreativitas, melainkan sebagai asisten untuk mengeksplorasi progresi akord yang tidak biasa.</p>
      
      <h3>Masalah Hak Cipta</h3>
      <p>Namun, tantangan terbesar tetaplah pada regulasi hak cipta suara. Bagaimana hukum melindungi identitas vokal seorang artis dari replikasi digital?</p>
    `
  },
  {
    slug: "the-future-of-ai-music",
    category: "Music",
    title: "AI in Music Production:",
    titleAccent: "Threat or Tool?",
    author: "Alex Rivera",
    date: "Feb 20, 2026",
    readTime: "6 Min",
    image: "https://picsum.photos/seed/musicai/1200/600",
    tags: ["Music", "AI", "Technology", "Production", "Future", "Industry"],
    excerpt: "Bagaimana kecerdasan buatan mendefinisikan ulang cara musisi menciptakan karya di tahun 2026.",
    content: `
      <p>Industri musik sedang berada di persimpangan jalan. Teknologi AI generatif kini mampu menciptakan komposisi simfoni yang rumit hanya dalam hitungan detik.</p>
      
      <h3>Kolaborasi Manusia dan Mesin</h3>
      <p>Banyak produser ternama mulai mengadopsi AI bukan untuk menggantikan kreativitas, melainkan sebagai asisten untuk mengeksplorasi progresi akord yang tidak biasa.</p>
      
      <h3>Masalah Hak Cipta</h3>
      <p>Namun, tantangan terbesar tetaplah pada regulasi hak cipta suara. Bagaimana hukum melindungi identitas vokal seorang artis dari replikasi digital?</p>
    `
  }
];