// components/MarkdownRenderer.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Personnalisation des composants
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-medium mb-2 text-gray-700">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-gray-600 leading-relaxed">{children}</p>
          ),
          img: ({ src, alt }) => (
            <Image
              src={String(src) || ''}
              alt={String(alt) || ''}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg shadow-md my-6"
              loading="lazy"
            />
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 italic">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                {children}
              </code>
            );
          },
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-600">{children}</li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}