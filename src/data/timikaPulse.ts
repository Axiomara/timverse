// src/data/timikaPulse.ts

// Menggabungkan import nilai (BLOG_POSTS) dan tipe (Post) sesuai aturan verbatimModuleSyntax
import { type Post } from "./posts"; 

export const TIMIKA_PULSE_POSTS: Post[] = [
  {
    slug: "update-pembangunan-bandara-mozes-kilangin-2026",
    category: "Infrastruktur",
    title: "Bandara Mozes Kilangin:",
    titleAccent: "Menuju Gerbang Internasional",
    author: "Admin Timika",
    date: "Feb 24, 2026",
    readTime: "6 Min",
    image: "https://voffice.co.id/jakarta-virtual-office/business-tips/wp-content/uploads/2021/04/bandara-timika-mozes-kilangin.jpg",
    tags: ["Timika", "Infrastruktur", "Bandara", "Papua Tengah", "Transportasi"],
    source: "Dishub Mimika",
    excerpt: "Proyek perluasan terminal penumpang Bandara Mozes Kilangin kini memasuki fase finishing dekorasi interior berbasis budaya lokal.",
    content: `
      <p>Wajah transportasi udara di Mimika sedang bersiap untuk transformasi besar. Pembangunan gedung terminal baru di <strong>Bandara Mozes Kilangin</strong> kini telah mencapai progres 92% per Februari 2026.</p>
      
      <div class="my-12 p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2rem] border-l-4 border-pink-500 italic text-lg text-zinc-700 dark:text-zinc-300 shadow-sm">
        "Terminal ini bukan sekadar bangunan beton, tapi representasi identitas suku Amungme dan Kamoro yang menyambut dunia di tanah Papua."
      </div>

      <h3>Sentuhan Ornamen Budaya</h3>
      <p>Salah satu keunikan dari terminal baru ini adalah integrasi ukiran tangan asli seniman lokal pada pilar-pilar utama ruang tunggu. Pemerintah daerah menegaskan bahwa modernisasi tidak boleh meninggalkan nilai-nilai adat.</p>
      
      <h3>Kapasitas Penumpang</h3>
      <p>Dengan selesainya fase ini, bandara diprediksi mampu menampung hingga 1,5 juta penumpang per tahun, meningkat drastis dari kapasitas sebelumnya. Hal ini diharapkan dapat menurunkan harga tiket pesawat melalui penambahan rute maskapai baru.</p>
    `
  },
  {
    slug: "festival-budaya-amungme-kamoro-2026",
    category: "Culture",
    title: "Festival Amungme & Kamoro:",
    titleAccent: "Rayakan Akar Budaya",
    author: "Lukas Kogoya",
    date: "Feb 22, 2026",
    readTime: "5 Min",
    image: "https://koranpapua.id/wp-content/uploads/2023/10/Festival-Budaya-Amungme-Kamoro-2.jpg",
    tags: ["Budaya", "Festival", "Timika", "Papua", "Seni"],
    excerpt: "Ribuan masyarakat berkumpul di Lapangan Pasar Lama untuk menyaksikan pertunjukan tari kolosal dan pameran ukiran kayu warisan leluhur.",
    content: `
      <p>Kabupaten Mimika kembali bergetar dengan suara tifa. Festival tahunan <strong>Amungme & Kamoro</strong> resmi dibuka pagi ini dengan parade perahu hias di wilayah pesisir dan tarian perang di pusat kota.</p>
      
      <h3>Pameran Ukiran Kamoro</h3>
      <p>Tahun ini, sorotan utama tertuju pada pameran ukiran kayu <i>Wemawe</i>. Para kolektor seni internasional dilaporkan hadir untuk melihat langsung proses pembuatan ukiran yang melambangkan penghormatan kepada leluhur.</p>
      
      <p>Bupati Mimika dalam sambutannya menekankan pentingnya bagi generasi muda Timika untuk tetap memegang teguh bahasa ibu di tengah arus modernisasi kota yang semakin cepat.</p>
    `
  },
  {
    slug: "stabilitas-ekonomi-pasar-sentral-timika",
    category: "Economy",
    title: "Ekonomi Lokal Timika:",
    titleAccent: "Harga Pangan Stabil",
    author: "Sarah Wijaya",
    date: "Feb 20, 2026",
    readTime: "4 Min",
    image: "https://fokuspapua.com/wp-content/uploads/2021/10/Pasar-Sentral-Timika.jpg",
    tags: ["Ekonomi", "Pasar", "Timika", "UMKM", "Papua Tengah"],
    excerpt: "Pantauan harga di Pasar Sentral Timika menunjukkan tren stabil pada komoditas pokok meskipun permintaan meningkat menjelang akhir bulan.",
    content: `
      <p>Dinas Perindustrian dan Perdagangan Kabupaten Mimika merilis data terbaru mengenai stabilitas harga pangan di <strong>Pasar Sentral Timika</strong>. Beras, minyak goreng, dan daging ayam terpantau berada pada harga eceran tertinggi yang wajar.</p>
      
      <h3>Peran Petani Lokal</h3>
      <p>Stabilitas ini didukung oleh meningkatnya suplai sayur-mayur dari petani lokal di wilayah SP 2 dan SP 3. Hal ini mengurangi ketergantungan Timika pada pasokan logistik via kapal laut yang seringkali terkendala cuaca.</p>
      
      <p>Pemerintah juga berencana mengimplementasikan sistem pembayaran digital (QRIS) bagi seluruh pedagang pasar untuk mempercepat perputaran ekonomi digital di Mimika.</p>
    `
  }
];