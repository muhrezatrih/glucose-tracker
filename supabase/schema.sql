-- Supabase PostgreSQL Database Schema for GlucosePulse
-- Run this in your Supabase SQL Editor to set up table and RLS policies

CREATE TABLE IF NOT EXISTS public.glucose_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  value INTEGER NOT NULL,
  meal_state VARCHAR(20) NOT NULL,
  meal_type VARCHAR(20) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast user_id and timestamp filtering
CREATE INDEX IF NOT EXISTS idx_glucose_readings_user_timestamp 
ON public.glucose_readings (user_id, timestamp DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.glucose_readings ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Each user has strict isolated access to their own records
CREATE POLICY "Users can view own readings"
ON public.glucose_readings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own readings"
ON public.glucose_readings FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own readings"
ON public.glucose_readings FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own readings"
ON public.glucose_readings FOR DELETE
USING (auth.uid() = user_id);
