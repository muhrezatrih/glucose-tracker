import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { BPReading, ViewMode } from '../types/bp';
import { Droplet, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface GraphicChartProps {
  readings: BPReading[];
  allReadings: BPReading[];
  selectedDate: string;
}

export const DailyGraphicChart: React.FC<GraphicChartProps> = ({
  readings,
  allReadings,
  selectedDate,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('daily');

  let labels: string[] = [];
  let datasets: any[] = [];
  let minVal = 0;
  let maxVal = 0;
  let avgVal = 0;
  let totalCount = 0;

  if (viewMode === 'daily') {
    const sorted = [...readings].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const values = sorted.map((r) => r.value);
    minVal = values.length > 0 ? Math.min(...values) : 0;
    maxVal = values.length > 0 ? Math.max(...values) : 0;
    avgVal = values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
    totalCount = sorted.length;

    labels = sorted.map((r) => {
      const d = new Date(r.timestamp);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    const pointBgColors = sorted.map((r) =>
      r.mealState === 'before'
        ? '#10B981'
        : r.mealState === 'after'
        ? '#F59E0B'
        : '#3B82F6'
    );

    const pointBorderColors = sorted.map((r) =>
      r.mealState === 'before'
        ? '#059669'
        : r.mealState === 'after'
        ? '#D97706'
        : '#2563EB'
    );

    datasets = [
      {
        label: 'Blood Sugar (mg/dL)',
        data: values.length > 0 ? values : [null, null, null, null, null],
        borderColor: '#10B981',
        borderWidth: 3,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: pointBgColors,
        pointBorderColor: pointBorderColors,
        pointBorderWidth: 2,
        pointRadius: 7,
        pointHoverRadius: 9,
      },
    ];
  } else if (viewMode === 'weekly') {
    const now = new Date(selectedDate + 'T23:59:59');
    const past7Days: { dateStr: string; label: string; before: number[]; after: number[] }[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric' });
      past7Days.push({ dateStr, label: dayLabel, before: [], after: [] });
    }

    allReadings.forEach((r) => {
      const dateStr = new Date(r.timestamp).toISOString().split('T')[0];
      const found = past7Days.find((day) => day.dateStr === dateStr);
      if (found) {
        if (r.mealState === 'before') found.before.push(r.value);
        if (r.mealState === 'after') found.after.push(r.value);
      }
    });

    labels = past7Days.map((d) => d.label);
    const beforeAvgs = past7Days.map((d) =>
      d.before.length > 0 ? Math.round(d.before.reduce((a, b) => a + b, 0) / d.before.length) : null
    );
    const afterAvgs = past7Days.map((d) =>
      d.after.length > 0 ? Math.round(d.after.reduce((a, b) => a + b, 0) / d.after.length) : null
    );

    const allVals = past7Days.flatMap((d) => [...d.before, ...d.after]);
    minVal = allVals.length > 0 ? Math.min(...allVals) : 0;
    maxVal = allVals.length > 0 ? Math.max(...allVals) : 0;
    avgVal = allVals.length > 0 ? Math.round(allVals.reduce((a, b) => a + b, 0) / allVals.length) : 0;
    totalCount = allVals.length;

    datasets = [
      {
        label: 'Pre-Meal Avg (Before Eat)',
        data: beforeAvgs,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderWidth: 3,
        tension: 0.3,
        pointRadius: 6,
      },
      {
        label: 'Post-Meal Avg (After Eat)',
        data: afterAvgs,
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderWidth: 3,
        tension: 0.3,
        pointRadius: 6,
      },
    ];
  } else {
    const now = new Date(selectedDate + 'T23:59:59');
    const past30Days: { dateStr: string; label: string; before: number[]; after: number[] }[] = [];

    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString([], { month: 'short', day: 'numeric' });
      past30Days.push({ dateStr, label: dayLabel, before: [], after: [] });
    }

    allReadings.forEach((r) => {
      const dateStr = new Date(r.timestamp).toISOString().split('T')[0];
      const found = past30Days.find((day) => day.dateStr === dateStr);
      if (found) {
        if (r.mealState === 'before') found.before.push(r.value);
        if (r.mealState === 'after') found.after.push(r.value);
      }
    });

    labels = past30Days.map((d) => d.label);
    const beforeAvgs = past30Days.map((d) =>
      d.before.length > 0 ? Math.round(d.before.reduce((a, b) => a + b, 0) / d.before.length) : null
    );
    const afterAvgs = past30Days.map((d) =>
      d.after.length > 0 ? Math.round(d.after.reduce((a, b) => a + b, 0) / d.after.length) : null
    );

    const allVals = past30Days.flatMap((d) => [...d.before, ...d.after]);
    minVal = allVals.length > 0 ? Math.min(...allVals) : 0;
    maxVal = allVals.length > 0 ? Math.max(...allVals) : 0;
    avgVal = allVals.length > 0 ? Math.round(allVals.reduce((a, b) => a + b, 0) / allVals.length) : 0;
    totalCount = allVals.length;

    datasets = [
      {
        label: 'Pre-Meal Avg (Before Eat)',
        data: beforeAvgs,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
      },
      {
        label: 'Post-Meal Avg (After Eat)',
        data: afterAvgs,
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
      },
    ];
  }

  const chartData = {
    labels: labels.length > 0 ? labels : ['--'],
    datasets,
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: viewMode !== 'daily',
        labels: {
          color: '#94A3B8',
          font: { size: 11 },
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#F8FAFC',
        bodyColor: '#CBD5E1',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255,255,255,0.05)',
        },
        ticks: {
          color: '#94A3B8',
          font: { size: 10 },
          maxRotation: 45,
        },
      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.05)',
        },
        ticks: {
          color: '#94A3B8',
          font: { size: 11 },
        },
        suggestedMin: 70,
        suggestedMax: 200,
      },
    },
  };

  return (
    <div className="glass-card" style={{ padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Droplet color="var(--before-color)" size={20} />
            Blood Sugar Statistics & Graphics
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {viewMode === 'daily'
              ? `24h Timeline for ${selectedDate}`
              : viewMode === 'weekly'
              ? `7-Day Pre/Post Meal Trend`
              : `30-Day Pre/Post Meal Trend`}
          </p>
        </div>

        <div className="pill-group" style={{ margin: 0 }}>
          <button
            onClick={() => setViewMode('daily')}
            className={`pill-btn ${viewMode === 'daily' ? 'active-primary' : ''}`}
            style={{ padding: '6px 12px', fontSize: '0.82rem', minWidth: '70px' }}
          >
            Daily
          </button>
          <button
            onClick={() => setViewMode('weekly')}
            className={`pill-btn ${viewMode === 'weekly' ? 'active-primary' : ''}`}
            style={{ padding: '6px 12px', fontSize: '0.82rem', minWidth: '75px' }}
          >
            Weekly
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`pill-btn ${viewMode === 'monthly' ? 'active-primary' : ''}`}
            style={{ padding: '6px 12px', fontSize: '0.82rem', minWidth: '75px' }}
          >
            Monthly
          </button>
        </div>
      </div>

      <div style={{ height: '240px', position: 'relative', width: '100%' }}>
        {totalCount === 0 ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              gap: '8px',
            }}
          >
            <TrendingUp size={32} strokeWidth={1.5} />
            <p style={{ fontSize: '0.9rem' }}>No blood sugar records for this {viewMode} view.</p>
            <p style={{ fontSize: '0.78rem' }}>Tap "+" to record blood sugar!</p>
          </div>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>

      {totalCount > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-card)',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <ArrowDown size={14} color="var(--before-color)" /> Min Glucose
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {minVal} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>mg/dL</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{viewMode.toUpperCase()} AVERAGE</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--before-color)' }}>
              {avgVal} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>mg/dL</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <ArrowUp size={14} color="var(--danger)" /> Max Glucose
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {maxVal} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>mg/dL</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
