export type MealState = 'before' | 'after' | 'none';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'fasting';

export interface GlucoseReading {
  id: string;
  value: number; // Blood sugar level in mg/dL (e.g. 123, 180, 349)
  mealState: MealState;
  mealType: MealType;
  timestamp: string; // ISO 8601 string
  notes?: string;
}

export type BPReading = GlucoseReading;

export type ViewPeriod = 'today' | 'thisMonth' | 'lastMonth' | 'custom' | '7days' | '30days' | 'all';

export type ViewMode = 'daily' | 'weekly' | 'monthly';

export interface FilterOptions {
  period: ViewPeriod;
  mealState: MealState | 'all';
  mealType: MealType | 'all';
  selectedDate: string;
  customStartDate?: string;
  customEndDate?: string;
}

export interface MealStats {
  beforeAvg: number | null;
  afterAvg: number | null;
  beforeCount: number;
  afterCount: number;
  delta: number | null;
  beforeMin: number | null;
  beforeMax: number | null;
  afterMin: number | null;
  afterMax: number | null;
}
