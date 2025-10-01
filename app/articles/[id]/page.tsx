// app/articles/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MarkdownRenderer from '../../components/MarkdownRenderer';

interface Post {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    email: string;
  };
}

export default function ArticlePage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/posts/${params.id}`);
        if (!response.ok) {
          throw new Error('Article non trouvé');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l&apos;article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <p className="text-gray-600">L&apos;article que vous cherchez n&apos;existe pas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec image de bannière */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <nav className="mb-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              ← Retour aux articles
            </Link>
          </nav>
          
          {post.coverImage && (
            <div className="relative h-64 md:h-96 w-full mb-6 rounded-lg overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center text-gray-600 text-sm">
            <span>Par {post.author.email}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
            {post.updatedAt !== post.createdAt && (
              <>
                <span className="mx-2">•</span>
                <span>Modifié le {formatDate(post.updatedAt)}</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Contenu de l'article */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm p-8">
          <MarkdownRenderer content={post.content} />
        </article>
      </main>
    </div>
  );
}