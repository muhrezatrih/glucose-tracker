import { useState, useEffect, useCallback } from 'react';
import type { BPReading, MealStats, ViewPeriod } from '../types/bp';
import { generateSampleData } from '../utils/sampleData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

const STORAGE_KEY = 'bp_tracker_readings_v1';

export const useBPStore = () => {
  const [user, setUser] = useState<User | null>(null);
  
  const [readings, setReadings] = useState<BPReading[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading readings from localStorage:', e);
    }
    return [];
  });

  const fetchSupabaseReadings = useCallback(async (userId: string, currentLocalReadings: BPReading[]) => {
    if (!isSupabaseConfigured()) return;
    try {
      const { data, error } = await supabase
        .from('glucose_readings')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('Error fetching Supabase readings:', error);
        return;
      }

      if (data && data.length > 0) {
        const mapped: BPReading[] = data.map((item) => ({
          id: item.id,
          value: item.value,
          mealState: item.meal_state,
          mealType: item.meal_type,
          timestamp: item.timestamp,
          notes: item.notes || undefined,
        }));
        setReadings(mapped);
      } else if (currentLocalReadings.length > 0) {
        // If Supabase is empty for this user, sync local readings to Supabase!
        const payload = currentLocalReadings.map((r) => ({
          user_id: userId,
          value: r.value,
          meal_state: r.mealState,
          meal_type: r.mealType,
          timestamp: r.timestamp,
          notes: r.notes,
        }));

        const { data: insertedData, error: insertErr } = await supabase
          .from('glucose_readings')
          .insert(payload)
          .select();

        if (!insertErr && insertedData) {
          const mapped: BPReading[] = insertedData.map((item) => ({
            id: item.id,
            value: item.value,
            mealState: item.meal_state,
            mealType: item.meal_type,
            timestamp: item.timestamp,
            notes: item.notes || undefined,
          }));
          setReadings(mapped);
        }
      }
    } catch (err) {
      console.error('Unexpected error fetching from Supabase:', err);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchSupabaseReadings(currentUser.id, readings);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchSupabaseReadings(currentUser.id, readings);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchSupabaseReadings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
    } catch (e) {
      console.error('Error saving readings to localStorage:', e);
    }
  }, [readings]);

  const addReading = async (newReading: Omit<BPReading, 'id'>) => {
    const tempId = 'bp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    const item: BPReading = {
      ...newReading,
      id: tempId,
    };

    setReadings((prev) => [item, ...prev]);

    if (user && isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('glucose_readings')
          .insert({
            user_id: user.id,
            value: newReading.value,
            meal_state: newReading.mealState,
            meal_type: newReading.mealType,
            timestamp: newReading.timestamp,
            notes: newReading.notes,
          })
          .select()
          .single();

        if (error) {
          console.error('Error inserting reading to Supabase:', error);
        } else if (data) {
          setReadings((prev) =>
            prev.map((r) => (r.id === tempId ? { ...r, id: data.id } : r))
          );
        }
      } catch (err) {
        console.error('Failed to sync insert to Supabase:', err);
      }
    }
  };

  const updateReading = async (id: string, updatedFields: Partial<BPReading>) => {
    setReadings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );

    if (user && isSupabaseConfigured()) {
      try {
        await supabase
          .from('glucose_readings')
          .update({
            value: updatedFields.value,
            meal_state: updatedFields.mealState,
            meal_type: updatedFields.mealType,
            timestamp: updatedFields.timestamp,
            notes: updatedFields.notes,
          })
          .eq('id', id)
          .eq('user_id', user.id);
      } catch (err) {
        console.error('Failed to sync update to Supabase:', err);
      }
    }
  };

  const deleteReading = async (id: string) => {
    setReadings((prev) => prev.filter((item) => item.id !== id));

    if (user && isSupabaseConfigured()) {
      try {
        await supabase
          .from('glucose_readings')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);
      } catch (err) {
        console.error('Failed to sync delete to Supabase:', err);
      }
    }
  };

  const clearAllData = async () => {
    setReadings([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }

    if (user && isSupabaseConfigured()) {
      try {
        await supabase.from('glucose_readings').delete().eq('user_id', user.id);
      } catch (err) {
        console.error('Failed to clear Supabase readings:', err);
      }
    }
  };

  const loadSampleData = () => {
    setReadings(generateSampleData());
  };

  const exportToCSV = () => {
    if (readings.length === 0) return;
    const headers = ['ID', 'Date', 'Time', 'Blood Sugar (mg/dL)', 'Meal State', 'Meal Type', 'Notes'];
    const rows = readings.map((r) => {
      const d = new Date(r.timestamp);
      return [
        r.id,
        d.toLocaleDateString(),
        d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        r.value,
        r.mealState === 'before' ? 'Before Eat' : r.mealState === 'after' ? 'After Eat' : 'None',
        r.mealType,
        `"${(r.notes || '').replace(/"/g, '""')}"`,
      ];
    });
    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `glucose_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(readings, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `glucose_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importFromJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        setReadings(parsed);
        return true;
      }
    } catch (e) {
      console.error('Failed to parse JSON file', e);
    }
    return false;
  };

  const filterByPeriod = (
    items: BPReading[],
    period: ViewPeriod,
    selectedDateStr: string,
    customStartStr?: string,
    customEndStr?: string
  ) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const now = new Date();

    return items.filter((r) => {
      const itemDate = new Date(r.timestamp);
      const itemDateStr = itemDate.toISOString().split('T')[0];

      if (period === 'today') {
        return itemDateStr === (selectedDateStr || todayStr);
      } else if (period === 'thisMonth') {
        return itemDate.getFullYear() === now.getFullYear() && itemDate.getMonth() === now.getMonth();
      } else if (period === 'lastMonth') {
        const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return (
          itemDate.getFullYear() === lastMonthDate.getFullYear() &&
          itemDate.getMonth() === lastMonthDate.getMonth()
        );
      } else if (period === 'custom') {
        if (!customStartStr && !customEndStr) return true;
        const start = customStartStr ? new Date(customStartStr + 'T00:00:00').getTime() : 0;
        const end = customEndStr ? new Date(customEndStr + 'T23:59:59').getTime() : Infinity;
        const itemTime = itemDate.getTime();
        return itemTime >= start && itemTime <= end;
      } else if (period === '7days') {
        const diffDays = Math.floor((now.getTime() - itemDate.getTime()) / (1000 * 3600 * 24));
        return diffDays >= 0 && diffDays < 7;
      } else if (period === '30days') {
        const diffDays = Math.floor((now.getTime() - itemDate.getTime()) / (1000 * 3600 * 24));
        return diffDays >= 0 && diffDays < 30;
      }
      return true;
    });
  };

  const calculateMealStats = (filteredReadings: BPReading[]): MealStats => {
    const beforeReadings = filteredReadings.filter((r) => r.mealState === 'before');
    const afterReadings = filteredReadings.filter((r) => r.mealState === 'after');

    const beforeValues = beforeReadings.map((r) => r.value);
    const afterValues = afterReadings.map((r) => r.value);

    const beforeAvg = beforeValues.length > 0 ? Math.round(beforeValues.reduce((a, b) => a + b, 0) / beforeValues.length) : null;
    const afterAvg = afterValues.length > 0 ? Math.round(afterValues.reduce((a, b) => a + b, 0) / afterValues.length) : null;

    const beforeMin = beforeValues.length > 0 ? Math.min(...beforeValues) : null;
    const beforeMax = beforeValues.length > 0 ? Math.max(...beforeValues) : null;
    const afterMin = afterValues.length > 0 ? Math.min(...afterValues) : null;
    const afterMax = afterValues.length > 0 ? Math.max(...afterValues) : null;

    const delta = beforeAvg !== null && afterAvg !== null ? afterAvg - beforeAvg : null;

    return {
      beforeAvg,
      afterAvg,
      beforeCount: beforeReadings.length,
      afterCount: afterReadings.length,
      delta,
      beforeMin,
      beforeMax,
      afterMin,
      afterMax,
    };
  };

  return {
    user,
    readings,
    addReading,
    updateReading,
    deleteReading,
    clearAllData,
    loadSampleData,
    exportToCSV,
    exportToJSON,
    importFromJSON,
    filterByPeriod,
    calculateMealStats,
    refetch: () => user && fetchSupabaseReadings(user.id, readings),
  };
};
