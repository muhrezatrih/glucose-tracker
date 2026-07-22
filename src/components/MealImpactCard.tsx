import React from 'react';
import type { MealStats } from '../types/bp';
import { Utensils, TrendingUp } from 'lucide-react';

interface MealImpactCardProps {
  stats: MealStats;
  periodName: string;
}

export const MealImpactCard: React.FC<MealImpactCardProps> = ({ stats, periodName }) => {
  const { beforeAvg, afterAvg, beforeCount, afterCount, delta } = stats;

  return (
    <div className="glass-card" style={{ padding: '18px', marginBottom: '16px' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '-0.01em' }}>
          <Utensils size={18} color="var(--before-color)" />
          Pre vs Post Meal Glucose Impact ({periodName})
        </h3>
      </div>

      {/* Side by Side Grid for Before Eat & After Eat (Desktop & Tablet) */}
      <div className="meal-impact-grid" style={{ marginBottom: '14px' }}>
        {/* Pre-Meal Card */}
        <div
          style={{
            background: 'var(--before-bg)',
            border: '1px solid var(--before-border)',
            borderRadius: '14px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--before-color)', boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)' }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--before-color)', letterSpacing: '0.02em' }}>
              BEFORE EAT (PRE-MEAL AVG)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--before-color)', fontVariantNumeric: 'tabular-nums' }}>
              {beforeAvg !== null ? beforeAvg : '--'}
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--before-color)', opacity: 0.9 }}>mg/dL</span>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {beforeCount} {beforeCount === 1 ? 'reading' : 'readings'}
          </div>
        </div>

        {/* Post-Meal Card */}
        <div
          style={{
            background: 'var(--after-bg)',
            border: '1px solid var(--after-border)',
            borderRadius: '14px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--after-color)', boxShadow: '0 0 8px rgba(245, 158, 11, 0.6)' }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--after-color)', letterSpacing: '0.02em' }}>
              AFTER EAT (POST-MEAL AVG)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--after-color)', fontVariantNumeric: 'tabular-nums' }}>
              {afterAvg !== null ? afterAvg : '--'}
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--after-color)', opacity: 0.9 }}>mg/dL</span>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {afterCount} {afterCount === 1 ? 'reading' : 'readings'}
          </div>
        </div>
      </div>

      {/* High Contrast Delta Container */}
      <div
        style={{
          background: 'var(--delta-bg)',
          border: '1px solid var(--delta-border)',
          borderRadius: '14px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={16} color="var(--delta-text-muted)" />
          <div>
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--delta-text)' }}>
              Glucose Rise / Fall (Delta)
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--delta-text-muted)' }}>
              Difference between pre-meal vs post-meal blood sugar
            </div>
          </div>
        </div>

        <div>
          {delta !== null ? (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  color: delta > 0 ? 'var(--after-color)' : 'var(--before-color)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {delta > 0 ? `+${delta}` : delta}
              </span>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--delta-text-muted)' }}>mg/dL</span>
            </div>
          ) : (
            <span style={{ fontSize: '0.88rem', color: 'var(--delta-text-muted)' }}>--</span>
          )}
        </div>
      </div>
    </div>
  );
};
