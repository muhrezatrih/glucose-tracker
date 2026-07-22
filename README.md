# 🩸 GlucosePulse – Mobile-Friendly Blood Sugar & Meal Tracker

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Cloud%20Sync-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An enterprise-grade, mobile-first Blood Sugar (Glucose mg/dL) tracking web application. Designed for friction-free data entry, real-time pre/post meal correlation graphics, and multi-device cloud synchronization.

---

## 🌟 Key Features

* **⚡ Single-Number Rapid Input**: Record your blood sugar level in under 3 seconds using a single numeric field (e.g. `123`, `180`, `349` mg/dL).
* **🟢/🟠 Pre & Post Meal Context**: Single-tap pill selectors for **Before Eat** (Pre-Meal) vs **After Eat** (Post-Meal) and meal categories (**Breakfast**, **Lunch**, **Dinner**, **Snack**).
* **📊 Multi-Mode Graphic Statistics**:
  * **Daily View**: 24-hour timeline graphic plotting readings across the day with meal status markers.
  * **Weekly View**: 7-day trend chart comparing daily **Pre-Meal Averages** vs **Post-Meal Averages**.
  * **Monthly View**: 30-day macro trend chart displaying long-term glycemic variations.
* **📅 Flexible Date Range Filtering**:
  * **Today (Default)**: Automatically displays today's logs on app launch.
  * **This Month / Last Month**: One-tap calendar month presets.
  * **Custom Date Range**: Select any **Start Date** and **End Date**.
* **☁️ Supabase Cloud Sync & User Accounts**: Email/Password authentication with PostgreSQL **Row Level Security (RLS)** ensuring isolated user records across mobile phones, tablets, and desktop browsers.
* **💾 Local-First Privacy & Export**: Full offline `localStorage` fallback with one-click **CSV Log Export** and **JSON Backup/Restore**.
* **🎨 FAANG-Grade Responsive Aesthetics**: Glassmorphic dark and light theme system built with pure Vanilla CSS tokens, fluid typography, and mobile touch targets.

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have **Node.js 18+** installed on your machine.

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/muhrezatrih/glucose-tracker.git

# Navigate to project directory
cd glucose-tracker

# Install dependencies
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

Open `http://localhost:5173/` in your browser.

---

## 🗄️ Database Setup (Supabase)

To set up cloud sync and user accounts, run the following SQL script in your **Supabase SQL Editor**:

```sql
-- Create glucose_readings table
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

-- Index for fast user_id and timestamp queries
CREATE INDEX IF NOT EXISTS idx_glucose_readings_user_timestamp 
ON public.glucose_readings (user_id, timestamp DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.glucose_readings ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own records
CREATE POLICY "Users can view own readings" ON public.glucose_readings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own readings" ON public.glucose_readings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own readings" ON public.glucose_readings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own readings" ON public.glucose_readings FOR DELETE USING (auth.uid() = user_id);
```

---

## 📦 Production Deployment (Vercel)

1. Push your repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com/new).
3. Add environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under project settings.
4. Click **Deploy**.

---

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript, Vite
* **Charts & Graphics**: Chart.js, `react-chartjs-2`
* **Icons**: Lucide React
* **Backend & Auth**: Supabase JS, PostgreSQL, Row Level Security (RLS)
* **Styling**: Vanilla CSS Design Tokens, Glassmorphism, Theme Variables

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
