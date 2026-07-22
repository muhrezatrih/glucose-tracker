import type { BPReading } from '../types/bp';

export const generateSampleData = (): BPReading[] => {
  const readings: BPReading[] = [];
  const now = new Date();
  
  // Helper to format ISO timestamp with specific hour & minute on a given date
  const createTimestamp = (date: Date, hours: number, minutes: number): string => {
    const d = new Date(date);
    d.setHours(hours, minutes, 0, 0);
    return d.toISOString();
  };

  // 1. TODAY READINGS (Fresh relative to current date)
  const today = new Date(now);
  readings.push({
    id: 'sample-today-1',
    value: 108,
    mealState: 'before',
    mealType: 'breakfast',
    timestamp: createTimestamp(today, 7, 30),
    notes: 'Oatmeal & black coffee',
  });
  readings.push({
    id: 'sample-today-2',
    value: 145,
    mealState: 'after',
    mealType: 'breakfast',
    timestamp: createTimestamp(today, 9, 30),
    notes: '2h post breakfast check',
  });
  readings.push({
    id: 'sample-today-3',
    value: 112,
    mealState: 'before',
    mealType: 'lunch',
    timestamp: createTimestamp(today, 12, 15),
    notes: 'Grilled chicken salad',
  });
  readings.push({
    id: 'sample-today-4',
    value: 138,
    mealState: 'after',
    mealType: 'lunch',
    timestamp: createTimestamp(today, 14, 15),
    notes: 'Post lunch walk completed',
  });

  // 2. THIS MONTH READINGS (Generate readings across past 14 days)
  for (let i = 1; i <= 14; i++) {
    const pastDate = new Date(now);
    pastDate.setDate(now.getDate() - i);

    // Variation simulation
    const beforeVal = Math.floor(95 + Math.random() * 25);
    const afterVal = Math.floor(beforeVal + 25 + Math.random() * 30);

    readings.push({
      id: `sample-this-month-b-${i}`,
      value: beforeVal,
      mealState: 'before',
      mealType: i % 2 === 0 ? 'breakfast' : 'lunch',
      timestamp: createTimestamp(pastDate, 8, 0),
    });
    readings.push({
      id: `sample-this-month-a-${i}`,
      value: afterVal,
      mealState: 'after',
      mealType: i % 2 === 0 ? 'breakfast' : 'lunch',
      timestamp: createTimestamp(pastDate, 10, 0),
    });
  }

  // 3. LAST MONTH READINGS (Generate readings for previous month)
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 15);
  for (let i = 1; i <= 10; i++) {
    const d = new Date(lastMonthDate);
    d.setDate(d.getDate() - i);

    const beforeVal = Math.floor(98 + Math.random() * 20);
    const afterVal = Math.floor(beforeVal + 30 + Math.random() * 25);

    readings.push({
      id: `sample-last-month-b-${i}`,
      value: beforeVal,
      mealState: 'before',
      mealType: 'dinner',
      timestamp: createTimestamp(d, 18, 30),
    });
    readings.push({
      id: `sample-last-month-a-${i}`,
      value: afterVal,
      mealState: 'after',
      mealType: 'dinner',
      timestamp: createTimestamp(d, 20, 30),
    });
  }

  return readings.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
