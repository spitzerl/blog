// components/ArticleCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  id: number;
  title: string;
  excerpt?: string;
  coverImage?: string;
  createdAt: string;
  author: {
    email: string;
  };
}

export default function ArticleCard({
  id,
  title,
  excerpt,
  coverImage,
  createdAt,
  author,
}: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image de bannière */}
      {coverImage && (
        <div className="relative h-48 w-full">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Contenu */}
      <div className="p-6">
        {/* Titre */}
        <h2 className="text-xl font-semibold mb-2 text-gray-900">
          <Link 
            href={`/articles/${id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {title}
          </Link>
        </h2>

        {/* Extrait */}
        {excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {excerpt}
          </p>
        )}

        {/* Métadonnées */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Par {author.email}</span>
          <time dateTime={createdAt}>{formatDate(createdAt)}</time>
        </div>

        {/* Lien "Lire la suite" */}
        <div className="mt-4">
          <Link
            href={`/articles/${id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Lire la suite
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}