import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  slug: string;
}

export default function SEO({ title, description, image, slug }: SEOProps) {
  const siteName = "Timika Pulse";
  const fullUrl = `https://timverse.vercel.app/article/${slug}`;
  const defaultImage = "/og-image.jpg"; // Gambar default jika artikel tidak ada foto

  return (
    <Helmet>
      {/* Standar Meta Tags */}
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description} />

      {/* Facebook & WhatsApp (Open Graph) */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}