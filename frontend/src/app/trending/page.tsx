'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TrendingCard from '@/components/trending/TrendingCard';
import { TrendingTopic } from '@/types';
import { TrendingUp } from 'lucide-react';

const TrendingPage = () => {
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTrendingTopics();
  }, []);

  const fetchTrendingTopics = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/v1/news/trending');
      // const data = await response.json();
      // setTrendingTopics(data.trending_topics);

      // Mock data for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTrendingTopics([]);
    } catch (error) {
      console.error('Failed to fetch trending topics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-primary-500" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Trending Now</h1>
          </div>
          <p className="text-dark-400 text-lg">
            Discover the hottest topics and stories taking over the internet
          </p>
        </div>

        {/* Trending Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-dark-800 rounded-lg h-48 shimmer"></div>
            ))}
          </div>
        ) : trendingTopics.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-dark-400 text-center">No trending topics at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingTopics.map((topic, index) => (
              <TrendingCard key={topic.id} topic={topic} rank={index + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingPage;
