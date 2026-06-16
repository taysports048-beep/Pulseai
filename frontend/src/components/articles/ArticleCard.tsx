'use client';

import { Article } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Share2, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [isLiked, setIsLiked] = useState(false);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <article className="bg-dark-800 rounded-lg overflow-hidden hover:bg-dark-750 transition-colors border border-dark-700">
      {/* Article Image */}
      {article.image_url && (
        <div className="relative h-48 w-full bg-dark-700 overflow-hidden">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Article Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">
            {article.category}
          </span>
          {article.is_breaking && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
              BREAKING
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/article/${article.id}`}>
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 hover:text-primary-400 transition-colors cursor-pointer">
            {article.title}
          </h3>
        </Link>

        {/* Summary */}
        <p className="text-dark-300 text-sm mb-3 line-clamp-2">{article.summary}</p>

        {/* Source & Date */}
        <div className="flex items-center justify-between text-xs text-dark-400 mb-3">
          <span className="font-medium">{article.source.name}</span>
          <span>{formatDate(article.published_at)}</span>
        </div>

        {/* Trust & Trending Scores */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <div className="flex-1 h-1 bg-dark-700 rounded-full">
              <div
                className="h-1 bg-primary-500 rounded-full"
                style={{ width: `${article.trust_score * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-dark-400">Trust</span>
          </div>
          <div className="text-xs font-semibold text-primary-400">
            {article.trending_score.toFixed(0)}🔥
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between text-dark-400 border-t border-dark-700 pt-3">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex items-center space-x-1 hover:text-primary-400 transition-colors"
          >
            <Heart
              size={16}
              className={isLiked ? 'fill-primary-500 text-primary-500' : ''}
            />
            <span className="text-xs">{article.like_count}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-primary-400 transition-colors">
            <MessageCircle size={16} />
            <span className="text-xs">Comment</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-primary-400 transition-colors">
            <Share2 size={16} />
            <span className="text-xs">{article.share_count}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
