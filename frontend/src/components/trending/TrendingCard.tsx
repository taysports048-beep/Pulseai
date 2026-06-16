'use client';

import { TrendingTopic } from '@/types';
import { TrendingUp, Zap } from 'lucide-react';

interface TrendingCardProps {
  topic: TrendingTopic;
  rank: number;
}

const TrendingCard: React.FC<TrendingCardProps> = ({ topic, rank }) => {
  return (
    <div className="bg-dark-800 p-4 rounded-lg border border-dark-700 hover:border-primary-500 transition-colors cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-primary-500 w-8 text-center">
            #{rank}
          </span>
          <div>
            <h4 className="font-bold text-white text-lg mb-1">{topic.topic_name}</h4>
            <p className="text-sm text-dark-400">{topic.article_count} articles</p>
          </div>
        </div>
        <Zap className="text-yellow-500" size={20} />
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        {/* Trending Score */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-dark-400">Trend Score</span>
            <span className="font-bold text-primary-400">{topic.trending_score.toFixed(0)}</span>
          </div>
          <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full"
              style={{ width: `${(topic.trending_score / 100) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Momentum */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-dark-400 flex items-center gap-1">
              <TrendingUp size={12} /> Momentum
            </span>
            <span className="font-bold text-green-400">{topic.momentum_score.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${topic.momentum_score}%` }}
            ></div>
          </div>
        </div>

        {/* Viral Potential */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-dark-400">Viral Potential</span>
            <span className="font-bold text-purple-400">
              {(topic.estimated_viral_potential * 100).toFixed(0)}%
            </span>
          </div>
          <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full"
              style={{ width: `${topic.estimated_viral_potential * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Category Badge */}
      {topic.category && (
        <div className="mt-3 pt-3 border-t border-dark-700">
          <span className="inline-block px-2 py-1 bg-dark-700 text-dark-300 text-xs rounded">
            {topic.category}
          </span>
        </div>
      )}
    </div>
  );
};

export default TrendingCard;
