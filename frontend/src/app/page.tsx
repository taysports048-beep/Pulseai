'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ArticleGrid from '@/components/articles/ArticleGrid';
import { Article } from '@/types';
import { useStore } from '@/hooks/useStore';

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { setArticles: storeArticles } = useStore();

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/v1/news/feed?category=${selectedCategory}`);
      // const data = await response.json();
      // setArticles(data.articles);
      // storeArticles(data.articles);

      // Mock data for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setArticles([]);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Your Personalized News Feed
          </h1>
          <p className="text-dark-400 text-lg">
            Discover stories that matter to you, powered by AI
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {['All', 'Technology', 'Sports', 'Finance', 'Entertainment', 'Science'].map(
            (category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Articles Grid */}
        <ArticleGrid articles={articles} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default HomePage;
