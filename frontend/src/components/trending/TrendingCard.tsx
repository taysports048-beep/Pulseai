'use client';

import { TrendingTopic } from '@/types';
import { TrendingUp, Zap } from 'lucide-react';

interface TrendingCardProps {
  topic: TrendingTopic;
  rank: number;
}

const TrendingCard: React.FC<TrendingCardProps> = ({ topic, rank }) => {
  return (
    <div className="bg-dark-800 p-4 rounded-lg border border-dark-700 hover:border-primary-500 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-primary-500/20">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-primary-500 w-8 text-center group-hover:scale-125 transition-transform duration-300">
            #{rank}
          </span>
          <div>
            <h4 className="font-bold text-white text-lg mb-1 group-hover:text-primary-400 transition-colors duration-300">
              {topic.topic_name}
            </h4>
            <p className="text-sm text-dark-400 group-hover:text-dark-300 transition-colors duration-300">
              {topic.article_count} articles
            </p>
          </div>
        </div>
        <Zap className="text-yellow-500 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" size={20} />
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        {/* Trending Score */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-dark-400">Trend Score</span>
            <span className="font-bold text-primary-400 group-hover:text-primary-300 transition-colors duration-300">
              {topic.trending_score.toFixed(0)}
            </span>
          </div>
          <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden group-hover:bg-dark-600 transition-colors duration-300">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500 group-hover:from-primary-400 group-hover:to-primary-300"
              style={{ width: `${(topic.trending_score / 100) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Momentum */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-dark-400 flex items-center gap-1">
              <TrendingUp size={12} className="group-hover:animate-bounce" /> Momentum
            </span>
            <span className="font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300 animate-pulse">
              {topic.momentum_score.toFixed(0)}%
            </span>
          </div>
          <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden group-hover:bg-dark-600 transition-colors duration-300">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500 group-hover:from-green-400 group-hover:to-green-300"
              style={{ width: `${topic.momentum_score}%` }}
            ></div>
          </div>
        </div>

        {/* Viral Potential */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-dark-400">Viral Potential</span>
            <span className="font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
              {(topic.estimated_viral_potential * 100).toFixed(0)}%
            </span>
          </div>
          <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden group-hover:bg-dark-600 transition-colors duration-300">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500 group-hover:from-purple-400 group-hover:to-purple-300"
              style={{ width: `${topic.estimated_viral_potential * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Category Badge */}
      {topic.category && (
        <div className="mt-3 pt-3 border-t border-dark-700">
          <span className="inline-block px-2 py-1 bg-dark-700 text-dark-300 text-xs rounded hover:bg-primary-600 hover:text-white transition-all duration-300 transform group-hover:scale-105">
            {topic.category}
          </span>
        </div>
      )}
    </div>
  );
};

export default TrendingCard;
