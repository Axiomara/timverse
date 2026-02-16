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
  slug: "avengers-doomsday-trailer-rumors-2026",
  category: "Movies",
  title: "Trailer Perdana Avengers: Doomsday",
  titleAccent: "Masih Menunggu Berbulan-bulan Lagi?",
  author: "Popverse Editorial",
  date: "Feb 16, 2026",
  readTime: "7 Min",
  image: "https://sm.mashable.com/t/mashable_id/photo/default/avengersdoomsdaylogo_q8f2.1248.jpg",
  tags: ["Avengers", "Doomsday", "Marvel", "MCU", "Russo Brothers", "Robert Downey Jr"],
  excerpt: "Meskipun empat cuplikan karakter telah dirilis, Russo Brothers mengonfirmasi bahwa trailer resmi Avengers: Doomsday belum akan hadir dalam waktu dekat.",
  content: `
    <p>Marvel Studios telah memberikan empat "kilasan" awal dari <strong>Avengers: Doomsday</strong> melalui teaser fokus karakter yang dirilis pada Desember dan Januari lalu. Cuplikan tersebut memperlihatkan nasib Steve Rogers, Thor, X-Men, Wakanda, hingga Fantastic Four. Namun, menurut Russo Brothers, itu semua bukanlah trailer resmi.</p>
    
    <p>Duo sutradara ini menegaskan bahwa cuplikan-cuplikan tersebut hanyalah "cerita dan petunjuk," bukan kampanye pemasaran utama. Hal ini membuat dunia masih menunggu trailer perdana yang sesungguhnya.</p>
    
    <div class="my-12 md:my-20 not-prose w-full full-bleed-mobile">
      <div class="relative w-full overflow-hidden rounded-2xl md:rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-zinc-100 dark:border-zinc-800 bg-black aspect-video will-change-transform" style="transform: translateZ(0);">
        <iframe 
          class="absolute top-0 left-0 w-full h-full border-0"
          src="https://www.youtube.com/embed/jmM1BRu4hSw?rel=0&modestbranding=1&autohide=1" 
          title="Marvel Studios' Avengers: Doomsday Reveal"
          loading="eager" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
          style="backface-visibility: hidden; -webkit-backface-visibility: hidden;"
        ></iframe>
      </div>
      <div class="mt-8 flex items-center justify-center gap-4 opacity-40">
        <div class="h-[1px] w-12 bg-zinc-400 dark:bg-zinc-600"></div>
        <p class="text-[9px] md:text-[10px] text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-[0.4em] italic text-center whitespace-nowrap">
          SDCC Official: Dr. Doom Reveal
        </p>
        <div class="h-[1px] w-12 bg-zinc-400 dark:bg-zinc-600"></div>
      </div>
    </div>

    <h3>Belajar dari Sejarah Marketing Marvel</h3>
    <p>Melihat rekam jejak Marvel Studios, film Avengers biasanya baru memulai kampanye pemasaran besar-besaran sekitar lima hingga tujuh bulan sebelum tanggal rilis. Dengan jadwal rilis <strong>18 Desember 2026</strong>, <i>Doomsday</i> berada di wilayah yang belum pernah dijelajahi Marvel sebelumnya.</p>
    
    <p>Berikut adalah perbandingan jeda waktu trailer film Avengers sebelumnya:</p>
    <ul class="space-y-2 my-6">
      <li class="flex items-center gap-3">
        <span class="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
        <span><strong>The Avengers (2012):</strong> Trailer dirilis 206 hari sebelum tayang.</span>
      </li>
      <li class="flex items-center gap-3">
        <span class="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
        <span><strong>Infinity War (2018):</strong> Trailer dirilis 156 hari sebelum tayang.</span>
      </li>
      <li class="flex items-center gap-3">
        <span class="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
        <span><strong>Endgame (2019):</strong> Memperpendek jarak menjadi hanya 140 hari.</span>
      </li>
    </ul>

    <h3>Prediksi: Trailer Baru Akan Hadir Musim Panas Ini</h3>
    <p>Strategi Marvel menunjukkan bahwa kampanye <i>Doomsday</i> kemungkinan besar baru akan dimulai secara serius pada musim panas tahun ini (sekitar pertengahan tahun 2026).</p>
  `
}
];