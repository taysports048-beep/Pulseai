'use client';

import { useState, useCallback } from 'react';
import { creatorAPI } from '@/lib/api';
import { CreatorContent } from '@/types';
import toast from 'react-hot-toast';

export const useCreatorAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = useCallback(async (articleId: string, contentType: string, tone?: string) => {
    setLoading(true);
    setError(null);
    try {
      const content = await creatorAPI.generateContent(articleId, contentType, tone);
      toast.success(`${contentType} generated successfully!`);
      return content;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate content';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const schedulePost = useCallback(async (contentId: string, platform: string, scheduledAt: string) => {
    setLoading(true);
    setError(null);
    try {
      const content = await creatorAPI.schedulePost(contentId, platform, scheduledAt);
      toast.success('Post scheduled successfully!');
      return content;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to schedule post';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const publishContent = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const content = await creatorAPI.publishContent(id);
      toast.success('Content published successfully!');
      return content;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to publish';
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
    generateContent,
    schedulePost,
    publishContent,
  };
};
