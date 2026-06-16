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
  const [likeCount, setLikeCount] = useState(article.like_count);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <article className="bg-dark-800 rounded-lg overflow-hidden hover:bg-dark-750 transition-all duration-300 border border-dark-700 hover:border-primary-500 group">
      {/* Article Image */}
      {article.image_url && (
        <div className="relative h-48 w-full bg-dark-700 overflow-hidden">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
        </div>
      )}

      {/* Article Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider animate-pulse">
            {article.category}
          </span>
          {article.is_breaking && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded animate-pulse">
              BREAKING
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/article/${article.id}`}>
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 hover:text-primary-400 transition-colors duration-300 cursor-pointer">
            {article.title}
          </h3>
        </Link>

        {/* Summary */}
        <p className="text-dark-300 text-sm mb-3 line-clamp-2 group-hover:text-dark-200 transition-colors duration-300">
          {article.summary}
        </p>

        {/* Source & Date */}
        <div className="flex items-center justify-between text-xs text-dark-400 mb-3">
          <span className="font-medium hover:text-primary-400 transition-colors duration-300">
            {article.source.name}
          </span>
          <span>{formatDate(article.published_at)}</span>
        </div>

        {/* Trust & Trending Scores */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 flex-1">
            <div className="flex-1 h-1 bg-dark-700 rounded-full overflow-hidden">
              <div
                className="h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500 group-hover:from-primary-400 group-hover:to-primary-300"
                style={{ width: `${article.trust_score * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-dark-400">Trust</span>
          </div>
          <div className="text-xs font-semibold text-primary-400 group-hover:text-primary-300 transition-colors duration-300 animate-bounce">
            {article.trending_score.toFixed(0)}🔥
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between text-dark-400 border-t border-dark-700 pt-3">
          <button
            onClick={handleLike}
            className="btn-like flex items-center space-x-1 hover:text-primary-400 transition-all duration-300 group/like"
          >
            <Heart
              size={16}
              className={`transition-all duration-300 ${
                isLiked ? 'fill-primary-500 text-primary-500 scale-125' : 'group-hover/like:scale-110'
              }`}
            />
            <span className="text-xs group-hover/like:font-bold transition-all duration-300">
              {likeCount}
            </span>
          </button>
          <button className="btn-share flex items-center space-x-1 hover:text-primary-400 transition-all duration-300">
            <MessageCircle size={16} />
            <span className="text-xs">Comment</span>
          </button>
          <button className="btn-share flex items-center space-x-1 hover:text-primary-400 transition-all duration-300">
            <Share2 size={16} />
            <span className="text-xs">{article.share_count}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
