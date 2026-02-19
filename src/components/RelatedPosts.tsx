import { Link } from "react-router-dom"
import { BLOG_POSTS } from "../data/posts"
import { ArrowRight } from "lucide-react"

interface RelatedProps {
  currentCategory: string;
  currentSlug: string;
}

export default function RelatedPosts({ currentCategory, currentSlug }: RelatedProps) {
  // Ambil 3 berita dengan kategori sama, tapi bukan berita yang sedang dibuka
  const related = BLOG_POSTS.filter(
    (post) => post.category === currentCategory && post.slug !== currentSlug
  ).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-900">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-400">
          More in <span className="text-pink-500">{currentCategory}</span>
        </h3>
        <Link to={`/category/${currentCategory.toLowerCase()}`} className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-pink-500 transition-colors">
          View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((post) => (
          <Link to={`/article/${post.slug}`} key={post.slug} className="group space-y-4">
            <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-sm">
              <img 
                src={post.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={post.title} 
              />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg leading-snug group-hover:text-pink-500 transition-colors line-clamp-2 uppercase italic tracking-tighter">
                {post.title}
              </h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                {post.date} • {post.readTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}