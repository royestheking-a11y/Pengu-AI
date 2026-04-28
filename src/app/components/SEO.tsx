import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEO({ 
  title, 
  description, 
  keywords, 
  image = '/penguimg.png', 
  url = 'https://pengu.ai/' 
}: SEOProps) {
  const baseTitle = 'Pengu AI — No-Human Intelligence. 100% Automated.';
  const fullTitle = title ? `${title} | Pengu AI` : baseTitle;
  const baseDescription = 'Pengu AI is the first 100% automated enterprise-grade AI digital solution company. Scale your business with no-human intelligence.';
  const fullDescription = description || baseDescription;
  const baseKeywords = 'Pengu AI, No-Human Intelligence, 100% Automated, Enterprise AI, Digital Solution';
  const fullKeywords = keywords ? `${keywords}, ${baseKeywords}` : baseKeywords;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
