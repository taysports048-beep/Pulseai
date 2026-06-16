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

  const categories = ['All', 'Technology', 'Sports', 'Finance', 'Entertainment', 'Science'];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        {/* Hero Section */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 hover:text-primary-400 transition-colors duration-300">
            Your Personalized News Feed
          </h1>
          <p className="text-dark-400 text-lg hover:text-dark-300 transition-colors duration-300">
            Discover stories that matter to you, powered by AI
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scroll-smooth">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`btn-category ${
                selectedCategory === category.toLowerCase()
                  ? 'btn-category-active'
                  : 'btn-category-inactive'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <ArticleGrid articles={articles} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default HomePage;
