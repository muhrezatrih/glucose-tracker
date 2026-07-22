import React from 'react';
import type { MealStats } from '../types/bp';
import { Utensils, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MealImpactCardProps {
  stats: MealStats;
  periodName: string;
}

export const MealImpactCard: React.FC<MealImpactCardProps> = ({ stats, periodName }) => {
  const hasData = stats.beforeCount > 0 || stats.afterCount > 0;

  return (
    <div className="glass-card" style={{ padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Utensils size={18} color="var(--primary)" />
          Pre vs Post Meal Glucose Impact ({periodName})
        </h3>
      </div>

      {!hasData ? (
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          No meal glucose readings recorded for this period yet.
        </p>
      ) : (
        <div>
          <div className="grid-2" style={{ marginBottom: '16px' }}>
            <div
              style={{
                background: 'var(--before-bg)',
                border: '1px solid var(--before-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px',
              }}
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--before-color)', fontWeight: 600, marginBottom: '4px' }}>
                🟢 BEFORE EAT (PRE-MEAL AVG)
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--before-color)' }}>
                {stats.beforeAvg !== null ? `${stats.beforeAvg} mg/dL` : '--'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {stats.beforeCount} reading{stats.beforeCount !== 1 ? 's' : ''}
              </div>
            </div>

            <div
              style={{
                background: 'var(--after-bg)',
                border: '1px solid var(--after-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px',
              }}
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--after-color)', fontWeight: 600, marginBottom: '4px' }}>
                🟠 AFTER EAT (POST-MEAL AVG)
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--after-color)' }}>
                {stats.afterAvg !== null ? `${stats.afterAvg} mg/dL` : '--'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {stats.afterCount} reading{stats.afterCount !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {stats.delta !== null && (
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {stats.delta > 0 ? (
                  <TrendingUp size={22} color="var(--after-color)" />
                ) : stats.delta < 0 ? (
                  <TrendingDown size={22} color="var(--before-color)" />
                ) : (
                  <Minus size={22} color="var(--text-muted)" />
                )}
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                    Glucose Rise / Fall (Delta)
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Difference between pre-meal vs post-meal blood sugar
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: stats.delta > 0 ? 'var(--after-color)' : 'var(--before-color)',
                }}
              >
                {stats.delta > 0 ? `+${stats.delta}` : stats.delta} <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>mg/dL</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
