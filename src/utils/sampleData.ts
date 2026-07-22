import type { BPReading } from '../types/bp';

export const generateSampleData = (): BPReading[] => {
  const readings: BPReading[] = [];
  const now = new Date();
  
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const dateStr = formatDate(date);

    const baseOffset = (i % 3) * 3;

    // Fasting / Before Breakfast (07:30 AM)
    const bBefore = new Date(`${dateStr}T07:30:00`);
    readings.push({
      id: `sample-${i}-b-before`,
      value: 98 + baseOffset,
      mealState: 'before',
      mealType: 'breakfast',
      timestamp: bBefore.toISOString(),
      notes: 'Fasting blood sugar before breakfast',
    });

    // 2h Post Breakfast (09:30 AM)
    const bAfter = new Date(`${dateStr}T09:30:00`);
    readings.push({
      id: `sample-${i}-b-after`,
      value: 142 + baseOffset + Math.floor(Math.random() * 5),
      mealState: 'after',
      mealType: 'breakfast',
      timestamp: bAfter.toISOString(),
      notes: '2 hours post oatmeal & fruit',
    });

    // Before Lunch (12:15 PM)
    const lBefore = new Date(`${dateStr}T12:15:00`);
    readings.push({
      id: `sample-${i}-l-before`,
      value: 104 + baseOffset,
      mealState: 'before',
      mealType: 'lunch',
      timestamp: lBefore.toISOString(),
    });

    // 2h Post Lunch (02:15 PM)
    const lAfter = new Date(`${dateStr}T14:15:00`);
    readings.push({
      id: `sample-${i}-l-after`,
      value: 158 + baseOffset,
      mealState: 'after',
      mealType: 'lunch',
      timestamp: lAfter.toISOString(),
      notes: 'Post pasta lunch',
    });

    // Before Dinner (06:30 PM)
    const dBefore = new Date(`${dateStr}T18:30:00`);
    readings.push({
      id: `sample-${i}-d-before`,
      value: 101 + baseOffset,
      mealState: 'before',
      mealType: 'dinner',
      timestamp: dBefore.toISOString(),
    });

    // 2h Post Dinner (08:30 PM)
    const dAfter = new Date(`${dateStr}T20:30:00`);
    readings.push({
      id: `sample-${i}-d-after`,
      value: 148 + baseOffset,
      mealState: 'after',
      mealType: 'dinner',
      timestamp: dAfter.toISOString(),
    });
  }

  return readings.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
