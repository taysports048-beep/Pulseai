'use client';

import { useState, useCallback } from 'react';
import { newsAPI } from '@/lib/api';
import { Article, FeedResponse, SearchResponse, TrendingResponse } from '@/types';
import toast from 'react-hot-toast';

export const useNewsAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPersonalizedFeed = useCallback(async (page?: number, limit?: number) => {
    setLoading(true);
    setError(null);
    try {
      return await newsAPI.getPersonalizedFeed(page, limit);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch feed';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTrendingArticles = useCallback(async (limit?: number, category?: string) => {
    setLoading(true);
    setError(null);
    try {
      return await newsAPI.getTrendingArticles(limit, category);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch trending';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchArticles = useCallback(async (query: string, category?: string, limit?: number) => {
    setLoading(true);
    setError(null);
    try {
      return await newsAPI.searchArticles(query, category, limit);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Search failed';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getPersonalizedFeed,
    getTrendingArticles,
    searchArticles,
  };
};
