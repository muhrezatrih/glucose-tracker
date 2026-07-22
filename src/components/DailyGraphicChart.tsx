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
        pointRadius: 6,
        pointHoverRadius: 8,
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
        pointRadius: 5,
      },
      {
        label: 'Post-Meal Avg (After Eat)',
        data: afterAvgs,
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderWidth: 3,
        tension: 0.3,
        pointRadius: 5,
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
        padding: 10,
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
          font: { size: 10 },
        },
        suggestedMin: 70,
        suggestedMax: 200,
      },
    },
  };

  return (
    <div className="glass-card" style={{ padding: '16px', marginBottom: '16px' }}>
      {/* Header Title & Segmented View Switcher */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Droplet color="var(--before-color)" size={18} />
              Statistics & Trends
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {viewMode === 'daily'
                ? `24h Timeline for ${selectedDate}`
                : viewMode === 'weekly'
                ? `7-Day Pre vs Post Meal Trend`
                : `30-Day Pre vs Post Meal Trend`}
            </p>
          </div>
        </div>

        {/* 1-Row Horizontal Segmented Control for Chart Mode */}
        <div className="segmented-control">
          <button
            onClick={() => setViewMode('daily')}
            className={`segmented-control-item ${viewMode === 'daily' ? 'active' : ''}`}
          >
            Daily
          </button>
          <button
            onClick={() => setViewMode('weekly')}
            className={`segmented-control-item ${viewMode === 'weekly' ? 'active' : ''}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`segmented-control-item ${viewMode === 'monthly' ? 'active' : ''}`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div style={{ height: '210px', position: 'relative', width: '100%' }}>
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
              gap: '6px',
            }}
          >
            <TrendingUp size={28} strokeWidth={1.5} />
            <p style={{ fontSize: '0.85rem' }}>No blood sugar records for this {viewMode} view.</p>
            <p style={{ fontSize: '0.75rem' }}>Tap "+ Record Blood Sugar" below!</p>
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
            gap: '8px',
            marginTop: '14px',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-card)',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
              <ArrowDown size={12} color="var(--before-color)" /> Min
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              {minVal} <span style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-muted)' }}>mg/dL</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{viewMode.toUpperCase()} AVG</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--before-color)' }}>
              {avgVal} <span style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-muted)' }}>mg/dL</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
              <ArrowUp size={12} color="var(--danger)" /> Max
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              {maxVal} <span style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-muted)' }}>mg/dL</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
