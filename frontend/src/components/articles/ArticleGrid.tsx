'use client';

import { Article } from '@/types';
import ArticleCard from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  isLoading = false,
  emptyMessage = 'No articles found',
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-dark-800 rounded-lg h-96 shimmer"></div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-dark-400 text-center">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleGrid;
