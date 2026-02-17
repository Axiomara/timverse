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
    image: "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FJason_and_Lucia_02_With_Logos_landscape.93ab5523.jpg&w=1920&q=75",
    tags: ["GTA VI", "Rockstar Games", "Gaming", "Rumors", "Open World", "PS5"],
    excerpt: "Internet kembali memanas. Setelah dua tahun dalam keheningan, Rockstar Games dikabarkan siap melepas trailer kedua yang akan mengubah standar industri sekali lagi.",
    content: `
      <p>Antisipasi terhadap <strong>Grand Theft Auto VI</strong> bukan lagi sekadar tren, melainkan sebuah fenomena budaya. Setelah trailer pertamanya memporak-porandakan rekor internet dua tahun silam, kini mata dunia tertuju pada satu pertanyaan besar: <i>Kapan Rockstar akan kembali membuka pintu menuju Leonida?</i></p>
      
      <div class="my-12 p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2rem] border-l-4 border-orange-500 italic text-lg text-zinc-700 dark:text-zinc-300 shadow-sm">
        "Ini bukan tentang kapan gamenya rilis, tapi tentang seberapa jauh Rockstar berani mendorong batasan realisme yang kita kenal selama ini."
      </div>

      <h3>Dinamika 'Bonnie & Clyde' yang Personal</h3>
      <p>Berbeda dengan trailer pertama yang memamerkan kemegahan Vice City dalam balutan hiruk-pikuk media sosial, rumor kuat menyebutkan bahwa trailer kedua akan jauh lebih intim. Kita akan dibawa menyelami hubungan <strong>Jason dan Lucia</strong>.</p>
      
      <p>Rockstar dikabarkan menggunakan teknologi AI mutakhir untuk sistem interaksi karakter. Bukan lagi sekadar dialog statis, melainkan <i>chemistry</i> yang terasa organik—di mana setiap keputusan kecil yang kamu ambil akan memengaruhi bagaimana Jason dan Lucia saling memandang satu sama lain di tengah kekacauan kriminal mereka.</p>
      
      <div class="relative my-16 overflow-hidden rounded-[2.5rem] aspect-[16/9] shadow-2xl group">
        <img src="https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/7680072b25ed8a4869c991f86f78f860.jpg" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="GTA VI Landscape" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Vice City: The Neon Paradise</p>
        </div>
      </div>

      <h3>Revolusi Visual: Lebih dari Sekadar Piksel</h3>
      <p>Bocoran teknis terbaru mengungkapkan bahwa GTA VI akan memperkenalkan sistem <i>Dynamic Weather 2.0</i>. Bayangkan sebuah badai tropis yang tidak hanya terlihat indah secara visual, tetapi juga memengaruhi fisik karakter secara real-time—mulai dari pakaian yang menempel karena kelembapan hingga genangan air yang menguap sesuai suhu lingkungan.</p>
      
      <p>Dengan target rilis musim gugur 2026 yang semakin nyata, trailer kedua ini diprediksi akan menjadi penentu standar baru bagi industri gaming. Rockstar tidak hanya sedang membuat game; mereka sedang membangun dunia yang hidup.</p>
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
},
{
  slug: "gta-vi-manual-development-no-ai",
  category: "Gaming",
  title: "GTA VI Tanpa AI Generatif:",
  titleAccent: "Membangun Dunia dengan Tangan",
  author: "Yuslianson",
  date: "Feb 16, 2026",
  readTime: "6 Min",
  image: "https://cdn1-production-images-kly.akamaized.net/OV_dSiC36o-EBPWcv0oeFy2IyU4=/1280x720/smart/filters:quality(75):strip_icc()/kly-media-production/medias/5471435/original/068830500_1768286938-GTA_6__Dok._Rockstargames_.jpg",
  tags: ["GTA VI", "Rockstar Games", "Take-Two", "Strauss Zelnick", "AI", "Gaming Industry"],
  excerpt: "CEO Take-Two, Strauss Zelnick, menegaskan bahwa Rockstar Games membangun setiap sudut Leonida secara manual, menolak penggunaan AI generatif untuk dunia GTA VI.",
  content: `
    <p>Di tengah gempuran teknologi kecerdasan buatan yang mulai merambah industri kreatif, Rockstar Games memilih jalur yang berbeda untuk mahakarya terbarunya. CEO Take-Two Interactive, <strong>Strauss Zelnick</strong>, secara eksplisit menyatakan bahwa <strong>GTA VI</strong> dibangun tanpa campur tangan AI generatif dalam pembentukan dunianya.</p>
    
    <div class="my-12 p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2.5rem] border-l-4 border-pink-500 italic text-xl text-zinc-800 dark:text-zinc-200 shadow-sm leading-relaxed">
      "Dunia mereka dibuat dengan tangan. Itulah yang membedakan mereka. Khususnya terkait GTA VI, Generative AI sama sekali tidak berperan dalam apa yang sedang dibangun oleh Rockstar Games."
    </div>

    <h3>Filosofi 'Handmade' Rockstar</h3>
    <p>Rockstar Games telah lama dikenal sebagai pengembang yang memiliki standar ketelitian gila-gilaan. Penegasan Zelnick ini muncul sebagai respons atas kekhawatiran investor pasca pengumuman <i>Project Genie</i> dari Google sebuah alat AI yang mampu menciptakan dunia virtual secara otomatis.</p>
    
    <p>Bagi Rockstar, setiap jengkal aspal di Vice City, setiap bayangan gedung di Leonida, hingga ekosistem rawa yang kompleks, dikerjakan secara manual oleh tim pengembang. Zelnick menekankan bahwa dunia GTA VI tidak dihasilkan secara prosedural, melainkan melalui sentuhan manusia yang mendalam untuk memastikan otentisitas pengalaman bermain.</p>
    
    <div class="relative my-16 overflow-hidden rounded-[3rem] aspect-video shadow-2xl group bg-zinc-900">
      <img src="https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/7680072b25ed8a4869c991f86f78f860.jpg" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" alt="GTA VI Detail" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10">
          <p class="text-pink-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Exclusive Insight</p>
          <h4 class="text-white text-2xl font-black uppercase italic italic">Detail Tanpa Kompromi</h4>
      </div>
    </div>

    <h3>AI Sebagai Alat, Bukan Kreator</h3>
    <p>Meskipun menolak AI generatif untuk membangun dunia, Take-Two tidak sepenuhnya menutup mata terhadap teknologi. Zelnick mengungkapkan bahwa perusahaan telah lama mengintegrasikan <i>machine learning</i> untuk efisiensi produksi dan operasional di balik layar.</p>
    
    <p>Namun, ia memberikan garis tegas antara "alat" dan "kreativitas". Menurutnya, teknologi hanyalah pendukung, sementara kreator manusia tetap menjadi pusat dari pengalaman hiburan. "Alat bukanlah pengalaman hiburan. Para kreator menggunakan alat untuk menciptakan hiburan yang hebat," jelasnya.</p>
    
    <p>Dengan jadwal rilis yang semakin dekat pada <strong>19 November 2026</strong>, komitmen Rockstar untuk tetap menggunakan metode tradisional yang teliti ini menjanjikan kualitas yang melampaui ekspektasi industri manapun saat ini.</p>
  `
},
];