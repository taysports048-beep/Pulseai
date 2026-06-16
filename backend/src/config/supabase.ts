import { createClient } from '@supabase/supabase-js';
import { env } from './env';

const supabaseUrl = env.SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase credentials are not configured');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper functions for database operations
export const db = {
  async query<T>(table: string, filters?: Record<string, any>): Promise<T[]> {
    let query = supabase.from(table).select('*');

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as T[];
  },

  async queryOne<T>(table: string, filters: Record<string, any>): Promise<T | null> {
    const results = await this.query<T>(table, filters);
    return results.length > 0 ? results[0] : null;
  },

  async insert<T>(table: string, data: any): Promise<T> {
    const { data: result, error } = await supabase.from(table).insert(data).select();
    if (error) throw error;
    return result[0] as T;
  },

  async update<T>(table: string, id: string, data: any): Promise<T> {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select();
    if (error) throw error;
    return result[0] as T;
  },

  async delete(table: string, id: string): Promise<void> {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
  },
};
